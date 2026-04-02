import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group, Box3, Vector3 } from "three";
import Fullscreenable from "../../components/Fullscreenable";
import { resolveOrganModel, resolveAssetImage } from "../../lib/three/lesson32Slots";

// Normalize model size to fit in box
function normalizeModelScale(model: Group): number {
  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 1 / maxDim;
  return scale;
}

function useOrganModel(organId?: string) {
  const [model, setModel] = useState<Group | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    // Auto-resolve model URL from lesson32Slots
    const resolved = organId ? resolveOrganModel(organId) : null;
    const modelUrl = resolved?.available ? resolved.url : undefined;

    if (!modelUrl) {
      // Try to find image instead
      const imageResolved = organId ? resolveAssetImage(organId) : null;
      if (imageResolved?.available && imageResolved.url) {
        setImageUrl(imageResolved.url);
        setModel(null);
        setStatus("ready");
      } else {
        setModel(null);
        setImageUrl(null);
        setStatus("loading");
      }
      return;
    }

    let mounted = true;
    const loader = new GLTFLoader();
    setStatus("loading");

    loader.load(
      modelUrl,
      (gltf) => {
        if (!mounted) return;
        const clonedScene = gltf.scene.clone();
        
        // Normalize scale
        const scale = normalizeModelScale(clonedScene);
        clonedScene.scale.set(scale, scale, scale);
        
        // Center model
        const box = new Box3().setFromObject(clonedScene);
        const center = box.getCenter(new Vector3());
        clonedScene.position.sub(center);
        
        setModel(clonedScene);
        setImageUrl(null);
        setStatus("ready");
      },
      undefined,
      (error) => {
        if (!mounted) return;
        console.error(`Failed to load model for ${organId}:`, error);
        
        // Try to load image as fallback
        const imageResolved = organId ? resolveAssetImage(organId) : null;
        if (imageResolved?.available && imageResolved.url) {
          setImageUrl(imageResolved.url);
          setModel(null);
          setStatus("ready");
        } else {
          setModel(null);
          setImageUrl(null);
          setStatus("error");
        }
      },
    );

    return () => {
      mounted = false;
    };
  }, [organId]);

  return { model, imageUrl, status };
}

function OrganImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Html center>
      <div className="flex items-center justify-center w-80 h-80">
        <img 
          src={imageUrl} 
          alt="Organ" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      </div>
    </Html>
  );
}

function OrganModel({
  model,
}: {
  model: Group;
}) {
  return (
    <group>
      <primitive object={model} />
    </group>
  );
}

interface DigestiveSceneProps {
  selectedOrganId: string;
  onSelectOrgan: (organId: string) => void;
  onModelStatusChange?: (status: "loading" | "ready" | "error") => void;
}

// Removed: OrganMarkersProps interface - not needed anymore

// Removed: useDigestiveModel hook - showing only selected organ now
// function useDigestiveModel() { ... }

export default function DigestiveScene({
  selectedOrganId,
  onSelectOrgan,
  onModelStatusChange,
}: DigestiveSceneProps) {
  const { model: organModel, imageUrl: organImageUrl, status: organModelStatus } = useOrganModel(selectedOrganId);

  useEffect(() => {
    if (onModelStatusChange) {
      // Determine overall status based on organ model
      let status: "loading" | "ready" | "error" = "loading";
      if (organModelStatus === "ready") {
        status = "ready";
      } else if (organModelStatus === "error") {
        status = "error";
      }
      onModelStatusChange(status);
    }
  }, [organModelStatus, onModelStatusChange]);

  return (
    <Fullscreenable className="w-full h-[520px] bg-gradient-to-b from-[#f8fbff] to-[#eef7ff] rounded-3xl border border-[#E0F0FF] overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 50 }} 
        shadows
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, -3]} intensity={0.6} />
        
        {/* Selected organ model only */}
        {organModel && (
          <OrganModel model={organModel} />
        )}
        
        {/* Selected organ image when 3D model not available */}
        {organImageUrl && !organModel && (
          <OrganImage imageUrl={organImageUrl} />
        )}

        {organModelStatus === "loading" && (
          <Html center>
            <div className="px-3 py-1 rounded-lg bg-[#0f172a] text-white text-xs font-semibold">
              Đang tải...
            </div>
          </Html>
        )}

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          maxDistance={8}
          minDistance={0.5}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
    </Fullscreenable>
  );
}
