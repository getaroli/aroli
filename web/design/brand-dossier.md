# Aroli — narrativa pelo scroll

Direção aplicada em 2026-09-26. Base: `../../DESIGN.md`,
`../../LANDING-PAGE.md` e prancha aprovada
`../../output/imagegen/aroli-study-01/storyboard.png`.

## Tese

Para apresentar um ambiente coerente a quem personaliza ferramentas de desenvolvimento,
a página conecta temas, gestos e tipografia. O scroll revela as peças; cada transição
termina em uma composição estável para ler, experimentar ou escolher uma instalação.

## Evidências e decisões

- Encaixe, intervalo e acomodação são os sinais definidos no guia: curvas existentes
  preservadas, entrada de 280 ms, sem loops no hero.
- Notebook preservado como cena central. Abertura mais curta, três pausas de leitura,
  controles explícitos para revisitar VS Code, Zed e Kitty.
- Aroli Pointer e Mono são produtos reais: seleção visual e cursor original conectam
  a demonstração aos gestos; amostra Aa na Mono original introduz a tipografia.
- Neutros dominantes, acentos no conteúdo, Aroli Sans nos títulos dos laboratórios
  (substitui referência a uma variável de fonte inexistente).
- Lista final reúne integrações, Pointer, Mono e Backdrops. Sem métricas inventadas.

## Assets

| Caminho | Uso e limite |
| --- | --- |
| `public/aroli-lockup.svg` | Assinatura de produção existente, preservada |
| `public/examples/{vscode,zed,kitty}.png` | Capturas existentes; geração anterior, paleta preservada; aviso visível, sem edição |
| `public/playground/cursors/arrow.svg` | Ponteiro original ampliado na transição; decorativo |
| `public/playground/AroliMonoNF.woff2` | Espécime e laboratório, fonte real existente |
| `app/fonts/AroliSans-*.woff2` | Comunicação; quatro pesos locais existentes |

Não foram adquiridos ou gerados novos assets. Reutilização restrita ao projeto;
nenhuma nova licença ou autorização de publicação foi inferida.

## Contrato de interação

Desktop com pelo menos 761 × 600 e movimento permitido: cena sticky, 420svh totais,
scroll nativo, abertura e trocas reversíveis. Botões rolam suavemente até os estados de leitura; só o ScrollTrigger controla
a timeline. Capturas entram sobre a anterior sem intervalo preto. O fade do notebook
fica num wrapper externo à perspectiva, preservando a geometria 3D do teclado. Mudança de breakpoint/preferência reverte o contexto GSAP.

Mobile, janela baixa, movimento reduzido ou ausência de JavaScript: leitura linear,
capturas individualmente acessíveis e links nativos. A classe de melhoria só é
adicionada na inicialização da cena. Sem área vazia reservada para animação desativada.
Laboratórios permanecem no fluxo normal. Transições decorativas não interceptam entrada.

## Verificação

Tipos, 14 testes existentes e build de produção passaram. Prévia local respondeu HTTP 200.
O build foi concluído fora do sandbox após bloqueio na geração de páginas. Navegador integrado indisponível: não foi possível verificar screenshots,
rolagem rápida, resize, foco e toque em runtime. Revisão em aparelho físico pendente.

## Escrita na ponte do Pointer

A pedido do usuário, “Seu ambiente responde.” é escrito na primeira entrada na
viewport (65 ms por caractere). O cursor decorativo original `text.svg` acompanha
a escrita; ao terminar, cede lugar a `hover.svg` com crossfade, compressão de 12%
e retorno `elastic.out(1, 0.45)` de 850 ms. É uma exceção localizada à regra geral
sem quique, explicitamente solicitada; não afeta o cursor real nem os laboratórios.
O espaço de todos os caracteres fica reservado para evitar deslocamentos de layout.
Movimento reduzido/sem JS mostra a frase completa e a mão estática. Resize e fontes
reposicionam o cursor; desmontagem remove observação e reverte o contexto GSAP.
