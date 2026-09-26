# Aroli for Chrome

Aroli Dark e Aroli Black para Chrome (`manifest_version: 3`, só `theme`, sem JavaScript/HTML).

| Variante | Pasta | Guia |
| --- | --- | --- |
| Dark | `aroli-dark/` | [Instalação](aroli-dark/README.md) |
| Black | `aroli-black/` | [Instalação](aroli-black/README.md) |

## Empacotar

Na raiz do repo:

```sh
bun package-chrome.ts
```

Gera `aroli-dark-<versão>.zip` e `aroli-black-<versão>.zip` com `manifest.json` + imagem da NTP, prontos para upload na Chrome Web Store. A cada nova versão, suba `version` nos dois `manifest.json` e gere zips novos. Validação: `bun package-chrome.ts` (o script também roda `unzip -t` nos dois zips).

## Licença

Uso pessoal e não comercial; veja [LICENSE](LICENSE).
