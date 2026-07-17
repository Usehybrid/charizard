import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'

// App-mode config for the design-system showcase site (the library build lives
// in vite.config.ts and must stay lib-only — no dts/libInjectCss/checker here).
export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [react({jsxImportSource: 'react'})],
  build: {
    outDir: 'dist-site',
  },
})
