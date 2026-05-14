'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!points.current) return;

    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    if (points.current.geometry) {
      points.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const positions = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.5;
      if (positions[i + 1] < -1000) {
        positions[i + 1] = 1000;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.x += 0.00002;
    points.current.rotation.y += 0.00003;
  });

  return (
    <Points ref={points} stride={3}>
      <PointMaterial transparent color="#00d9ff" size={2} opacity={0.6} />
    </Points>
  );
}

function GridPlane() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.position.z = (state.clock.elapsedTime * 50) % 500 - 250;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh>
        <planeGeometry args={[1000, 1000, 50, 50]} />
        <meshBasicMaterial
          color="#003d4d"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 w-full h-screen -z-10">
      <Canvas
        camera={{ position: [0, 0, 300], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[100, 100, 100]} intensity={0.5} color="#00d9ff" />
        
        <ParticleField />
        <GridPlane />
      </Canvas>
    </div>
  );
}
