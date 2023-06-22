import * as packageJson from './package.json'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import {defineConfig} from 'vite'
import {resolve} from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/components/'],
    }),
    libCss({}),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'Hybr1d UI',
      // formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: 'hybr1d-ui',
      // fileName: format => `${packageJson.name}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
