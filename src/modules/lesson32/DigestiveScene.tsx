import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group } from "three";
import { lesson32Organs } from "./content";

interface DigestiveSceneProps {
  selectedOrganId: string;
  onSelectOrgan: (organId: string) => void;
}

function FallbackOrgans({
  selectedOrganId,
  onSelectOrgan,
}: DigestiveSceneProps) {
  return (
    <group>
      {lesson32Organs.map((organ) => {
        const isActive = selectedOrganId === organ.id;
        return (
          <group key={organ.id} position={organ.position}>
            <mesh
              onClick={() => onSelectOrgan(organ.id)}
              castShadow
              receiveShadow
            >
              <sphereGeometry
                args={isActive ? [0.2, 32, 32] : [0.16, 28, 28]}
              />
              <meshStandardMaterial
                color={organ.color}
                emissive={isActive ? "#f8fafc" : "#000000"}
                emissiveIntensity={isActive ? 0.6 : 0}
                roughness={0.35}
                metalness={0.1}
              />
            </mesh>
            {isActive && (
              <Html position={[0, 0.32, 0]} center>
                <div className="px-3 py-1 rounded-lg bg-[#111827] text-white text-xs font-bold whitespace-nowrap">
                  {organ.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function SceneContent({ selectedOrganId, onSelectOrgan }: DigestiveSceneProps) {
  const [loadedModel, setLoadedModel] = useState<Group | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new GLTFLoader();

    loader.load(
      "/models/lesson-32-digestive.glb",
      (gltf) => {
        if (!mounted) {
          return;
        }
        setLoadedModel(gltf.scene.clone());
      },
      undefined,
      () => {
        if (!mounted) {
          return;
        }
        setLoadedModel(null);
      },
    );

    return () => {
      mounted = false;
    };
  }, []);

  const organOverlays = useMemo(
    () => (
      <group>
        {lesson32Organs.map((organ) => {
          const isActive = selectedOrganId === organ.id;
          return (
            <group key={`overlay-${organ.id}`} position={organ.position}>
              <mesh onClick={() => onSelectOrgan(organ.id)}>
                <sphereGeometry
                  args={isActive ? [0.19, 24, 24] : [0.15, 18, 18]}
                />
                <meshStandardMaterial
                  color={organ.color}
                  transparent
                  opacity={isActive ? 0.9 : 0.25}
                  emissive={isActive ? "#ffffff" : "#000000"}
                  emissiveIntensity={isActive ? 0.75 : 0}
                />
              </mesh>
              {isActive && (
                <Html position={[0, 0.3, 0]} center>
                  <div className="px-3 py-1 rounded-lg bg-[#0f172a] text-white text-xs font-bold whitespace-nowrap">
                    {organ.name}
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>
    ),
    [onSelectOrgan, selectedOrganId],
  );

  if (!loadedModel) {
    return (
      <FallbackOrgans
        selectedOrganId={selectedOrganId}
        onSelectOrgan={onSelectOrgan}
      />
    );
  }

  return (
    <group>
      <primitive object={loadedModel} scale={1.3} position={[0, -0.55, 0]} />
      {organOverlays}
    </group>
  );
}

export default function DigestiveScene({
  selectedOrganId,
  onSelectOrgan,
}: DigestiveSceneProps) {
  return (
    <div className="w-full h-[520px] bg-gradient-to-b from-[#f8fbff] to-[#eef7ff] rounded-3xl border border-[#E0F0FF] overflow-hidden">
      <Canvas camera={{ position: [0, 0.4, 2.8], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 3]} intensity={1.1} castShadow />
        <directionalLight position={[-2, 2, -2]} intensity={0.5} />
        <SceneContent
          selectedOrganId={selectedOrganId}
          onSelectOrgan={onSelectOrgan}
        />
        <OrbitControls enablePan={false} maxDistance={4} minDistance={1.6} />
      </Canvas>
    </div>
  );
}
