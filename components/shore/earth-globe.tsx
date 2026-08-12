'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import * as THREE from 'three';
import { withBasePath } from '@/lib/asset-path';

export function EarthGlobe({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rect = host.getBoundingClientRect();
    let width = Math.max(rect.width, 200);
    let height = Math.max(rect.height, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.9);

    const loader = new THREE.TextureLoader();
    // The Earth textures are 1200x600 (non-power-of-two). Mipmapping NPOT
    // textures is unreliable on some WebGL backends, so disable it and use
    // plain linear filtering — fine at this render size.
    const load = (path: string) => {
      const texture = loader.load(withBasePath(`/earth/${path}`));
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };
    const srgb = (path: string) => {
      const texture = load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const group = new THREE.Group();
    group.rotation.z = 0.41;
    scene.add(group);

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: srgb('diffuse.png'),
      bumpMap: load('bump.png'),
      bumpScale: 0.025,
      roughnessMap: load('ocean.png'),
      roughness: 1,
      metalness: 0.05,
      emissiveMap: srgb('night.png'),
      emissive: new THREE.Color('#8fb3c9'),
      emissiveIntensity: 0.35,
    });
    const earthGeometry = new THREE.SphereGeometry(1, 72, 48);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    group.add(earth);

    const cloudTexture = load('clouds.png');
    const cloudGeometry = new THREE.SphereGeometry(1.014, 64, 40);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      alphaMap: cloudTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      roughness: 1,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    group.add(clouds);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(2.6, 1.6, 2.8);
    scene.add(key);
    const rim = new THREE.PointLight(0x2f7d8c, 3, 12);
    rim.position.set(-3.2, 0.6, -1.2);
    scene.add(rim);

    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 0.45;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      const r = host.getBoundingClientRect();
      width = Math.max(r.width, 200);
      height = Math.max(r.height, 200);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    resizeObserver.observe(host);

    let rafId = 0;
    const tick = () => {
      if (!reduced) earth.rotation.y += 0.0014;
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;
      group.rotation.x = py;
      group.position.x = px * 0.1;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      cloudTexture.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} style={style} />;
}
