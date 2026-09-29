import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    cloudflare(),
  ],
  build: {
    rollupOptions: {
      output: {
        // React y el router no cambian entre despliegues, pero el contenido
        // sí. En un chunk aparte, y con el `immutable` de public/_headers,
        // editar una página deja de invalidar la parte más pesada del bundle
        // en la caché de quien ya ha visitado el sitio.
        //
        // Va como función y no como objeto porque es la única forma que
        // acepta la versión de Rollup que trae este Vite.
        manualChunks(id: string) {
          return id.includes("node_modules") ? "vendor" : undefined;
        },
      },
    },
  },
});
