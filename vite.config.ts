import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite'; 

export default defineConfig({
  plugins: [
    checker({ typescript: { tsconfigPath: 'tsconfig.app.json' } }),
    react(),
    readableClassnames(),
    sassDts({ enabledMode: ['development'], esmExport: true }),
    tsconfigPaths(),
  ],
  base: '',
  server: { open: true },
});