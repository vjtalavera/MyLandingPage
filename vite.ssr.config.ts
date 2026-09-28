import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writePrerenderedPages } from './scripts/prerender.ts'

/**
 * Segundo build, independiente del principal: compila src/entry-server.tsx a
 * dist/ssr y después escribe un index.html por ruta dentro de dist/client.
 *
 * No lleva el plugin de Cloudflare a propósito. Su `buildApp` solo construye
 * los entornos de worker más el de cliente, así que un entorno "ssr" añadido a
 * vite.config.ts nunca llegaría a construirse. Por eso va en un fichero
 * aparte, y vite.config.ts se queda como está.
 *
 * dist/ssr no se despliega: wrangler sube dist/client, que es lo que apunta
 * `assets.directory` en dist/mylandingpage/wrangler.json.
 */
export default defineConfig({
  plugins: [react()],
  environments: {
    ssr: {
      build: {
        ssr: 'src/entry-server.tsx',
        outDir: 'dist/ssr',
        emptyOutDir: true,
      },
    },
  },
  builder: {
    async buildApp(builder) {
      const ssr = builder.environments.ssr

      if (!ssr) {
        throw new Error('No existe el entorno de build "ssr"')
      }

      await builder.build(ssr)
      await writePrerenderedPages(builder.config.root)
    },
  },
})
