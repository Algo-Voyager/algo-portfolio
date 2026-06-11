"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * A 3D distributed-network scene: nodes connected by edges, with glowing
 * data packets traveling between them. The whole graph slowly rotates and
 * tilts toward the cursor. Transparent background so it layers behind content.
 */
export function NetworkScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    const group = new THREE.Group();
    scene.add(group);

    /* ── Nodes ── */
    const NODE_COUNT = 28;
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 17,
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 7
        )
      );
    }

    const cyan = new THREE.Color(0x22d3ee);
    const violet = new THREE.Color(0xa78bfa);

    const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 });
    const nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
    nodeMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();
    const tmpColor = new THREE.Color();
    nodePositions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      nodeMesh.setMatrixAt(i, dummy.matrix);
      tmpColor.copy(cyan).lerp(violet, Math.random());
      nodeMesh.setColorAt(i, tmpColor);
    });
    if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;
    group.add(nodeMesh);

    /* ── Edges: connect each node to its 2 nearest neighbours ── */
    type Edge = [number, number];
    const edges: Edge[] = [];
    const edgeSet = new Set<string>();
    nodePositions.forEach((p, i) => {
      const dists = nodePositions
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
        }
      });
    });

    const linePositions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      linePositions.set([...nodePositions[a].toArray(), ...nodePositions[b].toArray()], k * 6);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    /* ── Packets traveling along edges ── */
    const PACKET_COUNT = 14;
    const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const packets: { mesh: THREE.Mesh; edge: Edge; t: number; speed: number }[] = [];
    for (let i = 0; i < PACKET_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 ? 0xa78bfa : 0x22d3ee,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(packetGeo, mat);
      group.add(mesh);
      packets.push({
        mesh,
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.45,
      });
    }

    /* ── Mouse tilt ── */
    let targetRX = 0;
    let targetRY = 0;
    const onMouse = (e: MouseEvent) => {
      targetRY = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetRX = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* ── Animate ── */
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      group.rotation.y += (targetRY + t * 0.02 - group.rotation.y) * 0.04;
      group.rotation.x += (targetRX - group.rotation.x) * 0.04;

      // Node pulse
      nodePositions.forEach((p, i) => {
        const s = 1 + Math.sin(t * 1.6 + i * 1.7) * 0.3;
        dummy.position.copy(p);
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        nodeMesh.setMatrixAt(i, dummy.matrix);
      });
      nodeMesh.instanceMatrix.needsUpdate = true;

      // Packets
      packets.forEach((pk) => {
        pk.t += dt * pk.speed;
        if (pk.t >= 1) {
          // hop to a random edge that shares the arrival node, else any edge
          const arrived = pk.edge[1];
          const next = edges.filter(([a, b]) => a === arrived || b === arrived);
          const pick = next.length
            ? next[Math.floor(Math.random() * next.length)]
            : edges[Math.floor(Math.random() * edges.length)];
          pk.edge = pick[0] === arrived ? pick : [pick[1], pick[0]];
          pk.t = 0;
        }
        pk.mesh.position.lerpVectors(
          nodePositions[pk.edge[0]],
          nodePositions[pk.edge[1]],
          pk.t
        );
        const fade = Math.sin(pk.t * Math.PI);
        (pk.mesh.material as THREE.MeshBasicMaterial).opacity = 0.4 + fade * 0.6;
        pk.mesh.scale.setScalar(0.7 + fade * 0.7);
      });

      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      packetGeo.dispose();
      packets.forEach((pk) => (pk.mesh.material as THREE.Material).dispose());
      renderer.dispose();
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0" />;
}
