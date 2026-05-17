# Orion Music

MVP real funcional de um app musical futurista premium usando Next.js 15, React, TypeScript, TailwindCSS e Framer Motion.

## Como abrir

Instale as dependencias e rode o app:

```bash
npm install
npm run dev
```

Depois abra:

http://localhost:3000

## API

O projeto usa mocks locais por padrao. Para conectar uma API autorizada, crie `.env.local` baseado em `.env.example`:

```env
YOUTUBE_API_KEY=
YOUTUBE_API_URL=https://www.googleapis.com/youtube/v3
```

No Render, coloque essas variaveis em **Environment Variables**. Nao use `NEXT_PUBLIC_` para chave secreta, porque variaveis publicas vao para o navegador.

## Deploy no Render

Este projeto ja inclui `render.yaml` para criar um Web Service isolado chamado `orion-music`.

Config do Render:

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Environment Variables:
  - `YOUTUBE_API_KEY`: sua chave nova
  - `YOUTUBE_API_URL`: `https://www.googleapis.com/youtube/v3`
  - `NODE_VERSION`: `22`

## Arquivos principais

- `src/app`: rotas e layout do Next.js.
- `src/components`: componentes reutilizaveis.
- `src/hooks`: player real com audio, seek, volume, shuffle e repeat.
- `src/services`: auth, musicas, busca, playlists e cliente de API.
- `src/data`: biblioteca mockada.
- `src/styles`: Tailwind e Liquid Glass UI.
- `public/audio`: audio local autorizado para testes.
- `ARCHITECTURE.md`: arquitetura recomendada para produto real com backend, banco, IA, seguranca e apps multiplataforma.
