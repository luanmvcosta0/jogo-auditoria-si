/**
 * ============================================================
 *  CONTEÚDO DO JOGO — edite SOMENTE este arquivo para trocar o tema
 * ============================================================
 *
 * Fonte principal: CREPALDI, Silvio Aparecido. Auditoria Contábil.
 * PDF: https://www.crc-ce.org.br/crcnovo/files/AC0711142805crepaldi.pdf
 *
 * `pagina` = número impresso no rodapé/cabeçalho da página do PDF.
 *
 * Tema provisório: Capítulo 1, itens 1.1 a 1.4.
 * Quando souber o item sorteado, troque `TEMA` e `FASES`.
 */

export type Pergunta =
  | {
      tipo: "multipla";
      enunciado: string;
      opcoes: string[];
      correta: number; // índice em `opcoes`
      explicacao: string;
      pagina: number;
    }
  | {
      tipo: "vf";
      enunciado: string;
      correta: boolean;
      explicacao: string;
      pagina: number;
    };

export type Fase = {
  item: string;
  titulo: string;
  icone: string;
  /** Dicas que o NestCat mostra antes da fase (resumo do livro) */
  dicas: string[];
  paginas: string;
  perguntas: Pergunta[];
};

export const TEMA = {
  capitulo: "Capítulo 1 — Auditoria Contábil",
  itens: "1.1 a 1.4",
  livro: "CREPALDI, S. A. Auditoria Contábil",
  livroUrl: "https://www.crc-ce.org.br/crcnovo/files/AC0711142805crepaldi.pdf",
  /** Link do questionário de usabilidade (deixe "" para esconder o botão) */
  questionarioUrl: "",
};

export const FASES: Fase[] = [
  // ─────────────────────────────── 1.1 ───────────────────────────────
  {
    item: "1.1",
    titulo: "Conceito e Aplicação da Auditoria Contábil",
    icone: "🔍",
    paginas: "p. 10–17",
    dicas: [
      "A auditoria das demonstrações contábeis é o conjunto de procedimentos técnicos que tem por objetivo a emissão de OPINIÃO sobre a sua adequação.",
      "Corrigir fraudes ou erros NÃO é objetivo da auditoria. A responsabilidade primária por prevenir e detectar fraudes é da administração e da governança.",
      "Asseguração razoável é um nível ALTO, mas NÃO ABSOLUTO, de segurança.",
      "Confirmações obtidas de fontes externas costumam ter mais credibilidade do que as obtidas dentro da própria empresa.",
    ],
    perguntas: [
      {
        tipo: "multipla",
        enunciado: "Segundo as Normas Brasileiras, qual é o objetivo da auditoria das demonstrações contábeis?",
        opcoes: [
          "Elaborar as demonstrações contábeis da empresa",
          "Emitir opinião sobre a adequação das demonstrações contábeis",
          "Corrigir todas as fraudes e erros encontrados",
          "Garantir a viabilidade futura da empresa",
        ],
        correta: 1,
        explicacao:
          "A auditoria constitui o conjunto de procedimentos técnicos que tem por objetivo a emissão de opinião sobre a adequação das demonstrações contábeis, conforme as Normas Brasileiras de Contabilidade.",
        pagina: 10,
      },
      {
        tipo: "vf",
        enunciado: "A correção de fraudes ou erros é um dos objetivos da auditoria contábil.",
        correta: false,
        explicacao:
          "Falso! O livro diz expressamente: “A correção de fraudes ou erros não constitui objetivo da auditoria contábil”. A detecção e correção cabem à administração.",
        pagina: 10,
      },
      {
        tipo: "multipla",
        enunciado:
          "De acordo com a NBC TA 240 (R1), de quem é a principal responsabilidade pela prevenção e detecção da fraude?",
        opcoes: [
          "Do auditor independente",
          "Do Conselho Federal de Contabilidade",
          "Dos responsáveis pela governança e da administração da entidade",
          "Dos acionistas minoritários",
        ],
        correta: 2,
        explicacao:
          "A NBC TA 240 (R1) atribui a principal responsabilidade aos responsáveis pela governança e à administração, que devem enfatizar a prevenção e a dissuasão da fraude.",
        pagina: 11,
      },
      {
        tipo: "multipla",
        enunciado: "No contexto da NBC TA 200 (R1), o que significa “asseguração razoável”?",
        opcoes: [
          "Um nível absoluto de segurança, sem nenhum risco",
          "Um nível baixo de segurança, apenas indicativo",
          "Um nível alto, mas não absoluto, de segurança",
          "A garantia de que todos os lançamentos estão corretos",
        ],
        correta: 2,
        explicacao:
          "Asseguração razoável é, no contexto da auditoria de demonstrações contábeis, um nível alto, mas não absoluto, de segurança.",
        pagina: 15,
      },
      {
        tipo: "multipla",
        enunciado: "Qual das alternativas abaixo NÃO é objetivo da auditoria?",
        opcoes: [
          "Obter segurança razoável de que as demonstrações estão livres de distorção relevante",
          "Expressar opinião sobre se as demonstrações seguem a estrutura de relatório aplicável",
          "Apresentar relatório sobre as demonstrações contábeis",
          "Atestar a eficácia da administração na gestão dos negócios",
        ],
        correta: 3,
        explicacao:
          "Entre o que NÃO é objetivo da auditoria estão: elaborar as demonstrações, prevenir e identificar fraudes, garantir todos os lançamentos, garantir a viabilidade futura e atestar a eficácia da administração.",
        pagina: 14,
      },
      {
        tipo: "vf",
        enunciado:
          "Confirmações obtidas de fontes externas (ex.: saldos bancários confirmados pelo banco) geralmente têm mais credibilidade do que as obtidas dentro da própria entidade auditada.",
        correta: true,
        explicacao:
          "Verdadeiro! Ao tratar do objeto da auditoria, o livro afirma que as confirmações de fontes externas geralmente oferecem melhores características de credibilidade.",
        pagina: 16,
      },
      {
        tipo: "multipla",
        enunciado:
          "A auditoria resguarda o patrimônio contra multas e protege o fisco contra a sonegação de impostos. Esse reflexo sobre a riqueza patrimonial ocorre sob qual aspecto?",
        opcoes: ["Aspecto fiscal", "Aspecto técnico", "Aspecto econômico", "Aspecto administrativo"],
        correta: 0,
        explicacao:
          "Sob o aspecto fiscal, a auditoria é fator de cumprimento mais rigoroso das obrigações fiscais, resguardando o patrimônio contra multas e o fisco contra sonegação.",
        pagina: 16,
      },
    ],
  },

  // ─────────────────────────────── 1.2 ───────────────────────────────
  {
    item: "1.2",
    titulo: "Papel da Auditoria",
    icone: "🎯",
    paginas: "p. 17–19",
    dicas: [
      "As demonstrações acompanhadas da opinião do auditor independente ajudam investidores a escolher com segurança onde aplicar.",
      "A NBC TA 570 trata da CONTINUIDADE OPERACIONAL: a entidade é vista como continuando em operação em futuro previsível.",
      "Não cabe ao auditor GARANTIR a continuidade da entidade — ele não pode prever o futuro.",
      "O cálculo das estimativas contábeis é de responsabilidade exclusiva da ADMINISTRAÇÃO (NBC TA 540 R2).",
    ],
    perguntas: [
      {
        tipo: "multipla",
        enunciado: "Segundo o livro, como muitas empresas enxergavam a contratação de auditoria independente até algum tempo atrás?",
        opcoes: [
          "Como um benefício estratégico",
          "Como um custo, nunca como benefício",
          "Como uma exigência do fisco apenas para pequenas empresas",
          "Como substituta da contabilidade",
        ],
        correta: 1,
        explicacao:
          "Muitas empresas consideravam a auditoria independente um custo, nunca um benefício — “Nada mais errado”, diz o autor, pois o exame é uma verdadeira viagem pela empresa.",
        pagina: 17,
      },
      {
        tipo: "multipla",
        enunciado: "Qual norma trata da responsabilidade do auditor em relação ao pressuposto de continuidade operacional?",
        opcoes: ["NBC TA 200", "NBC TA 240", "NBC TA 570", "NBC TA 210"],
        correta: 2,
        explicacao: "A NBC TA 570 – Continuidade Operacional trata da responsabilidade do auditor quanto ao uso desse pressuposto pela administração.",
        pagina: 17,
      },
      {
        tipo: "multipla",
        enunciado: "De acordo com o pressuposto de continuidade operacional, a entidade é vista como…",
        opcoes: [
          "em processo de liquidação",
          "continuando em operação em futuro previsível",
          "dependente exclusivamente de recursos públicos",
          "obrigada a encerrar atividades ao fim do exercício",
        ],
        correta: 1,
        explicacao:
          "A entidade é vista como continuando em operação em futuro previsível, a menos que a administração pretenda liquidá-la ou interromper as operações.",
        pagina: 17,
      },
      {
        tipo: "vf",
        enunciado: "Cabe ao auditor garantir a continuidade operacional da entidade auditada.",
        correta: false,
        explicacao:
          "Falso! Não cabe ao auditor garantir a continuidade operacional, pois ele não pode prever eventos ou condições futuras que causem uma descontinuidade.",
        pagina: 18,
      },
      {
        tipo: "multipla",
        enunciado:
          "O auditor encontrou “capital circulante líquido negativo” na empresa. Esse indicador de dúvida sobre a continuidade operacional é classificado como:",
        opcoes: ["Operacional", "Financeiro", "Legal / regulatório", "Ambiental"],
        correta: 1,
        explicacao:
          "Passivo a descoberto, capital circulante líquido negativo e índices financeiros adversos são indicadores FINANCEIROS. Perda de pessoal-chave, por exemplo, é operacional.",
        pagina: 18,
      },
      {
        tipo: "vf",
        enunciado: "O cálculo das estimativas contábeis (ex.: perdas com créditos de liquidação duvidosa) é responsabilidade exclusiva do auditor.",
        correta: false,
        explicacao:
          "Falso! O cálculo das estimativas contábeis é de exclusiva responsabilidade da administração. O auditor deve se assegurar da razoabilidade delas.",
        pagina: 19,
      },
      {
        tipo: "multipla",
        enunciado: "Segundo a NBC TA 540 (R2), o que é “estimativa contábil”?",
        opcoes: [
          "O valor exato de um item, comprovado por nota fiscal",
          "A aproximação de um valor monetário na ausência de um meio de mensuração preciso",
          "A opinião do auditor sobre o lucro do próximo ano",
          "A falta de neutralidade da administração",
        ],
        correta: 1,
        explicacao:
          "Estimativa contábil é a aproximação de um valor monetário na ausência de um meio de mensuração preciso. (A “falta de neutralidade” é a definição de tendenciosidade da administração.)",
        pagina: 19,
      },
    ],
  },

  // ─────────────────────────────── 1.3 ───────────────────────────────
  {
    item: "1.3",
    titulo: "Aspectos Administrativos e de Controle",
    icone: "🛡️",
    paginas: "p. 22–23",
    dicas: [
      "A principal vantagem da auditoria externa é sua INDEPENDÊNCIA: ela não se envolve com o ambiente de trabalho.",
      "Fator psicológico: quem sabe que há um controlador evita cometer irregularidades.",
      "Às vezes o risco é tão pequeno que o custo do controle fica mais caro — calcule o custo-benefício!",
      "As vantagens são divididas para: a ADMINISTRAÇÃO, os INVESTIDORES e o FISCO.",
    ],
    perguntas: [
      {
        tipo: "multipla",
        enunciado: "Qual é a principal vantagem da auditoria externa, segundo o livro?",
        opcoes: ["Seu baixo custo", "Sua independência", "Ser feita por funcionários da empresa", "Dispensar controles internos"],
        correta: 1,
        explicacao:
          "A principal vantagem da auditoria externa é sua independência, pois não se envolve com o ambiente de trabalho, evitando embaraços e constrangimentos.",
        pagina: 22,
      },
      {
        tipo: "vf",
        enunciado:
          "O trabalho de auditoria envolve também fatores psicológicos: as pessoas, ao saberem que há um controlador, inibem iniciativas de cometer irregularidades.",
        correta: true,
        explicacao: "Verdadeiro! O livro destaca que, além dos fatores técnicos, a auditoria tem esse efeito psicológico inibidor.",
        pagina: 22,
      },
      {
        tipo: "vf",
        enunciado: "Em alguns casos, o risco é tão pequeno que não compensa contratar auditores, pois o custo do controle se torna mais caro.",
        correta: true,
        explicacao: "Verdadeiro! É importante calcular o custo-benefício da operação antes de contratar a auditoria.",
        pagina: 22,
      },
      {
        tipo: "multipla",
        enunciado: "“Dificulta desvios de bens patrimoniais e pagamentos indevidos de despesas” é uma vantagem da auditoria para:",
        opcoes: ["O Fisco", "Os investidores", "A administração da empresa", "Os fornecedores"],
        correta: 2,
        explicacao:
          "Essa é uma das vantagens para a administração, ao lado de fiscalizar a eficiência dos controles internos e apontar falhas na organização administrativa.",
        pagina: 22,
      },
      {
        tipo: "multipla",
        enunciado: "“Contribui para maior observância das leis fiscais” é uma vantagem da auditoria para:",
        opcoes: ["O Fisco", "Os investidores", "A administração da empresa", "Os auditores internos"],
        correta: 0,
        explicacao: "Entre as vantagens para o Fisco estão: maior exatidão das demonstrações e resultados e maior observância das leis fiscais.",
        pagina: 23,
      },
      {
        tipo: "vf",
        enunciado: "Depois que as demonstrações contábeis são auditadas, a administração fica isenta da responsabilidade por elas.",
        correta: false,
        explicacao:
          "Falso! As demonstrações são elaboradas pela administração, e a auditoria NÃO exime dessas responsabilidades a administração nem os responsáveis pela governança.",
        pagina: 22,
      },
      {
        tipo: "multipla",
        enunciado: "Qual destas é uma vantagem da auditoria para os INVESTIDORES (titulares do capital)?",
        opcoes: [
          "Contribuir para maior exatidão das demonstrações contábeis",
          "Aumentar a arrecadação de tributos",
          "Substituir o conselho fiscal",
          "Eliminar a necessidade de notas explicativas",
        ],
        correta: 0,
        explicacao:
          "Para os investidores, a auditoria contribui para maior exatidão das demonstrações, melhores informações sobre a situação da empresa e maior exatidão dos resultados.",
        pagina: 23,
      },
    ],
  },

  // ─────────────────────────────── 1.4 ───────────────────────────────
  {
    item: "1.4",
    titulo: "Tipos de Auditoria",
    icone: "🗂️",
    paginas: "p. 23–30",
    dicas: [
      "Quanto à extensão: auditoria GERAL (todo o patrimônio), PARCIAL/ESPECÍFICA (só uma parte) e REVISÃO LIMITADA (urgência, opinião limitada).",
      "Auditoria operacional = auditoria dos 3 Es: Economia, Eficiência e Eficácia.",
      "Compliance verifica o cumprimento de leis e normas — ganhou força com a Lei Anticorrupção (Lei nº 12.846/2013).",
      "Auditoria especial: fatos incomuns ou extraordinários (fraudes, fusão, cisão…), com relatório restrito ou confidencial.",
    ],
    perguntas: [
      {
        tipo: "multipla",
        enunciado:
          "O Governo audita o patrimônio de uma empresa privada para identificar e corrigir atitudes contributivas (INSS, FGTS, IR, CSLL). Que vertente da auditoria governamental é essa?",
        opcoes: ["Auditoria de gestão pública", "Auditoria tributária fiscal", "Auditoria ambiental", "Auditoria de sistemas"],
        correta: 1,
        explicacao:
          "A Auditoria Tributária Fiscal é realizada pelo Governo sobre o patrimônio privado para identificar e corrigir atitudes contributivas em impostos, taxas e contribuições.",
        pagina: 23,
      },
      {
        tipo: "multipla",
        enunciado:
          "Uma empresa contrata o auditor apenas para conferir os custos de produção, sem examinar as demais demonstrações. Quanto à extensão, isso é uma auditoria:",
        opcoes: ["Geral", "Parcial ou específica", "De gestão pública", "Revisão limitada"],
        correta: 1,
        explicacao:
          "A auditoria parcial ou específica é feita em apenas uma ou algumas demonstrações, livros ou atos de gestão, com objetivos especiais — como conferir os custos.",
        pagina: 24,
      },
      {
        tipo: "multipla",
        enunciado: "Qual tipo de trabalho tem caráter de urgência e emite uma opinião parcial, sem aplicar todos os procedimentos da auditoria convencional?",
        opcoes: ["Auditoria geral", "Auditoria especial", "Revisão limitada", "Auditoria de compliance"],
        correta: 2,
        explicacao:
          "A revisão limitada tem caráter de urgência e opinião parcial ou “limitada”; o relatório deve deixar claro já no parágrafo inicial que se trata de revisão limitada.",
        pagina: 24,
      },
      {
        tipo: "multipla",
        enunciado: "A auditoria operacional também é conhecida como “auditoria dos 3 Es”. Quais são eles?",
        opcoes: [
          "Ética, Estratégia e Execução",
          "Economia, Eficiência e Eficácia",
          "Exatidão, Evidência e Exame",
          "Estoque, Entrada e Encerramento",
        ],
        correta: 1,
        explicacao:
          "A auditoria operacional, ou dos 3 Es (Economia, Eficiência e Eficácia), determina se a organização examinada opera adequadamente.",
        pagina: 27,
      },
      {
        tipo: "multipla",
        enunciado:
          "O auditor examina a segurança, a privacidade e a consistência dos dados gerados pelos sistemas informatizados da empresa. Que tipo de auditoria é essa?",
        opcoes: ["Auditoria tributária", "Auditoria de sistemas", "Auditoria na saúde", "Auditoria do terceiro setor"],
        correta: 1,
        explicacao:
          "A auditoria de sistemas avalia a qualidade do processamento de dados e dos controles de TI, assegurando adequação, privacidade e consistência das informações.",
        pagina: 28,
      },
      {
        tipo: "vf",
        enunciado:
          "Após a Lei nº 12.846/2013 (Lei Anticorrupção), os programas de compliance (integridade) passaram a ser quase obrigatórios para a sobrevivência das organizações.",
        correta: true,
        explicacao:
          "Verdadeiro! O livro afirma que, após a Lei Anticorrupção, vigente desde 29/01/2014, os programas de compliance passaram a ser quase obrigatórios.",
        pagina: 29,
      },
      {
        tipo: "multipla",
        enunciado:
          "O conselho de administração pede um exame urgente sobre uma suspeita de fraude e uma possível fusão. O relatório deve ser restrito ou confidencial. Que tipo de auditoria é essa?",
        opcoes: ["Auditoria especial", "Auditoria ambiental", "Auditoria geral", "Auditoria operacional"],
        correta: 0,
        explicacao:
          "A auditoria especial examina fatos relevantes de natureza incomum ou extraordinária (fraudes, fusão, cisão, incorporação…), com relatório circunstanciado em caráter restrito ou confidencial.",
        pagina: 30,
      },
    ],
  },
];
