import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import checker from 'vite-plugin-checker'
import pkg from './package.json'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true, // Merge all types into one file
      insertTypesEntry: true, // Insert type entry file in the package
      tsconfigPath: './tsconfig.app.json', // Points to your tsconfig
    }),
    libCss(),
    checker({typescript: true}),
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
