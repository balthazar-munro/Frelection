/**
 * Bundles the app into one self-contained HTML file for the Artifact preview.
 *
 * Artifacts run under a strict CSP that blocks every external request, so the
 * JS and CSS must be inlined rather than linked.
 */
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'artifact/dist');
mkdirSync(out, { recursive: true });

// 1. Bundle the React app to a single IIFE with everything inlined.
await build({
  entryPoints: [resolve(root, 'artifact/entry.tsx')],
  bundle: true,
  format: 'iife',
  minify: true,
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
  define: { 'process.env.NODE_ENV': '"production"' },
  outfile: resolve(out, 'bundle.js'),
});

// 2. Generate the Tailwind stylesheet for the classes actually used.
execFileSync(
  resolve(root, 'node_modules/.bin/tailwindcss'),
  [
    '-c', resolve(root, 'tailwind.config.mjs'),
    '-i', resolve(root, 'src/styles/global.css'),
    '-o', resolve(out, 'styles.css'),
    '--minify',
  ],
  { cwd: root, stdio: 'inherit' },
);

const js = readFileSync(resolve(out, 'bundle.js'), 'utf8');
const css = readFileSync(resolve(out, 'styles.css'), 'utf8');

// 3. Assemble. No <!doctype>, <html>, <head> or <body> — the artifact host
//    wraps the file in its own skeleton at publish time.
const html = `<title>Frelection</title>
<style>
${css}
</style>
<div id="root"></div>
<script>
${js}
</script>
`;

const target = resolve(root, 'artifact/frelection.html');
writeFileSync(target, html);
console.log(`wrote ${target} (${(html.length / 1024).toFixed(0)} KB)`);
