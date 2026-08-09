# Como alterar o conteúdo

## Contactos

Abra `app/site-config.ts` e procure `contact`.

```ts
contact: {
  phoneLabel: "+244 940 637 666",
  phoneHref: "tel:+244940637666",
  whatsappNumber: "244940637666",
  emailLabel: "tinguitaparadise@gmail.com",
}
```

No `whatsappNumber`, escreva apenas números, sem `+`, espaços ou hífenes.

## Localização

No mesmo ficheiro, procure `location`. Pode alterar:

- latitude e longitude;
- endereço;
- indicação de acesso;
- link normal do Google Maps;
- link incorporado.

## Fotografias

1. Coloque a nova fotografia em `public/images/`.
2. Use nomes simples, sem espaços, por exemplo `quarto-familia.jpg`.
3. Adicione ou altere o item correspondente em `siteConfig.gallery`.

Exemplo:

```ts
{
  src: "/images/quarto-familia.jpg",
  alt: "Interior do quarto familiar do Tinguita Paradise",
  category: ["Dia", "Áreas exteriores"],
}
```

O `alt` deve descrever o que aparece na fotografia.

## Imagem principal

Abra `app/components/tinguita-site.tsx`, procure `className="hero-image"` e
altere o `src` do componente `SiteImage`.

## Textos principais

Os textos visuais das secções ficam em:

```text
app/components/tinguita-site.tsx
```

Use a pesquisa do VS Code com `Ctrl + F` e escreva uma parte do texto atual.

## Cores

Abra `app/globals.css`. No início do ficheiro estão as variáveis:

```css
:root {
  --navy: #082c3d;
  --turquoise: #1ea5a7;
  --sand: #f4eee3;
  --gold: #d7b36a;
}
```

Alterar essas variáveis atualiza a identidade em várias secções.

## Acomodações

Os cartões atuais são provisórios porque ainda não foram fornecidos tipos de
quartos, capacidades, comodidades ou preços. Quando receber os dados oficiais,
edite `siteConfig.accommodations`.

Não publique informação inventada. Substitua os cartões apenas com dados
confirmados pelo proprietário.

## Testar depois de alterar

Execute:

```bash
npm run lint
npm run build
```

Se os dois comandos terminarem sem erros, a alteração está pronta para ser
publicada.

