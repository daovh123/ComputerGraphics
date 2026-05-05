import React, { useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Box3, Vector3, Color } from "three";
import { lesson31Parts, type BodySystem, type BodyView, type Lesson31PartItem } from "../../data/lesson31";
import { cn } from "../../lib/utils";
import Lesson31ImageMap from "./Lesson31ImageMap";
import Lesson31PartsPanel from "./Lesson31PartsPanel";
import skeletonModelPath from "../../assets/3d/ct_derived_human_skeleton.glb";
import muscleModelPath from "../../assets/3d/cơ.glb";

const skeletonNodeToPartId: Record<string, string> = {
  "Cranium": "skull-front",
  "Mandible": "skull-front",
  "l_clavicle": "clavicle-front", "r_clavicle": "clavicle-front",
  "Sternum": "sternum-front", "Xiphoid process": "sternum-front",
  "c1": "spine-front", "c2": "spine-front", "c3": "spine-front", "c4": "spine-front", "c5": "spine-front", "c6": "spine-front", "c7": "spine-front",
  "t1": "spine-front", "t2": "spine-front", "t3": "spine-front", "t4": "spine-front", "t5": "spine-front", "t6": "spine-front", "t7": "spine-front", "t8": "spine-front", "t9": "spine-front", "t10": "spine-front", "t11": "spine-front", "t12": "spine-front",
  "l1": "spine-front", "l2": "spine-front", "l3": "spine-front", "l4": "spine-front", "l5": "spine-front",
  "Sacrum": "spine-front", "Coccyx": "spine-front",
  "l_rib1": "ribs-front", "l_rib2": "ribs-front", "l_rib3": "ribs-front", "l_rib4": "ribs-front", "l_rib5": "ribs-front", "l_rib6": "ribs-front", "l_rib7": "ribs-front", "l_rib8": "ribs-front", "l_rib9": "ribs-front", "l_rib10": "ribs-front", "l_rib11": "ribs-front", "l_rib12": "ribs-front",
  "r_rib1": "ribs-front", "r_rib2": "ribs-front", "r_rib3": "ribs-front", "r_rib4": "ribs-front", "r_rib5": "ribs-front", "r_rib6": "ribs-front", "r_rib7": "ribs-front", "r_rib8": "ribs-front", "r_rib9": "ribs-front", "r_rib10": "ribs-front", "r_rib11": "ribs-front", "r_rib12": "ribs-front",
  "l_oscoxa": "pelvis-front", "r_oscoxa": "pelvis-front",
  "l_humerus": "humerus-front", "r_humerus": "humerus-front",
  "l_radius": "radius-ulna-front", "r_radius": "radius-ulna-front",
  "l_ulna": "radius-ulna-front", "r_ulna": "radius-ulna-front",
  "l_femur": "femur-front", "r_femur": "femur-front",
  "l_patella": "patella-front", "r_patella": "patella-front",
  "l_tibia": "tibia-front", "r_tibia": "tibia-front",
  "l_fibula": "fibula-back", "r_fibula": "fibula-back",
  "l_scapula": "scapula-back", "r_scapula": "scapula-back",
  
  // Hand bones
  "l_trapezium": "hand-bones-front", "r_trapezium": "hand-bones-front",
  "l_trapezoid": "hand-bones-front", "r_trapezoid": "hand-bones-front",
  "l_capitate": "hand-bones-front", "r_capitate": "hand-bones-front",
  "l_hamate": "hand-bones-front", "r_hamate": "hand-bones-front",
  "l_scaphoid": "hand-bones-front", "r_scaphoid": "hand-bones-front",
  "l_lunate": "hand-bones-front", "r_lunate": "hand-bones-front",
  "l_triquetral": "hand-bones-front", "r_triquetral": "hand-bones-front",
  "l_pisiform": "hand-bones-front", "r_pisiform": "hand-bones-front",
  "l_metacarpal1": "hand-bones-front", "l_metacarpal2": "hand-bones-front", "l_metacarpal3": "hand-bones-front", "l_metacarpal4": "hand-bones-front", "l_metacarpal5": "hand-bones-front",
  "r_metacarpal1": "hand-bones-front", "r_metacarpal2": "hand-bones-front", "r_metacarpal3": "hand-bones-front", "r_metacarpal4": "hand-bones-front", "r_metacarpal5": "hand-bones-front",
  "l_proximal phalange1": "hand-bones-front", "l_distal phalange1": "hand-bones-front",
  "l_proximal phalange2": "hand-bones-front", "l_intermediate phalange2": "hand-bones-front", "l_distal phalange2": "hand-bones-front",
  "l_proximal phalange3": "hand-bones-front", "l_intermediate phalange3": "hand-bones-front", "l_distal phalange3": "hand-bones-front",
  "l_proximal phalange4": "hand-bones-front", "l_intermediate phalange4": "hand-bones-front", "l_distal phalange4": "hand-bones-front",
  "l_proximal phalange5": "hand-bones-front", "l_intermediate phalange5": "hand-bones-front", "l_distal phalange5": "hand-bones-front",
  "r_proximal phalange1": "hand-bones-front", "r_distal phalange1": "hand-bones-front",
  "r_proximal phalange2": "hand-bones-front", "r_intermediate phalange2": "hand-bones-front", "r_distal phalange2": "hand-bones-front",
  "r_proximal phalange3": "hand-bones-front", "r_intermediate phalange3": "hand-bones-front", "r_distal phalange3": "hand-bones-front",
  "r_proximal phalange4": "hand-bones-front", "r_intermediate phalange4": "hand-bones-front", "r_distal phalange4": "hand-bones-front",
  "r_proximal phalange5": "hand-bones-front", "r_intermediate phalange5": "hand-bones-front",
  
  // Foot bones
  "l calcaneus": "foot-bones-front", "l talus": "foot-bones-front", "l navicular": "foot-bones-front", "l medial cuneiform": "foot-bones-front", "l intermediate cuneiform": "foot-bones-front", "l lateral cuneiform": "foot-bones-front", "l cuboid": "foot-bones-front",
  "r_calcaneus": "foot-bones-front", "r_talus": "foot-bones-front", "r_navicular": "foot-bones-front", "r_medial cuneiform": "foot-bones-front", "r_intermediate cuneiform": "foot-bones-front", "r_lateral cuneiform": "foot-bones-front", "r_cuboid": "foot-bones-front",
  "l metatarsal 1": "foot-bones-front", "l metatarsal 2": "foot-bones-front", "l metatarsal 3": "foot-bones-front", "l metatarsal 4": "foot-bones-front", "l metatarsal 5": "foot-bones-front",
  "r_metatarsal 1": "foot-bones-front", "r_metatarsal 2": "foot-bones-front", "r_metatarsal 3": "foot-bones-front", "r_metatarsal 4": "foot-bones-front", "r_metatarsal 5": "foot-bones-front",
  "l proximal phalange 1": "foot-bones-front", "l distal phalange 1": "foot-bones-front",
  "l proximal phalange 2": "foot-bones-front", "l intermediate phalange 2": "foot-bones-front", "l distal phalange 2": "foot-bones-front",
  "l proximal phalange 3": "foot-bones-front", "l intermediate phalange 3": "foot-bones-front", "l distal phalange 3": "foot-bones-front",
  "l proximal phalange 4": "foot-bones-front", "l intermediate phalange 4": "foot-bones-front", "l distal phalange 4": "foot-bones-front",
  "l proximal phalange 5": "foot-bones-front", "l interemediate phalange 5": "foot-bones-front", "l distal phalange 5": "foot-bones-front",
  "r_proximal phalange 1": "foot-bones-front", "r_distal phalange 1": "foot-bones-front",
  "r_proximal phalange 2": "foot-bones-front", "r_intermediate phalange 2": "foot-bones-front", "r_distal phalange 2": "foot-bones-front",
  "r_proximal phalange 3": "foot-bones-front", "r_intermediate phalange 3": "foot-bones-front", "r_distal phalange 3": "foot-bones-front",
  "r_proximal phalange 4": "foot-bones-front", "r_intermediate phalange 4": "foot-bones-front", "r_distal phalange 4": "foot-bones-front",
  "r_proximal phalange 5": "foot-bones-front", "r_intermediate phalange 5": "foot-bones-front", "r_distal phalange 5": "foot-bones-front", "r_distal phalange5": "foot-bones-front",
  "sesamoids": "foot-bones-front", "sesamoids.001": "foot-bones-front",
  
  "hyoid": "skull-front"
};

function ExplorerModel({ path, scaleFit, onSelectPart, isSkeleton, setHovered }: { path: string; scaleFit: number; onSelectPart: (id: string) => void; isSkeleton: boolean; setHovered: (h: boolean) => void }) {
  const gltf = useGLTF(path);
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    
    // Đảm bảo mỗi mesh có material riêng biệt để đổi màu không bị dính vào mesh khác
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });

    const box = new Box3().setFromObject(cloned);
    const size = box.getSize(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    cloned.scale.setScalar(scaleFit / maxDimension);
    const centeredBox = new Box3().setFromObject(cloned);
    const center = centeredBox.getCenter(new Vector3());
    cloned.position.set(-center.x, -center.y, -center.z);
    return cloned;
  }, [gltf.scene, scaleFit]);

  const handlePointerDown = (e: any) => {
    if (!isSkeleton) return;
    e.stopPropagation();
    let nodeName = e.object.name.replace("_beige_0", "");
    const mappedId = skeletonNodeToPartId[nodeName];
    if (mappedId) {
      onSelectPart(mappedId);
    }
  };

  const handlePointerOver = (e: any) => {
    if (!isSkeleton) return;
    e.stopPropagation();
    let nodeName = e.object.name.replace("_beige_0", "");
    if (skeletonNodeToPartId[nodeName]) {
      setHovered(true);
      if (e.object.material) {
        if (e.object.userData.originalEmissive === undefined) {
          e.object.userData.originalEmissive = e.object.material.emissive 
            ? e.object.material.emissive.clone() 
            : new Color(0x000000);
        }
        e.object.material.emissive = new Color("#00BFFF");
      }
    }
  };

  const handlePointerOut = (e: any) => {
    if (!isSkeleton) return;
    setHovered(false);
    if (e.object.material && e.object.userData.originalEmissive) {
      e.object.material.emissive.copy(e.object.userData.originalEmissive);
    }
  };

  return <primitive object={scene} onPointerDown={handlePointerDown} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} />;
}

function ModelFallback() {
  return (
    <Html center>
      <div className="px-3 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold whitespace-nowrap">
        Đang tải mô hình 3D...
      </div>
    </Html>
  );
}

interface Lesson31ExplorerProps {
  system: BodySystem;
  view: BodyView;
  imageSrc: string;
  parts: Lesson31PartItem[];
  selectedPart: Lesson31PartItem | null;
  onSystemChange: (system: BodySystem) => void;
  onViewChange: (view: BodyView) => void;
  onSelectPart: (id: string) => void;
}

const systemOptions: Array<{ id: BodySystem; label: string }> = [
  { id: "muscle", label: "Hệ cơ" },
  { id: "skeleton", label: "Hệ xương" },
];

const viewOptions: Array<{ id: BodyView; label: string }> = [
  { id: "front", label: "Mặt trước" },
  { id: "back", label: "Mặt sau" },
];

export default function Lesson31Explorer({
  system,
  view,
  imageSrc,
  parts,
  selectedPart,
  onSystemChange,
  onViewChange,
  onSelectPart,
}: Lesson31ExplorerProps) {
  const [displayMode, setDisplayMode] = useState<"2d" | "3d">("2d");
  const [hovered, setHovered] = useState(false);

  const displayParts = useMemo(() => {
    let result: Lesson31PartItem[];
    if (displayMode === "2d") {
      result = parts;
    } else {
      const allSystemParts = lesson31Parts.filter((p) => p.system === system);
      const uniquePartsMap = new Map<string, Lesson31PartItem>();

      for (const p of allSystemParts) {
        if (!uniquePartsMap.has(p.name) || p.id === selectedPart?.id) {
          uniquePartsMap.set(p.name, p);
        }
      }
      result = Array.from(uniquePartsMap.values());
    }

    const PART_ORDER = [
      "Xương sọ", "Cột sống", "Xương đòn", "Xương bả vai", "Xương ức", "Xương sườn", "Xương chậu",
      "Xương cánh tay", "Xương cẳng tay", "Xương bàn tay và ngón tay",
      "Xương đùi", "Xương bánh chè", "Xương chày", "Xương mác", "Xương bàn chân và ngón chân",
      "Cơ ức đòn chũm", "Cơ thang", "Cơ delta", "Cơ ngực lớn", "Cơ lưng rộng",
      "Cơ nhị đầu cánh tay", "Cơ tam đầu cánh tay", "Cơ thẳng bụng", "Cơ chéo bụng",
      "Cơ mông lớn", "Cơ tứ đầu đùi", "Cơ gân kheo", "Cơ chày trước", "Cơ sinh đôi cẳng chân"
    ];

    return [...result].sort((a, b) => {
      let indexA = PART_ORDER.indexOf(a.name);
      let indexB = PART_ORDER.indexOf(b.name);
      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;
      return indexA - indexB;
    });
  }, [displayMode, parts, system, selectedPart?.id]);

  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl p-4 md:p-5 shadow-sm space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-[#1F2937]">Cấu tạo & chức năng</h2>
        <p className="text-sm text-[#64748B]">
          Chọn hệ cơ hoặc hệ xương, sau đó bấm vào tên bộ phận để xem thông tin.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-xl border border-[#D7E8FF] p-1 bg-[#F8FBFF]">
          {systemOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => onSystemChange(item.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                system === item.id
                  ? "bg-[#00BFFF] text-white"
                  : "text-[#475569] hover:bg-[#EAF5FF]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {displayMode === "2d" && (
          <div className="flex items-center rounded-xl border border-[#D7E8FF] p-1 bg-[#F8FBFF]">
            {viewOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                  view === item.id
                    ? "bg-[#00BFFF] text-white"
                    : "text-[#475569] hover:bg-[#EAF5FF]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center rounded-xl border border-[#D7E8FF] p-1 bg-[#F8FBFF] ml-auto">
          <button
            onClick={() => setDisplayMode("2d")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
              displayMode === "2d" ? "bg-[#00BFFF] text-white" : "text-[#475569] hover:bg-[#EAF5FF]"
            )}
          >
            Hình ảnh 2D
          </button>
          <button
            onClick={() => setDisplayMode("3d")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
              displayMode === "3d" ? "bg-[#00BFFF] text-white" : "text-[#475569] hover:bg-[#EAF5FF]"
            )}
          >
            Mô hình 3D
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(380px,460px)_minmax(340px,420px)] gap-4 lg:gap-5 justify-center items-start">
        <div className="w-full max-w-[460px]">
          {displayMode === "2d" ? (
            <Lesson31ImageMap
              imageSrc={imageSrc}
              imageAlt={`Sơ đồ ${system === "muscle" ? "hệ cơ" : "hệ xương"} ${view === "front" ? "mặt trước" : "mặt sau"}`}
            />
          ) : (
            <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-[#DDEBFF] bg-gradient-to-b from-[#F5FAFF] to-[#EBF4FF]">
              <Canvas camera={{ position: [0, 0.2, 3.6], fov: 46 }} style={{ cursor: hovered ? 'pointer' : 'auto' }}>
                <ambientLight intensity={0.72} />
                <directionalLight position={[4, 5, 4]} intensity={1.15} />
                <directionalLight position={[-3, 2, -3]} intensity={0.55} />
                <Suspense fallback={<ModelFallback />}>
                  <ExplorerModel
                    path={system === "skeleton" ? skeletonModelPath : muscleModelPath}
                    scaleFit={2.6}
                    onSelectPart={onSelectPart}
                    isSkeleton={system === "skeleton"}
                    setHovered={setHovered}
                  />
                </Suspense>
                <OrbitControls enableDamping dampingFactor={0.08} minDistance={1.2} maxDistance={8} />
              </Canvas>
            </div>
          )}
        </div>

        <div className="w-full max-w-[420px]">
          <Lesson31PartsPanel
            parts={displayParts}
            selectedPart={selectedPart}
            onSelectPart={onSelectPart}
          />
        </div>
      </div>
    </section>
  );
}
