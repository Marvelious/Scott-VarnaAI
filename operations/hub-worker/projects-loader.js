import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadYaml(path) {
  // Minimal YAML reader for the simple sample file (no deps)
  const text = readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/);
  const out = [];
  let cur = null;
  for (const line of lines) {
    if (line.trim().startsWith('#') || line.trim() === '') continue;
    if (line.startsWith('projects:')) continue;
    if (line.match(/^\s*-\s+slug:/)) {
      if (cur) out.push(cur);
      const slug = line.split(':')[1].trim();
      cur = { slug };
    } else if (cur && line.match(/^\s{2,}[a-zA-Z_]+:/)) {
      const [k, vraw] = line.trim().split(':');
      let v = vraw?.trim();
      if (v === 'true') v = true; else if (v === 'false') v = false; else if (/^\d+$/.test(v||'')) v = Number(v);
      cur[k] = v;
    } else if (cur && line.match(/^\s{4,}[a-zA-Z_]+:/)) {
      // nested simple maps under flags/feedback minimal support
      const [k, vraw] = line.trim().split(':');
      const parentKeyMatch = line.match(/^\s{4,}([a-zA-Z_]+):/);
      if (parentKeyMatch) {
        if (!cur.flags) cur.flags = {};
        const key = k;
        let v = (vraw||'').trim();
        if (v === 'true') v = true; else if (v === 'false') v = false; else if (/^\d+$/.test(v)) v = Number(v);
        cur.flags[key] = v;
      }
    }
  }
  if (cur) out.push(cur);
  return out;
}

const pathA = resolve(__dirname, '../projects.yaml');
const pathB = resolve(__dirname, '../projects.sample.yaml');
const path = existsSync(pathA) ? pathA : pathB;

let list = [];
try {
  list = loadYaml(path);
} catch (e) {
  // eslint-disable-next-line no-console
  console.log('Failed to load projects.yaml; falling back to default');
  list = [];
}

// index by slug
const projects = Object.fromEntries(list.map((p) => [p.slug, p]));

export default projects;

