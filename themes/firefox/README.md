# Aroli para Firefox

Temas estáticos de cores, sem scripts ou permissões. A mesma paleta Aroli do Chrome, adaptada às abas, barra de endereços, menus, painel lateral e nova aba do Firefox.

| Variante | Fundo | Barra e aba ativa | Manifest |
| --- | --- | --- | --- |
| Dark | Charcoal `#101111` | Raised `#161919` | [Aroli Dark](aroli-dark/manifest.json) |
| Black | Ink `#050505` | Charcoal `#101111` | [Aroli Black](aroli-black/manifest.json) |

Texto Bone `#C5C7C5`, abas inativas Ash `#858A89`, ícones `#AEB9BC` e acentos Sage Blue `#9AB7B0` em foco, seleção de texto e estados de atenção. Campos selecionados usam texto escuro sobre Sage Blue. As duas variantes declaram esquema escuro para a interface e o conteúdo que respeita a preferência do navegador.

## Experimentar agora

1. Abra `about:debugging#/runtime/this-firefox` no Firefox.
2. Clique em **Carregar extensão temporária…**.
3. Selecione `manifest.json` em `aroli-dark/` ou `aroli-black/`.

O carregamento temporário dura até reiniciar o Firefox. Após editar as cores, use **Recarregar** no cartão do tema. Para voltar ao tema anterior, abra `about:addons` → **Temas** e ative-o.

## Instalação permanente

Os pacotes locais ainda não são assinados. Para instalação permanente no Firefox comum, envie cada ZIP ao [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) para assinatura (distribuição listada ou não listada) e instale o arquivo assinado fornecido pela Mozilla. Renomear o ZIP para XPI não o assina.

## Empacotar e validar

Na raiz deste repositório:

```sh
bun themes/firefox/package-firefox.ts
bunx --bun web-ext@latest lint --source-dir themes/firefox/aroli-dark --warnings-as-errors
bunx --bun web-ext@latest lint --source-dir themes/firefox/aroli-black --warnings-as-errors
```

O empacotador também funciona a partir desta pasta com `bun package-firefox.ts`. Gera `dist/aroli-dark-0.1.0.zip` e `dist/aroli-black-0.1.0.zip`, cada um com apenas o manifest, e verifica a integridade com `unzip -t`. Requer `zip` e `unzip`. Atualize a versão do manifest ao lançar novas cores.

## Limites e referências

Firefox desktop 100 ou superior. O tema usa a API nativa; não altera CSS de sites ou DevTools. Algumas superfícies internas e extensões com nova aba própria podem ignorar as cores. Não inclui imagem de fundo.

- [Tema estático e cores — MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/theme)
- [Carregamento temporário — Mozilla](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

Uso pessoal e não comercial, conforme [LICENSE](LICENSE).
