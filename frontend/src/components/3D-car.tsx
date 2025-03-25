"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function CarModel() {
  const model = useLoader(GLTFLoader, "/assets/model/Audi.glb");

  return <primitive object={model.scene} position={[0, -1, 0]} scale={1.2} />;
}

export default function CarScene() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
      <Canvas>
        {/* Ambiente HDRI per riflessi */}
        <Environment files="/assets/hdr/car-v1.exr" background={false} />

        {/* Luci extra */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Modello 3D */}
        <CarModel />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}