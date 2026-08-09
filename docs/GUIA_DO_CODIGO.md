# Guia completo do código

Este documento explica como o projeto está organizado, o papel de cada ficheiro
e o fluxo das funcionalidades principais.

## 1. Tecnologias

| Tecnologia | Função no projeto |
| --- | --- |
| Next.js | estrutura das páginas, metadados e renderização |
| React | componentes e estado da interface |
| TypeScript | tipos e maior segurança durante alterações |
| Tailwind CSS 4 | infraestrutura de CSS usada pelo projeto |
| CSS próprio | identidade visual detalhada do Tinguita Paradise |
| Framer Motion | entradas suaves, lightbox e parallax |
| Lucide React | ícones consistentes e leves |
| Vinext/Vite | desenvolvimento e build para Cloudflare |

## 2. Fluxo da aplicação

1. `app/page.tsx` carrega o componente principal.
2. `app/components/tinguita-site.tsx` monta todas as secções da página.
3. `app/site-config.ts` fornece contactos, endereço, navegação, galeria e
   informações editáveis.
4. `app/globals.css` aplica a identidade visual e adapta o layout a desktop,
   tablet e telemóvel.
5. `app/layout.tsx` adiciona o idioma, SEO, Open Graph, favicon e dados
   estruturados para motores de pesquisa.

## 3. Pasta `app`

### `app/page.tsx`

É a entrada da página inicial. O ficheiro é pequeno de propósito: importa e
renderiza `TinguitaSite`, mantendo a página fácil de localizar.

### `app/layout.tsx`

Contém:

- fonte Geist;
- título e descrição exibidos no Google;
- palavras-chave;
- Open Graph para partilhas em WhatsApp e redes sociais;
- favicon com o logótipo;
- JSON-LD `Restaurant`, com apenas os dados confirmados.

### `app/site-config.ts`

É o centro de conteúdo do projeto. Alterações frequentes devem ser feitas aqui:

- nome e descrição;
- telefone, WhatsApp, e-mail e redes sociais;
- coordenadas, endereço e mapa;
- links da navegação;
- destaques;
- fotografias, textos alternativos e filtros;
- cartões provisórios de acomodações.

O `as const` no final preserva os valores como tipos específicos do TypeScript.

### `app/components/tinguita-site.tsx`

É o componente principal e contém:

- `SiteImage`: padroniza carregamento prioritário e lazy loading;
- `SectionHeading`: reutiliza o mesmo padrão de títulos;
- estado da navbar após scroll;
- abertura e fecho do menu mobile;
- filtros da galeria;
- navegação do lightbox por botões e teclado;
- datas e número de hóspedes da consulta rápida;
- validação do formulário;
- montagem da mensagem enviada ao WhatsApp;
- animações com respeito a `prefers-reduced-motion`;
- parallax do hero controlado pelo progresso do scroll.

As secções aparecem no JSX pela ordem em que são mostradas no site:

1. cabeçalho;
2. hero;
3. consulta rápida;
4. apresentação;
5. estrutura;
6. experiências;
7. manifesto visual;
8. acomodações provisórias;
9. galeria;
10. localização;
11. contactos e reserva;
12. rodapé;
13. botão flutuante de WhatsApp;
14. lightbox.

### `app/globals.css`

Organização interna:

- variáveis de cor em `:root`;
- base tipográfica e acessibilidade;
- botões;
- navbar Liquid Glass;
- hero e parallax;
- estilos de cada secção;
- lightbox e formulário;
- rodapé;
- breakpoints de 1100, 820 e 600 píxeis;
- preferência de movimento reduzido.

As cores principais são:

| Nome | Hexadecimal |
| --- | --- |
| Azul-marinho | `#082C3D` |
| Azul profundo | `#041D29` |
| Turquesa | `#1EA5A7` |
| Areia | `#F4EEE3` |
| Creme | `#FBF8F2` |
| Dourado | `#D7B36A` |

## 4. Pasta `public`

Tudo dentro de `public` fica acessível pela raiz do site.

Exemplo:

```text
public/images/tinguita-01.jpg
```

é utilizado no código como:

```text
/images/tinguita-01.jpg
```

As imagens numeradas são as fotografias reais do espaço. O ficheiro
`tinguita-logo.jpg` é o logótipo oficial.

## 5. Configuração e build

### `package.json`

Declara as bibliotecas e os comandos `npm`. A versão mínima de Node é 22.13.

### `vite.config.ts`

Ativa Vinext, React Server Components e o ambiente Cloudflare. Também mantém
estado de desenvolvimento dentro do projeto.

### `next.config.ts`

Mantém as imagens sem otimização automática do Next, preservando o fluxo usado
por esta hospedagem e pelas fotografias locais.

### `worker/index.ts`

É a entrada do Cloudflare Worker. Encaminha os pedidos para a aplicação e
oferece suporte ao endpoint de otimização de imagens.

### `build/sites-vite-plugin.ts`

Durante o build, copia a configuração de hospedagem e eventuais migrações para
o artefacto final.

### `scripts/`

Contém scripts usados pelo ambiente original de hospedagem para instalar,
compilar e validar o site. Para desenvolvimento normal no Windows, utilize os
comandos simples documentados no `README.md`.

## 6. Acessibilidade

O projeto inclui:

- hierarquia correta de títulos;
- textos alternativos nas imagens;
- labels nos campos;
- foco visível para teclado;
- `aria-label` e `aria-expanded` nos controlos;
- Escape e setas no lightbox;
- contraste reforçado nas zonas sobre fotografias;
- redução de animações segundo a preferência do dispositivo.

## 7. Desempenho

- hero carregado com prioridade;
- fotografias restantes com lazy loading;
- imagens locais, sem banco de imagens externo;
- animações baseadas em transform e opacity;
- dependências bloqueadas no `package-lock.json`;
- pastas de build e dependências excluídas do ZIP.

