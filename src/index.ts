// env-diff: compare .env vs .env.example
import * as fs from 'fs';

export interface DiffResult {
  missing: string[];
  extra: string[];
  empty: string[];
}

export function parseEnv(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

export function diff(envPath = '.env', examplePath = '.env.example'): DiffResult {
  const env = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath, 'utf8')) : {};
  const example = fs.existsSync(examplePath) ? parseEnv(fs.readFileSync(examplePath, 'utf8')) : {};
  const envKeys = new Set(Object.keys(env));
  const exKeys = new Set(Object.keys(example));
  const missing = [...exKeys].filter((k) => !envKeys.has(k));
  const extra = [...envKeys].filter((k) => !exKeys.has(k));
  const empty = [...envKeys].filter((k) => env[k] === '');
  return { missing, extra, empty };
}

export function report(result: DiffResult): string {
  const lines: string[] = [];
  lines.push(`Faltando (${result.missing.length}): ${result.missing.join(', ') || '-'}`);
  lines.push(`Extras   (${result.extra.length}): ${result.extra.join(', ') || '-'}`);
  lines.push(`Vazias   (${result.empty.length}): ${result.empty.join(', ') || '-'}`);
  return lines.join('\n');
}
