"use client";

import { useEffect, useRef } from "react";

const MIN_WIDTH = 700;
const POINTS = 420;

// Reads the theme's --primary ("H S% L%") so the scene follows light/dark.
function themeColor(): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
  const [h, s, l] = raw.split(/\s+/);
  return h && s && l ? `hsl(${h}, ${s}, ${l})` : "#127a74";
}

// Wireframe icosahedron and a point field behind the portrait. Skipped on small screens and for
// reduced motion; pauses off-screen; Three.js loads lazily so it never blocks first paint.
export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.innerWidth < MIN_WIDTH || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup = () => undefined as void;

    void import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // No WebGL: the portrait alone is a fine hero.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.className = "absolute inset-0 h-full w-full";
      renderer.domElement.setAttribute("aria-hidden", "true");
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 8.5;
      const color = new THREE.Color(themeColor());

      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.4, 1),
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 })
      );
      scene.add(ico);

      const positions = new Float32Array(POINTS * 3);
      for (let i = 0; i < POINTS; i++) {
        const r = 3.0 + Math.random() * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions.set([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)], i * 3);
      }
      const pointGeo = new THREE.BufferGeometry();
      pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const points = new THREE.Points(
        pointGeo,
        new THREE.PointsMaterial({ color, size: 0.035, transparent: true, opacity: 0.7 })
      );
      scene.add(points);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const pointer = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let raf = 0;
      let visible = true;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        ico.rotation.y += 0.003;
        ico.rotation.x += 0.0015;
        points.rotation.y -= 0.0008;
        scene.rotation.y += (pointer.x * 0.25 - scene.rotation.y) * 0.04;
        scene.rotation.x += (pointer.y * 0.18 - scene.rotation.x) * 0.04;
        renderer.render(scene, camera);
      };
      const io = new IntersectionObserver(([entry]) => {
        const next = !!entry?.isIntersecting;
        if (next === visible) return;
        visible = next;
        if (visible) tick();
        else cancelAnimationFrame(raf);
      });
      io.observe(el);
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        ico.geometry.dispose();
        ico.material.dispose();
        pointGeo.dispose();
        points.material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={host} aria-hidden className="pointer-events-none absolute -inset-14 -z-0 hidden min-[700px]:block" />;
}
