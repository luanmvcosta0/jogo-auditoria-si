# 🐱🔍 NestCat Auditor — Jogo de Auditoria Contábil

Jogo educativo (quiz por fases) desenvolvido para o **Projeto AV2**, usando como referência o livro
**Auditoria Contábil**, de Silvio Aparecido Crepaldi
([PDF – CRC-CE](https://www.crc-ce.org.br/crcnovo/files/AC0711142805crepaldi.pdf)).

O mascote **NestCat** guia o jogador por fases, uma para cada item do livro, explicando o conteúdo
e comentando cada resposta.

## 🎮 Como funciona

- **Fases por item do livro** (tema atual: itens **1.1 a 1.4**), liberadas em sequência.
- **Dicas do NestCat** antes de cada fase: um resumo do livro com as páginas de referência.
- Perguntas de **múltipla escolha** e **verdadeiro/falso**, com as alternativas embaralhadas.
- **3 vidas** por fase, **bônus por acertos seguidos** e de **0 a 3 estrelas**.
- Cada resposta mostra a **explicação e a página do livro** onde está o conteúdo.
- O progresso fica salvo no navegador (localStorage).
- Ao concluir todas as fases, o jogador recebe um **certificado** com seu nome, que pode ser impresso.
- Atalhos: teclas `1`–`4` para responder e `Enter` para continuar.

| Fase | Item | Assunto | Páginas |
|------|------|---------|---------|
| 1 | 1.1 | Conceito e aplicação da auditoria contábil | 10–17 |
| 2 | 1.2 | Papel da auditoria (continuidade operacional, estimativas) | 17–19 |
| 3 | 1.3 | Aspectos administrativos e de controle | 22–23 |
| 4 | 1.4 | Tipos de auditoria | 23–30 |

## ♻️ O que foi reutilizado (informação obrigatória)

Reutilizamos o mascote **NestCat** do projeto do semestre anterior,
[pet-cat-si](https://github.com/luanmvcosta0/pet-cat-si) ([demo](https://pet-cat-si.vercel.app/)).

**Reutilizado sem alteração:**
- O desenho SVG do gato (corpo, cabeça, orelhas angulares, rabo, emblema "N" no peito, patas e bigodes).
- As animações originais: flutuação, brilho pulsante, piscar dos olhos e rabo balançando.
- A identidade visual: fundo escuro com grid, glow radial e a cor `#E0234E`.
- A configuração do projeto: React + TypeScript + Vite + Tailwind CSS e o ESLint.

**Novo, criado para este jogo:**
- **Expressões** do NestCat (`normal`, `feliz`, `triste`, `pensando`, `surpreso`), que reagem às respostas.
- **Lupa de auditor** na pata do gato e as animações novas (rabo rápido de alegria, tremida ao errar).
- Toda a mecânica do jogo: fases, vidas, pontuação, estrelas, progresso salvo e certificado.
- Todo o conteúdo didático (28 perguntas e as dicas), retirado do livro do Crepaldi.

## 🔄 Como trocar o tema

Todo o conteúdo fica em **um único arquivo**: [`src/data/conteudo.ts`](src/data/conteudo.ts).
Para usar outro item do livro, troque `TEMA.itens` e a lista `FASES` (uma fase por subitem).
Não é preciso mexer no resto do código. Em `TEMA.questionarioUrl`, coloque o link do questionário
de usabilidade para mostrar o botão "Responder questionário" na tela final.

## ▶️ Como executar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção (pasta dist/)
```

Deploy: importe o repositório na Vercel. Ela detecta o Vite sozinha e não precisa de configuração.

## 🛠️ Tecnologias

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · SVG + animações CSS
