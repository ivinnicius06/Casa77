# Casa 77

Site institucional em Next.js App Router, TypeScript, Tailwind, GSAP/ScrollTrigger e Lenis. Fontes locais otimizadas por `next/font/local`; imagens locais WebP via `next/image`.

## Executar

```sh
npm install
npm run dev -- --port 3077
```

Abra http://localhost:3077.

No celular, use `http://192.168.100.6:3077` na mesma rede Wi-Fi. O endereço está autorizado em `allowedDevOrigins` no `next.config.ts`; se o IP do computador mudar, atualize essa configuração para permitir que as interações carreguem no modo de desenvolvimento.

```sh
npm run build
npm start -- --port 3077
```

## Conteúdo e publicação

Todo o conteúdo comercial e seus campos pendentes estão em `src/content/site.ts`. O arquivo `.env.example` documenta `NEXT_PUBLIC_SITE_URL` (URL absoluta sem barra final) e `NEXT_PUBLIC_WHATSAPP` (DDI + DDD + número, só dígitos).

- WhatsApp, aplicativo, Instagram e mapa de Barreirinhas vieram do Linktree oficial: https://linktr.ee/barbeariacasa77 (consulta em 11/09/2026). Nenhuma mensagem foi enviada.
- Enquanto o número direto não for informado, o contato usa o link oficial do WhatsApp Business. Mensagens contextualizadas estão preparadas. Ao preencher o número, o site passa automaticamente a usar `wa.me` com `text` codificado. A aceitação do texto pelo link Business depende do WhatsApp.
- O endereço de Renato Gonçalves foi obtido no mesmo Linktree. Confirmar endereços das outras unidades, horários, contatos por unidade e mapa de Avenida.
- Os sete planos usam nomes, preços, serviços e dias de utilização fornecidos pelo responsável. Os cards seguem uma escala de cinza, do mais claro ao mais escuro.
- A lista `professionals` está vazia. Adicionar apenas profissionais confirmados, com nomes, fotos, unidade, especialidade e `confirmed: true`. Até lá são exibidas as fotos editoriais da marca, sem atribuir identidades a modelos.
- `reviews` contém seis trechos de avaliações públicas, com autoria e links de origem. São apresentadas 647 avaliações no total, com notas e contagens separadas por unidade e data de consulta. O carrossel permite avançar, voltar e arrastar, com contador sincronizado; não há rotação automática.
- Informar domínio definitivo para gerar canonical, URLs Open Graph e sitemap. Sem domínio, não são fabricadas URLs de produção.
- O JSON-LD publica apenas Organization com nome e área atendida. Adicionar LocalBusiness por unidade somente após completar os dados reais. Não são publicados endereços ou avaliações fictícias.
- A página de privacidade descreve o funcionamento atual e deve ser atualizada se forem adicionados formulários, publicidade, analytics ou uma hospedagem com tratamento de dados diferente.

## Assets

O vídeo original continua intacto em `C:/Users/Ivdia/Downloads/modeloHero.mp4`. As referências originais permanecem intactas em `referenciasBarbearia/`.

| Arquivo público | Uso | Substituição desejável |
| --- | --- | --- |
| `public/media/hero-desktop.mp4` | Vídeo de 1080px, ~1,85 MB, sem áudio, keyframes a cada 6 frames | Material atual já utilizável |
| `public/media/hero-mobile.mp4` | Versão de 640px, ~548 KB | Material atual já utilizável |
| `public/images/hero-poster.webp` | Primeiro frame e fallback | Material atual já utilizável |
| `public/images/logo.webp` | Logo extraído da referência | Logo original em alta resolução |
| `public/images/ambiente.webp` | Atendimento e ambiente | Foto original sem compressão do Instagram |
| `public/images/atendimento.webp` | Atendimento | Foto original e identificação da unidade |
| `public/images/fachada.webp` | Fachada | Foto original e identificação da unidade |
| `public/images/detalhes.webp` | Ferramentas | Foto original em alta resolução |
| `public/images/editorial-01.webp` a `editorial-03.webp` | Editorial da marca | Fotos originais; não são perfis de barbeiros confirmados |

As fotos das unidades têm uma legenda de acervo: a associação entre foto e unidade ainda não foi confirmada. Não foram utilizadas fotografias remotas aleatórias.

Para regenerar assets e fontes, com as referências locais presentes:

```sh
npm run assets
```

`HERO_SOURCE` permite usar outro vídeo original. O script usa FFmpeg e Sharp. MP4 H.264 foi escolhido para compatibilidade e busca por tempo; o vídeo nunca roda em autoplay.

## Movimento e acessibilidade

- Hero com quatro capítulos e distância de scroll de 2,9 alturas da hero no desktop e 2,4 no celular. O vídeo segue a timeline nos dois sentidos, após carregar os metadados. Três marcadores destacam cabelo, sobrancelha e barba progressivamente.
- Buscas de vídeo limitadas a 30 Hz no desktop e 15 Hz no celular, sem enfileirar buscas durante `seeking`.
- Lenis sincronizado ao ticker GSAP e ScrollTrigger; scroll touch continua nativo.
- Cleanup via `useGSAP`/`matchMedia`, refresh após fontes e metadados, animações pausadas na aba oculta.
- Movimento reduzido remove pin, vídeo e reveals; economia de dados limita o pré-carregamento aos metadados, mantendo a fonte de vídeo disponível.
- Conteúdo renderizado no servidor, menu com foco controlado, abas Radix com teclado, links contextuais, alvos de toque e foco visível.

## Componente 21st.dev

As abas das unidades adaptam **Origin UI Tabs**, publicado em https://21st.dev/originui/tabs. O registro da 21st exigiu autenticação; o código foi obtido diretamente do repositório público do autor. Não foi utilizada geração paga. A origem e a licença MIT estão em `THIRD_PARTY_NOTICES.md`.

## Analytics e avaliações

`src/lib/analytics.ts` emite `CustomEvent('casa77:analytics')` com eventos `whatsapp_click`, `app_click`, `plan_interest`, `unit_map_click` e `booking_click`. Não há envio para terceiros nem Google Analytics instalado. Uma integração futura pode assinar esse evento depois de configurar consentimento e uma chave válida.

Avaliações são dados locais, sem scraping ou alegação de integração ao vivo. Uma integração futura deve usar Google Places API ou Google Business Profile API no servidor, com credenciais protegidas, autorização aplicável, atribuição e regras de armazenamento da API. Configurar Place IDs distintos por unidade e revisar as regras oficiais vigentes antes de implementar.

## Verificações

```sh
npx playwright install chromium
npm run typecheck
npm run test:e2e
```

Os testes pressupõem um servidor em http://localhost:3077 (ou `TEST_BASE_URL`). Verificam scrub reversível, navegação por teclado, menu, links, eventos, imagens, overflow, movimento reduzido, auditoria WCAG com Axe e fallback sem JavaScript. Capturas ficam em `test-results/`.
