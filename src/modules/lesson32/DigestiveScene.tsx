import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group } from "three";
import { lesson32OrgansData } from "../../features/lesson32/data/organs";
import { Lesson32OrganData } from "../../features/lesson32/data/types";

interface DigestiveSceneProps {
  selectedOrganId: string;
  onSelectOrgan: (organId: string) => void;
  onModelStatusChange?: (status: "loading" | "ready" | "fallback") => void;
}

interface OrganMarkersProps {
  organs: Lesson32OrganData[];
  selectedOrganId: string;
  onSelectOrgan: (organId: string) => void;
  markerOpacity?: number;
}

function OrganMarkers({
  organs,
  selectedOrganId,
  onSelectOrgan,
  markerOpacity = 0.3,
}: OrganMarkersProps) {
  return (
    <group>
      {organs.map((organ) => {
        const isActive = selectedOrganId === organ.id;
        return (
          <group key={organ.id} position={organ.position}>
            <mesh
              onClick={() => onSelectOrgan(organ.id)}
              castShadow
              receiveShadow
            >
              <sphereGeometry
                args={isActive ? [0.2, 28, 28] : [0.15, 24, 24]}
              />
              <meshStandardMaterial
                color={organ.color}
                transparent
                opacity={isActive ? 0.95 : markerOpacity}
                emissive={isActive ? "#ffffff" : "#000000"}
                emissiveIntensity={isActive ? 0.85 : 0}
                roughness={0.25}
                metalness={0.1}
              />
            </mesh>
            {isActive && (
              <Html position={[0, 0.32, 0]} center>
                <div className="px-3 py-1 rounded-lg bg-[#111827] text-white text-xs font-bold whitespace-nowrap">
                  {organ.shortLabel}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function useDigestiveModel() {
  const [modelStatus, setModelStatus] = useState<
    "loading" | "ready" | "fallback"
  >("loading");
  const [loadedModel, setLoadedModel] = useState<Group | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new GLTFLoader();
    setModelStatus("loading");

    loader.load(
      "/models/lesson-32-digestive.glb",
      (gltf) => {
        if (!mounted) {
          return;
        }
        setLoadedModel(gltf.scene.clone());
        setModelStatus("ready");
      },
      undefined,
      () => {
        if (!mounted) {
          return;
        }
        setLoadedModel(null);
        setModelStatus("fallback");
      },
    );

    return () => {
      mounted = false;
    };
  }, []);

  return { loadedModel, modelStatus };
}

export default function DigestiveScene({
  selectedOrganId,
  onSelectOrgan,
  onModelStatusChange,
}: DigestiveSceneProps) {
  const { loadedModel, modelStatus } = useDigestiveModel();
  const organOverlays = useMemo(() => {
    return (
      <OrganMarkers
        organs={lesson32OrgansData}
        selectedOrganId={selectedOrganId}
        onSelectOrgan={onSelectOrgan}
      />
    );
  }, [onSelectOrgan, selectedOrganId]);

  useEffect(() => {
    if (onModelStatusChange) {
      onModelStatusChange(modelStatus);
    }
  }, [modelStatus, onModelStatusChange]);

  return (
    <div className="w-full h-[520px] bg-gradient-to-b from-[#f8fbff] to-[#eef7ff] rounded-3xl border border-[#E0F0FF] overflow-hidden">
      <Canvas camera={{ position: [0, 0.4, 2.8], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 3]} intensity={1.1} castShadow />
        <directionalLight position={[-2, 2, -2]} intensity={0.5} />
        {!loadedModel ? (
          <OrganMarkers
            organs={lesson32OrgansData}
            selectedOrganId={selectedOrganId}
            onSelectOrgan={onSelectOrgan}
            markerOpacity={0.45}
          />
        ) : (
          <group>
            <primitive
              object={loadedModel}
              scale={1.3}
              position={[0, -0.55, 0]}
            />
            {organOverlays}
          </group>
        )}

        {modelStatus === "loading" && (
          <Html center>
            <div className="px-3 py-1 rounded-lg bg-[#0f172a] text-white text-xs font-semibold">
              Dang tai mo hinh 3D...
            </div>
          </Html>
        )}

        <OrbitControls enablePan={false} maxDistance={4} minDistance={1.6} />
      </Canvas>
    </div>
  );
}
