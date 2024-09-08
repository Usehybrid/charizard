import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import checker from 'vite-plugin-checker'
import pkg from './package.json'
import {defineConfig} from 'vite'
import {resolve} from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      include: ['src/components/'],
      tsconfigPath: './tsconfig.app.json',
    }),
    libCss({}),
    checker({
      typescript: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'Charizard',
      fileName: 'hybr1d-ui',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), '@emotion/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
