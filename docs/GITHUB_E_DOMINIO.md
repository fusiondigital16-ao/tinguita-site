# GitHub, hospedagem e domínio próprio

## O que cada serviço faz

- **GitHub:** guarda o código e o histórico de alterações.
- **Hospedagem:** mantém o site online.
- **Domínio:** fornece o endereço profissional, como `tinguitaparadise.com`.

Colocar o código no GitHub não cria automaticamente um domínio profissional.

## Guardar o projeto no GitHub

1. Crie uma conta em https://github.com/.
2. No GitHub, crie um repositório privado chamado `tinguita-paradise`.
3. No VS Code, abra a pasta do projeto.
4. Abra `Source Control` na barra lateral.
5. Selecione `Initialize Repository`.
6. Escreva uma mensagem como `Versão inicial do site`.
7. Selecione `Commit`.
8. Use `Publish Branch` e escolha o repositório privado.

Mantenha o repositório **Private** enquanto não decidir tornar o código público.

## Publicar com domínio próprio

A forma mais simples é manter a hospedagem atual e ligar diretamente um domínio
comprado. O GitHub pode continuar apenas como cópia privada do código.

Fluxo recomendado:

1. comprar o domínio;
2. adicionar o domínio na hospedagem;
3. copiar os registos DNS fornecidos;
4. colar esses registos no painel onde o domínio foi comprado;
5. aguardar a validação e o certificado HTTPS.

## Sobre GitHub Pages

GitHub Pages é indicado principalmente para ficheiros estáticos. Este projeto
usa Next.js/Vinext e está preparado para Cloudflare, portanto não deve ser
movido para GitHub Pages sem uma adaptação específica de build.

## Segurança

- Nunca envie `.env`, tokens, palavras-passe ou chaves privadas para o GitHub.
- Este projeto já ignora ficheiros `.env*` no `.gitignore`.
- Mantenha o repositório privado se o código for propriedade do cliente.
- Dê acesso apenas às pessoas responsáveis pela manutenção.

