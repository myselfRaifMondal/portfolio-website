'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMouseStore } from '@/lib/store';

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const mouse = useMouseStore((state) => state.mouse);
  const [particlePositions, setParticlePositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    // Generate neural network points in sphere pattern
    const count = 1500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      positions[i * 3] = 3 * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = 3 * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = 3 * Math.cos(phi);
    }
    
    setParticlePositions(positions);
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !sphereRef.current) return;

    // Rotate sphere
    sphereRef.current.rotation.x += 0.0003;
    sphereRef.current.rotation.y += 0.0005;

    // Apply mouse influence with smooth interpolation
    const targetRotX = (mouse.y / window.innerHeight) * 0.5;
    const targetRotY = (mouse.x / window.innerWidth) * 0.5;

    sphereRef.current.rotation.x += (targetRotX - sphereRef.current.rotation.x) * 0.05;
    sphereRef.current.rotation.y += (targetRotY - sphereRef.current.rotation.y) * 0.05;

    // Pulsing glow effect
    const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    sphereRef.current.scale.set(scale, scale, scale);
  });

  if (!particlePositions) return null;

  return (
    <group ref={sphereRef}>
      {/* Neural network points */}
      <Points positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d9ff"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      {/* Central glow sphere */}
      <Sphere args={[2.8, 32, 32]}>
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.1}
          wireframe={true}
        />
      </Sphere>

      {/* Outer corona layer */}
      <Sphere args={[3.2, 32, 32]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.05}
          wireframe={true}
        />
      </Sphere>
    </group>
  );
}

export function AICore() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <NeuralNetwork />
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={256} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
