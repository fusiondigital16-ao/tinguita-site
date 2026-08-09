# Tinguita Paradise

Site de apresentação do Tinguita Paradise, em Praia Amélia, Moçâmedes.

## Site publicado

https://fusiondigital16-ao.github.io/tinguita-site/

## Tecnologias

- Next.js e React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- GitHub Pages e GitHub Actions

## Executar no computador

É necessário Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar

```bash
npm run lint
npm run build
```

## Publicação

Cada alteração enviada para a branch `main` executa automaticamente o workflow
`.github/workflows/deploy-pages.yml`. O workflow gera os ficheiros estáticos na
pasta `out` e publica-os no GitHub Pages.

## Conteúdo

- Contactos, endereço e galeria: `app/site-config.ts`
- Página e interações: `app/components/tinguita-site.tsx`
- Aparência e responsividade: `app/globals.css`
- Fotografias e logótipo: `public/images/`

