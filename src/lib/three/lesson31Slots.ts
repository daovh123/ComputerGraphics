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

const modelUrls = import.meta.glob("../../assets/3d/**/*.{glb,gltf}", {
  eager: true,
  import: "default",
  query: "?url",
}) as UrlGlob;

const modelsByKey = buildUrlIndex(modelUrls);

const ORGAN_ALIASES: Record<string, string[]> = {
  "he-van-dong": [
    normalizeKey("ct_derived_human_skeleton"),
    normalizeKey("hệ vận động"),
  ],
  "he-co": [
    normalizeKey("cơ"),
  ],
};

export function resolveOrganModel(organId: string): ResolvedAsset {
  const normalizedId = normalizeKey(organId);
  let aliases: string[] | undefined;
  
  aliases = ORGAN_ALIASES[organId as keyof typeof ORGAN_ALIASES];
  
  if (!aliases) {
    for (const [aliasKey, aliasValues] of Object.entries(ORGAN_ALIASES)) {
      if (normalizeKey(aliasKey) === normalizedId) {
        aliases = aliasValues;
        break;
      }
    }
  }

  if (aliases && aliases.length > 0) {
    for (const aliasKey of aliases) {
      const aliasUrl = modelsByKey.get(aliasKey);
      if (aliasUrl) {
        return { url: aliasUrl, available: true };
      }
    }
  }

  const directUrl = modelsByKey.get(normalizedId);
  if (directUrl) {
    return { url: directUrl, available: true };
  }

  return { available: false };
}
