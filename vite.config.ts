import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Загружаем переменные из .env (все, начинающиеся с VITE_)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // Формируем объект для define: подменяем process.env.VITE_BURGER_API_URL на реальное значение
  const processEnv = Object.keys(env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(env[key]);
    return acc;
  }, {} as Record<string, string>);

  return {
    plugins: [
      checker({ typescript: { tsconfigPath: 'tsconfig.app.json' } }),
      react(),
      readableClassnames(),
      sassDts({ enabledMode: ['development'], esmExport: true }),
      tsconfigPaths(),
    ],
    base: '',
    define: processEnv, 
    server: { open: true },
  };
});