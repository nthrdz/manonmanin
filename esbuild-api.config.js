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
  outfile: resolve(process.cwd(), 'api', 'index.js'), // Fichier de sortie spécifique
  // Ne marquer comme externes QUE les packages npm, pas les modules locaux  
  external: nodeModules,
  resolveExtensions: ['.ts', '.js', '.tsx', '.jsx'],
  alias: {
    '@shared': resolve(process.cwd(), 'shared'),
  },
  logLevel: 'info',
  banner: {
    js: '// Bundled by esbuild - all local modules are included',
  },
});

