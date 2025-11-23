// Configuration esbuild pour api/index.ts avec résolution des alias
import { build } from 'esbuild';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';

const nodeModules = readdirSync(join(process.cwd(), 'node_modules'));

await build({
  entryPoints: ['api/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'api',
  external: nodeModules,
  resolveExtensions: ['.ts', '.js', '.tsx', '.jsx'],
  alias: {
    '@shared': resolve(process.cwd(), 'shared'),
  },
  logLevel: 'info',
});

