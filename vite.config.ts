import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import checker from 'vite-plugin-checker'
import pkg from './package.json'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'

const peers = Object.keys(pkg.peerDependencies)

export default defineConfig({
  plugins: [
    react({jsxImportSource: 'react'}),
    dts({
      bundleTypes: true, // Merge all types into one file
      insertTypesEntry: true, // Insert type entry file in the package
      tsconfigPath: './tsconfig.app.json', // Points to your tsconfig
    }),
    // Injects each chunk's own CSS import (replaces vite-plugin-libcss).
    // With preserveModules, consumers only load CSS for the components they
    // bundle; the four global styles stay on the entry chunk because they're
    // imported at the top of components/index.ts.
    libInjectCss(),
    checker({typescript: true}),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
    },
    cssCodeSplit: true,
    rolldownOptions: {
      // Prefix-match so dep subpaths (e.g. zustand/middleware) are
      // externalized too — exact matching used to silently bundle them.
      external: (id: string) => peers.some(p => id === p || id.startsWith(p + '/')),
      output: {
        // One output module per source module: consumers tree-shake per
        // component, and their bundlers place each module in the chunk where
        // it's used (eager shell vs lazy routes) instead of keeping the whole
        // library in the startup bundle.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
