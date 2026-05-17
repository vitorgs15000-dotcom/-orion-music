# Orion Music Ultimate - Arquitetura

Este prototipo e a interface funcional do Orion Music Ultimate. Para virar produto real, a arquitetura recomendada e:

## Frontend

- Next.js com React Server Components para web.
- Tailwind para design system.
- Framer Motion para transicoes cinematograficas.
- PWA para instalacao rapida.
- Builds nativos futuros com React Native ou wrappers oficiais.

## Backend

- Node.js + Express ou NestJS.
- Prisma como ORM.
- PostgreSQL para usuarios, biblioteca, playlists, historico, social e dispositivos.
- Redis para sessoes, fila, recomendacoes rapidas e cache de metadados.

## Musica e licencas

- Integracao com provedores licenciados via APIs oficiais.
- Downloads offline apenas para faixas licenciadas e contas autorizadas.
- DRM ou tokens temporarios para protecao antipirataria.
- Cache inteligente de metadados, capas, letras e previews.

## IA

- Orion AI Music Engine como servico modular.
- Entrada contextual: horario, clima autorizado pelo usuario, historico, moods e dispositivos.
- Playlist Generator, Smart DJ, Mood Scan, Smart Discovery e Orion Wrapped.
- Toda personalizacao deve respeitar consentimento e controles de privacidade.

## Seguranca

- OAuth com Google e Apple.
- Passkeys como opcao premium.
- Cookies seguros httpOnly para web.
- Criptografia em repouso para dados sensiveis.
- Rate limit, auditoria e protecao contra abuso.
- Chaves de API devem ficar somente no servidor, como `YOUTUBE_API_KEY`, nunca com prefixo `NEXT_PUBLIC_`.
- No Render, configure segredos em Environment Variables e restrinja a chave no Google Cloud por API e origem quando aplicavel.

## Plataformas

- Web e PWA primeiro.
- Android e iOS com app nativo.
- Windows via app desktop.
- Smart TV em fase posterior com interface de 10 pes.
