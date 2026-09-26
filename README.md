<div align="center">
  <img src="branding/aroli/logo/aroli-lockup.svg" alt="Aroli" width="280" />

  **Tudo encontra seu lugar.**

  Temas, tipografia, ponteiros e fundos para um ambiente que se adapta a você.
</div>

![Sistema visual Aroli](branding/aroli/exports/aroli-system.png)

## Uma família, um ambiente

| Produto | Conteúdo |
| --- | --- |
| Aroli Themes | Aroli Dark e Aroli Black, com as mesmas cores da geração anterior ([repos](https://github.com/orgs/getaroli/repositories?q=aroli-)) |
| [Aroli Mono](fonts/aroli/README.md) | Fonte autoral para código, ligaduras e variante NF; protótipo ([repo](https://github.com/getaroli/aroli-mono)) |
| [Aroli Pointer](themes/cursor/aroli/README.md) | Cursores Linux com 32 estados e aliases ([repo](https://github.com/getaroli/aroli-pointer)) |
| [Aroli Backdrops](wallpapers/README.md) | Fundos e composições do ambiente ([repo](https://github.com/getaroli/aroli-backdrops)) |
| [Aroli Desktop](https://github.com/getaroli/desktop) | Ambiente pronto (Hyprland + Quickshell + instalador); repo independente em `desktop/` |

## Temas disponíveis

| Aplicação | Variantes | Repo | Guia |
| --- | --- | --- | --- |
| VS Code | Dark / Black | [aroli-vscode](https://github.com/getaroli/aroli-vscode) | [Instalação](themes/vscode/aroli/README.md) |
| Zed | Dark | [aroli-zed](https://github.com/getaroli/aroli-zed) | [Instalação](themes/zed/aroli/README.md) |
| JetBrains | Dark | [aroli-jetbrains](https://github.com/getaroli/aroli-jetbrains) | [Instalação](themes/jetbrains/aroli/README.md) |
| Chrome | Dark / Black | [aroli-chrome](https://github.com/getaroli/aroli-chrome) | [Dark](themes/chrome/aroli-dark/README.md) · [Black](themes/chrome/aroli-black/README.md) |
| Kitty | Dark | [aroli-kitty](https://github.com/getaroli/aroli-kitty) | [Instalação](themes/kitty/aroli/README.md) |
| Starship | Prompt | [aroli-starship](https://github.com/getaroli/aroli-starship) | [Instalação](themes/starship/aroli/README.md) |

Este repo é a fonte da verdade: edite aqui. Cada push na `main` espelha o
módulo para o seu repo via `split.yml`; cada repo tem CI próprio e releases
independentes (`vX.Y.Z`).

## Identidade e desenvolvimento

Abra [Aroli.code-workspace](Aroli.code-workspace) para exibir o workspace como **Aroli**. Se a sua pasta de checkout ainda se chama `umbra`, pode renomeá-la para `aroli`, o Git acompanha o conteúdo, sem efeito no histórico.

- [Guia de identidade](DESIGN.md): símbolo Encaixe, cores, tipografia e aplicações.
- [Assets e reprodução](branding/aroli/README.md): mestres SVG, exports e comandos.
- [Registro da migração](docs/migrations/2026-09-20-aroli.md): decisões, compatibilidade, verificações e reversão.
- [Site](web/README.md): preparação da Aroli Sans local, build e laboratórios.
- [Instruções para agentes](LLMS.md): navegação e limites por módulo.

## De Umbra para Aroli

A migração está concluída: identidade, nomes públicos, repositório, pastas e IDs de extensão são Aroli. A paleta permanece; Dark e Black são os nomes das variantes.

Os IDs de VS Code (`Aroli Dark`/`Aroli Black`), Zed (`aroli-themes`) e JetBrains (`aroli.jetbrains.theme`) mudaram. Selecione os temas de novo após atualizar. As pastas Chrome agora são `aroli-dark`/`aroli-black`; recarregue as instalações unpacked. O repositório é [getaroli/aroli](https://github.com/getaroli/aroli), com redirecionamento dos endereços antigos. Histórico em [docs/migrations/2026-09-20-aroli.md](docs/migrations/2026-09-20-aroli.md).

## Licença

O projeto mantém sua [licença proprietária](LICENSE). [Aroli Sans](fonts/aroli-sans/README.md) é a fonte proporcional autoral, com binários locais versionados. Aroli Mono preserva os créditos e a licença dos ícones Nerd Fonts; consulte o [guia da fonte](fonts/aroli/README.md). O arquivo histórico em `branding/archive/` não representa a identidade atual.
