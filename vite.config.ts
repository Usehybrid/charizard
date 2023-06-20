import * as packageJson from './package.json'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import {defineConfig} from 'vite'
import {resolve} from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'Hybrid UI',
      formats: ['es', 'umd'],
      fileName: format => `hybrid-ui.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
  // esbuild: {
  //   minify: true,
  // },
})
