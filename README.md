# Noctua Solutions — Site

Site institucional da Noctua Solutions, assistência técnica de computadores.

---

## Como abrir

Abre o `index.html` direto no navegador. Não precisa de servidor, build nem nada instalado. Precisa de internet só pra carregar as fontes e o React (vem de CDN).

Se quiser rodar local com servidor mesmo assim:

```
npx serve .
```

---

## Estrutura

```
index.html          → arquivo principal, contém tudo inline
app.jsx             → componentes React (header, hero, serviços, sobre, footer)
icons.jsx           → ícones SVG
styles.css          → todo o CSS
tweaks-panel.jsx    → painel de tweaks (cor de destaque, fundo)
assets/
  noctua-logo-full.png
  noctua-logo.png
```

O `index.html` já tem tudo embutido — CSS, scripts, fontes. Os arquivos `.jsx` e `.css` são a fonte editável; depois de mexer em qualquer um deles é só rodar o script de build pra atualizar o HTML.

---

## Como atualizar conteúdo

Tudo fica em `app.jsx`. As partes que você vai querer mexer com mais frequência:

**Contato e redes sociais** — no topo do arquivo, nas constantes `WA_NUMBER`, `SOCIAL` e `TEAM`.

**Cards de serviço** — no array `SERVICES`. Cada item tem título, tag, descrição curta e lista de bullets.

**Chips do hero** — no array `CHIP_SETS`. São três grupos que ficam alternando em volta da logo.

Depois de editar qualquer `.jsx` ou `.css`, rode isso no terminal pra atualizar o `index.html`:

```powershell
$css = Get-Content styles.css -Raw -Encoding utf8
$tweaks = Get-Content tweaks-panel.jsx -Raw -Encoding utf8
$icons = Get-Content icons.jsx -Raw -Encoding utf8
$app = Get-Content app.jsx -Raw -Encoding utf8
# ... montar o HTML e salvar em index.html
```

O script completo tá no histórico de conversas com o Claude Code.

---

## Dependências

Nenhuma pra instalar. Vem tudo via CDN no `index.html`:

- React 18.3.1
- Babel Standalone 7.29 (compila o JSX no browser)
- Fontes: Space Grotesk, Manrope, JetBrains Mono (Google Fonts)

---

## Seção "Sobre" — pendente

O placeholder da imagem na seção Sobre vai ser trocado por um slider com fotos reais assim que o cliente enviar o material.
