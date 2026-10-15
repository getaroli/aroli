# Aroli Firefox

Temas estáticos independentes em `aroli-dark/` e `aroli-black/`. Edite os manifests como fonte da verdade; preserve a paleta Aroli. Sem scripts de extensão, permissões ou userChrome.css.

Ao mudar cores, atualize README, CHANGELOG e versão do manifest afetado. Valide ambas as pastas com `bunx --bun web-ext@latest lint --source-dir <pasta> --warnings-as-errors` e gere os ZIPs com `bun themes/firefox/package-firefox.ts`. Não confunda ZIP local com extensão assinada. Instalação no perfil e publicação exigem pedido explícito.
