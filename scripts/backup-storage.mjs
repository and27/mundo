import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "node:fs";
import path from "node:path";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_STORAGE_BUCKET || "stories";
const outputDir = process.env.BACKUP_OUTPUT_DIR || "backups/storage";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const listAll = async (prefix = "") => {
  const items = [];
  const limit = 1000;
  let offset = 0;

  while (true) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, { limit, offset, sortBy: { column: "name", order: "asc" } });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      break;
    }

    items.push(...data);
    if (data.length < limit) {
      break;
    }

    offset += limit;
  }

  return items;
};

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const downloadFile = async (objectPath) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(objectPath);

  if (error) {
    console.error(`Failed to download ${objectPath}:`, error.message);
    return;
  }

  const arrayBuffer = await data.arrayBuffer();
  const destPath = path.join(outputDir, objectPath);
  await ensureDir(path.dirname(destPath));
  await fs.writeFile(destPath, Buffer.from(arrayBuffer));
};

const walk = async (prefix = "") => {
  const items = await listAll(prefix);
  for (const item of items) {
    if (item.name === ".emptyFolderPlaceholder") {
      continue;
    }

    const objectPath = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.id) {
      await downloadFile(objectPath);
      continue;
    }

    await ensureDir(path.join(outputDir, objectPath));
    await walk(objectPath);
  }
};

console.log(`Backing up bucket '${bucket}' to ${outputDir}`);
await ensureDir(outputDir);
await walk();
console.log("Storage backup complete.");
