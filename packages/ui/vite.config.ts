import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { readdirSync } from 'node:fs';

/** Builds a lib entry map from every component directory in src/components/. */
function componentEntries(): Record<string, string> {
  const componentsDir = path.resolve(__dirname, 'src/components');
  const entries: Record<string, string> = {};
  for (const name of readdirSync(componentsDir, { withFileTypes: true })) {
    if (name.isDirectory()) {
      entries[`components/${name.name}/index`] = path.resolve(componentsDir, name.name, 'index.ts');
    }
  }
  return entries;
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: {
        'lib/utils': path.resolve(__dirname, 'src/lib/utils.ts'),
        ...componentEntries()
      },
      formats: ['es']
    },
    rolldownOptions: {
      output: {
        chunkFileNames: '_chunks/[name]-[hash].js'
      },
      external: [
        'vue',
        /^@vueuse\//,
        /^reka-ui/,
        /^@internationalized\//,
        /^@tanstack\//,
        /^class-variance-authority/,
        /^clsx/,
        /^tailwind-merge/,
        /^lucide-vue-next/,
        /^vaul-vue/,
        /^vue-input-otp/,
        /^vue-sonner/,
        /^zod/
      ]
    },
    cssCodeSplit: false
  }
});
