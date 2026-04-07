/**
 * Lesson32 3D Model & Image Asset Resolution System
 * Similar to lesson30Slots.ts but for digestive system organs
 * Auto-discovers GLB models and PNG/JPG images from assets
 */

type UrlGlob = Record<string, string>;
type ResolvedAsset = { url?: string; available: boolean };

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getBaseName(filePath: string): string {
  const fileName = filePath.split("/").pop() ?? filePath;
  return fileName.replace(/\.(glb|gltf|png|jpg|jpeg|webp|svg|gif)$/i, "");
}

function buildUrlIndex(urls: UrlGlob): Map<string, string> {
  const index = new Map<string, string>();
  for (const [path, url] of Object.entries(urls)) {
    index.set(normalizeKey(getBaseName(path)), url);
  }
  return index;
}

// Auto-discover all 3D models at BUILD TIME
const modelUrls = import.meta.glob("../../assets/3d/**/*.{glb,gltf}", {
  eager: true,
  import: "default",
  query: "?url",
}) as UrlGlob;

const modelsByKey = buildUrlIndex(modelUrls);

// Auto-discover all image assets at BUILD TIME
const imageUrls = import.meta.glob("../../assets/img/**/*.{png,jpg,jpeg,webp,gif,svg}", {
  eager: true,
  import: "default",
  query: "?url",
}) as UrlGlob;

const imagesByKey = buildUrlIndex(imageUrls);

const ORGAN_ALIASES: Record<string, string[]> = {
  // Organ IDs (Vietnamese) map to asset filenames
  "mieng": [
    normalizeKey("miệng"),       // from: miệng.glb
  ],
  
  "thuc-quan": [
    normalizeKey("thực quản"),   // from: thực quản.png
  ],
  
  "da-day": [
    normalizeKey("dạ dày"),      // from: dạ dày.glb
  ],
  
  "gan": [
    normalizeKey("gan"),         // from: gan.glb
  ],
  
  "tuy": [
    normalizeKey("tuỵ"),         // from: tuỵ.png
  ],
  
  "ruot-non": [
    normalizeKey("ruột non"),    // from: ruột non.glb
  ],
  
  "ruot-gia": [
    normalizeKey("ruột già"),    // from: ruột già.glb
  ],

  "he-tieu-hoa": [
    normalizeKey("hệ tiêu hóa"), // from: hệ tiêu hóa.glb
  ],

  // Aliases for digestive system (full system display)
  "digestive-system": [
    normalizeKey("hệ tiêu hóa"), // from: hệ tiêu hóa.glb
  ],
};

/**
 * Resolve model URL for an organ by ID
 * - Check aliases first (with all variations)  
 * - Direct lookup by model filename
 * - Normalize Vietnamese names (remove accents)
 * - NO FALLBACK - return unavailable if not found
 */
export function resolveOrganModel(organId: string): ResolvedAsset {
  const normalizedId = normalizeKey(organId);
  
  // Check ORGAN_ALIASES: try both original ID and normalized form
  let aliases: string[] | undefined;
  
  // First try original organId as key
  aliases = ORGAN_ALIASES[organId as keyof typeof ORGAN_ALIASES];
  
  // If not found, try each key and check if it normalizes to the same value
  if (!aliases) {
    for (const [aliasKey, aliasValues] of Object.entries(ORGAN_ALIASES)) {
      if (normalizeKey(aliasKey) === normalizedId) {
        aliases = aliasValues;
        break;
      }
    }
  }

  // Try to resolve using found aliases
  if (aliases && aliases.length > 0) {
    for (const aliasKey of aliases) {
      const aliasUrl = modelsByKey.get(aliasKey);
      if (aliasUrl) {
        console.debug(`[resolveOrganModel] Found via alias for "${organId}":`, aliasKey, "->", aliasUrl.substring(0, 50));
        return { url: aliasUrl, available: true };
      }
    }
  }

  // Try direct lookup in models map
  const directUrl = modelsByKey.get(normalizedId);
  if (directUrl) {
    console.debug(`[resolveOrganModel] Found direct match for "${organId}":`, normalizedId, "->", directUrl.substring(0, 50));
    return { url: directUrl, available: true };
  }

  // Not found - NO FALLBACK
  console.error(`[resolveOrganModel] ERROR - No model found for "${organId}"!`);
  return { available: false };
}

/**
 * Get all discovered models (for debugging)
 */
export function getDiscoveredModels(): string[] {
  const models = Array.from(modelsByKey.keys());
  console.debug("[getDiscoveredModels] Total models found:", models.length);
  console.debug("[getDiscoveredModels]", models);
  return models;
}

/**
 * Debug: print all organs and their resolved models
 */
export function debugOrganModels(organIds: string[]): void {
  console.debug("=== ORGAN MODEL RESOLUTION DEBUG ===");
  for (const id of organIds) {
    const resolved = resolveOrganModel(id);
    console.debug(`${id}:`, resolved);
  }
  console.debug("===================================");
}

/**
 * Debug: print all available images
 */
export function debugAllAssets(): void {
  console.debug("=== ALL DISCOVERED MODELS ===");
  console.debug("Models count:", modelsByKey.size);
  modelsByKey.forEach((url, key) => {
    console.debug(`  ${key} -> ${url.substring(0, 60)}...`);
  });
  console.debug("=== ALL DISCOVERED IMAGES ===");
  console.debug("Images count:", imagesByKey.size);
  imagesByKey.forEach((url, key) => {
    console.debug(`  ${key} -> ${url.substring(0, 60)}...`);
  });
  console.debug("=============================");
}

/**
 * Check which organs have models available
 */
export function getAvailableOrgans(organIds: string[]): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  for (const Id of organIds) {
    const resolved = resolveOrganModel(Id);
    result[Id] = resolved.available;
  }
  return result;
}

/**
 * Resolve image URL for lesson32 assets
 * - Direct lookup by name
 * - Fallback returns unavailable
 */
export function resolveAssetImage(imageName: string): ResolvedAsset {
  // Direct lookup
  const directKey = normalizeKey(imageName);
  const directUrl = imagesByKey.get(directKey);
  if (directUrl) {
    return { url: directUrl, available: true };
  }

  // Not found
  return { available: false };
}

/**
 * Get all discovered images (for debugging)
 */
export function getDiscoveredImages(): string[] {
  return Array.from(imagesByKey.keys());
}
