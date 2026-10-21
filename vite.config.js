import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxy = {
    '/api': {
      target: env.API_PROXY_TARGET || 'https://localhost:7032',
      changeOrigin: true,
      // 僅供開發／本機 preview 接受 ASP.NET Core 的開發憑證。
      secure: false,
    },
  }
  return {
    // plugins: [vue(), basicSsl()],
	plugins: [vue()],
    server: {
      port: 5174,
      strictPort: true,
      proxy,
      watch: { usePolling: true, interval: 500 },
    },
    preview: { port: 4174, strictPort: true, proxy },
  }
})
