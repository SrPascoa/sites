import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Por omissão o Vite escutava apenas em [::1] (localhost IPv6). No Windows
    // o browser resolve muitas vezes `localhost` para 127.0.0.1 e a ligação era
    // recusada — a página aparecia em branco. `host: true` escuta em todos os
    // interfaces, o que resolve o IPv4 e ainda permite abrir o site no
    // telemóvel pelo IP da rede local (o Vite imprime esse endereço ao arrancar).
    host: true,
  },
})
