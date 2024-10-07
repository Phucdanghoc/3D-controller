import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Euler, Color } from 'three'; 

const Model = ({ position, rotation, zoom }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      const currentRotation = meshRef.current.rotation.clone();
      const targetRotation = new Euler(rotation[0], rotation[1], rotation[2]);

      const lerpFactor = 0.1; 
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor;
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor;
      currentRotation.z += (targetRotation.z - currentRotation.z) * lerpFactor;

      meshRef.current.rotation.copy(currentRotation);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Shoe scale={[zoom, zoom, zoom]} />
    </group>
  );
};

function Shoe(props) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/nike_air_zoom_pegasus_36-transformed.glb');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
  });

  return (
    <group ref={ref}>
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.NikeShoe}
        {...props}
      />
    </group>
  );
}

useGLTF.preload('/nike_air_zoom_pegasus_36-transformed.glb');

export default Model;
