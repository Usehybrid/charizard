// vite.config.ts
import react from "file:///Users/Abhishek%20Kolge/Documents/charizard/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.0_@types+node@22.2.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/Abhishek%20Kolge/Documents/charizard/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.2.0_rollup@4.20.0_typescript@5.5.4_vite@5.4.0_@types+node@22.2.0_/node_modules/vite-plugin-dts/dist/index.mjs";
import libCss from "file:///Users/Abhishek%20Kolge/Documents/charizard/node_modules/.pnpm/vite-plugin-libcss@1.1.1_vite@5.4.0_@types+node@22.2.0_/node_modules/vite-plugin-libcss/index.js";
import checker from "file:///Users/Abhishek%20Kolge/Documents/charizard/node_modules/.pnpm/vite-plugin-checker@0.7.2_typescript@5.5.4_vite@5.4.0_@types+node@22.2.0__vue-tsc@2.0.29_typescript@5.5.4_/node_modules/vite-plugin-checker/dist/esm/main.js";

// package.json
var package_default = {
  name: "@hybr1d-tech/charizard",
  version: "0.6.61",
  type: "module",
  files: [
    "dist"
  ],
  main: "./dist/hybr1d-ui.umd.js",
  module: "./dist/hybr1d-ui.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/hybr1d-ui.js",
      require: "./dist/hybr1d-ui.umd.js"
    }
  },
  repository: {
    type: "git",
    url: "https://github.com/Usehybrid/charizard"
  },
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    preview: "vite preview",
    storybook: "storybook dev -p 6006",
    "build-storybook": "storybook build",
    prepublishOnly: "npm run build"
  },
  peerDependencies: {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/modifiers": "^7.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@popperjs/core": "^2.11.8",
    "@tanstack/react-table": "^8.19.3",
    "@zag-js/checkbox": "^0.65.0",
    "@zag-js/color-picker": "^0.65.0",
    "@zag-js/combobox": "^0.65.0",
    "@zag-js/dialog": "^0.65.0",
    "@zag-js/menu": "^0.65.0",
    "@zag-js/pagination": "^0.65.0",
    "@zag-js/popover": "^0.65.0",
    "@zag-js/popper": "^0.65.0",
    "@zag-js/radio-group": "^0.65.0",
    "@zag-js/react": "^0.65.0",
    "@zag-js/select": "^0.65.0",
    "@zag-js/tabs": "^0.65.0",
    "@zag-js/tooltip": "^0.65.0",
    clsx: "^2.1.0",
    "date-fns": "^3.6.0",
    react: "^18.3.1",
    "react-country-flag": "^3.1.0",
    "react-day-picker": "8.10.1",
    "react-dom": "^18.3.1",
    "react-infinite-scroll-component": "^6.1.0",
    "react-inlinesvg": "^4.1.3",
    "react-intersection-observer": "^9.8.0",
    "react-select": "^5.8.0",
    "react-toastify": "^10.0.5",
    "react-tooltip": "^5.27.1",
    "use-deep-compare-effect": "^1.8.1",
    zustand: "^4.5.4"
  },
  devDependencies: {
    "@storybook/addon-essentials": "^8.2.8",
    "@storybook/addon-interactions": "^8.2.8",
    "@storybook/addon-links": "^8.2.8",
    "@storybook/blocks": "^8.2.8",
    "@storybook/react": "^8.2.8",
    "@storybook/react-vite": "^8.2.8",
    "@storybook/test": "^8.2.8",
    "@types/node": "^22.2.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "prop-types": "^15.8.1",
    "react-toastify": "^10.0.5",
    storybook: "^8.2.8",
    "storybook-css-modules-preset": "^1.1.1",
    typescript: "^5.5.4",
    vite: "^5.4.0",
    "vite-plugin-checker": "^0.7.2",
    "vite-plugin-dts": "^3.9.1",
    "vite-plugin-libcss": "^1.1.1"
  },
  publishConfig: {
    access: "public"
  }
};

// vite.config.ts
import { defineConfig } from "file:///Users/Abhishek%20Kolge/Documents/charizard/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0/node_modules/vite/dist/node/index.js";
import { resolve } from "node:path";
var __vite_injected_original_dirname = "/Users/Abhishek Kolge/Documents/charizard";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/components/"]
    }),
    libCss({}),
    checker({
      typescript: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/components/index.ts"),
      name: "Charizard",
      fileName: "hybr1d-ui"
    },
    rollupOptions: {
      external: [...Object.keys(package_default.peerDependencies), "@emotion/react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL0FiaGlzaGVrIEtvbGdlL0RvY3VtZW50cy9jaGFyaXphcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9BYmhpc2hlayBLb2xnZS9Eb2N1bWVudHMvY2hhcml6YXJkL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9BYmhpc2hlayUyMEtvbGdlL0RvY3VtZW50cy9jaGFyaXphcmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCBsaWJDc3MgZnJvbSAndml0ZS1wbHVnaW4tbGliY3NzJ1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcidcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSdcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAnbm9kZTpwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZHRzKHtcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbJ3NyYy9jb21wb25lbnRzLyddLFxuICAgIH0pLFxuICAgIGxpYkNzcyh7fSksXG4gICAgY2hlY2tlcih7XG4gICAgICB0eXBlc2NyaXB0OiB0cnVlLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdDaGFyaXphcmQnLFxuICAgICAgZmlsZU5hbWU6ICdoeWJyMWQtdWknLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsuLi5PYmplY3Qua2V5cyhwa2cucGVlckRlcGVuZGVuY2llcyksICdAZW1vdGlvbi9yZWFjdCddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJAaHlicjFkLXRlY2gvY2hhcml6YXJkXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuNi42MVwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCJcbiAgXSxcbiAgXCJtYWluXCI6IFwiLi9kaXN0L2h5YnIxZC11aS51bWQuanNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaHlicjFkLXVpLmpzXCIsXG4gIFwidHlwZXNcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxuICBcImV4cG9ydHNcIjoge1xuICAgIFwiLlwiOiB7XG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9oeWJyMWQtdWkuanNcIixcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC9oeWJyMWQtdWkudW1kLmpzXCJcbiAgICB9XG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vVXNlaHlicmlkL2NoYXJpemFyZFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgZGV2IC1wIDYwMDZcIixcbiAgICBcImJ1aWxkLXN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBidWlsZFwiLFxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJucG0gcnVuIGJ1aWxkXCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBkbmQta2l0L2NvcmVcIjogXCJeNi4xLjBcIixcbiAgICBcIkBkbmQta2l0L21vZGlmaWVyc1wiOiBcIl43LjAuMFwiLFxuICAgIFwiQGRuZC1raXQvc29ydGFibGVcIjogXCJeOC4wLjBcIixcbiAgICBcIkBkbmQta2l0L3V0aWxpdGllc1wiOiBcIl4zLjIuMlwiLFxuICAgIFwiQHBvcHBlcmpzL2NvcmVcIjogXCJeMi4xMS44XCIsXG4gICAgXCJAdGFuc3RhY2svcmVhY3QtdGFibGVcIjogXCJeOC4xOS4zXCIsXG4gICAgXCJAemFnLWpzL2NoZWNrYm94XCI6IFwiXjAuNjUuMFwiLFxuICAgIFwiQHphZy1qcy9jb2xvci1waWNrZXJcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL2NvbWJvYm94XCI6IFwiXjAuNjUuMFwiLFxuICAgIFwiQHphZy1qcy9kaWFsb2dcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL21lbnVcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL3BhZ2luYXRpb25cIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL3BvcG92ZXJcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL3BvcHBlclwiOiBcIl4wLjY1LjBcIixcbiAgICBcIkB6YWctanMvcmFkaW8tZ3JvdXBcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL3JlYWN0XCI6IFwiXjAuNjUuMFwiLFxuICAgIFwiQHphZy1qcy9zZWxlY3RcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL3RhYnNcIjogXCJeMC42NS4wXCIsXG4gICAgXCJAemFnLWpzL3Rvb2x0aXBcIjogXCJeMC42NS4wXCIsXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4wXCIsXG4gICAgXCJkYXRlLWZuc1wiOiBcIl4zLjYuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMy4xXCIsXG4gICAgXCJyZWFjdC1jb3VudHJ5LWZsYWdcIjogXCJeMy4xLjBcIixcbiAgICBcInJlYWN0LWRheS1waWNrZXJcIjogXCI4LjEwLjFcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4zLjFcIixcbiAgICBcInJlYWN0LWluZmluaXRlLXNjcm9sbC1jb21wb25lbnRcIjogXCJeNi4xLjBcIixcbiAgICBcInJlYWN0LWlubGluZXN2Z1wiOiBcIl40LjEuM1wiLFxuICAgIFwicmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyXCI6IFwiXjkuOC4wXCIsXG4gICAgXCJyZWFjdC1zZWxlY3RcIjogXCJeNS44LjBcIixcbiAgICBcInJlYWN0LXRvYXN0aWZ5XCI6IFwiXjEwLjAuNVwiLFxuICAgIFwicmVhY3QtdG9vbHRpcFwiOiBcIl41LjI3LjFcIixcbiAgICBcInVzZS1kZWVwLWNvbXBhcmUtZWZmZWN0XCI6IFwiXjEuOC4xXCIsXG4gICAgXCJ6dXN0YW5kXCI6IFwiXjQuNS40XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1lc3NlbnRpYWxzXCI6IFwiXjguMi44XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWludGVyYWN0aW9uc1wiOiBcIl44LjIuOFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1saW5rc1wiOiBcIl44LjIuOFwiLFxuICAgIFwiQHN0b3J5Ym9vay9ibG9ja3NcIjogXCJeOC4yLjhcIixcbiAgICBcIkBzdG9yeWJvb2svcmVhY3RcIjogXCJeOC4yLjhcIixcbiAgICBcIkBzdG9yeWJvb2svcmVhY3Qtdml0ZVwiOiBcIl44LjIuOFwiLFxuICAgIFwiQHN0b3J5Ym9vay90ZXN0XCI6IFwiXjguMi44XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi4yLjBcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4zLjNcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMy4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjMuMVwiLFxuICAgIFwicHJvcC10eXBlc1wiOiBcIl4xNS44LjFcIixcbiAgICBcInJlYWN0LXRvYXN0aWZ5XCI6IFwiXjEwLjAuNVwiLFxuICAgIFwic3Rvcnlib29rXCI6IFwiXjguMi44XCIsXG4gICAgXCJzdG9yeWJvb2stY3NzLW1vZHVsZXMtcHJlc2V0XCI6IFwiXjEuMS4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNS40XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI6IFwiXjAuNy4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeMy45LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWxpYmNzc1wiOiBcIl4xLjEuMVwiXG4gIH0sXG4gIFwicHVibGlzaENvbmZpZ1wiOiB7XG4gICAgXCJhY2Nlc3NcIjogXCJwdWJsaWNcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStTLE9BQU8sV0FBVztBQUNqVSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sYUFBYTs7O0FDSHBCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixPQUFTO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxFQUNULFNBQVc7QUFBQSxJ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
