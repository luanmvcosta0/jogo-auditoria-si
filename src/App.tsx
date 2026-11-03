import { useEffect, useMemo, useState } from "react";
import NestCat, { type Mood } from "./components/NestCat";
import { FASES, TEMA, type Pergunta } from "./data/conteudo";

type Tela = "inicio" | "comoJogar" | "mapa" | "dicas" | "jogo" | "resultado" | "final";

type Progresso = Record<number, { estrelas: number; pontos: number }>;

const VIDAS = 3;
const STORAGE_KEY = "nestcat-auditor-progresso";

function carregar(): Progresso {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
function salvar(p: Progresso) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* sem storage: segue sem salvar */
  }
}

// Pergunta já preparada para a tela (opções embaralhadas)
type PerguntaJogo = { enunciado: string; opcoes: string[]; correta: number; explicacao: string; pagina: number; tipo: Pergunta["tipo"] };

function embaralhar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function preparar(perguntas: Pergunta[]): PerguntaJogo[] {
  return embaralhar(perguntas).map((p) => {
    if (p.tipo === "vf") {
      return { ...p, opcoes: ["Verdadeiro", "Falso"], correta: p.correta ? 0 : 1 };
    }
    const ordem = embaralhar(p.opcoes.map((_, i) => i));
    return { ...p, opcoes: ordem.map((i) => p.opcoes[i]), correta: ordem.indexOf(p.correta) };
  });
}

function calcEstrelas(acertos: number, total: number) {
  const r = acertos / total;
  if (r === 1) return 3;
  if (r >= 0.7) return 2;
  if (r >= 0.5) return 1;
  return 0;
}

const FALAS_ACERTO = ["Miau! Parecer favorável! 🐾", "Evidência suficiente e apropriada!", "Isso aí, auditor(a)!", "Ronronando de orgulho!", "Sem distorção relevante aqui!"];
const FALAS_ERRO = ["Hmm… essa merece ressalva.", "Opa! Vamos revisar os papéis de trabalho.", "Miau… essa não passou no teste.", "Ceticismo profissional! Leia a explicação."];

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function App() {
  const [tela, setTela] = useState<Tela>("inicio");
  const [progresso, setProgresso] = useState<Progresso>(carregar);
  const [faseIdx, setFaseIdx] = useState(0);
  const [perguntas, setPerguntas] = useState<PerguntaJogo[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [vidas, setVidas] = useState(VIDAS);
  const [acertos, setAcertos] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [fala, setFala] = useState("");
  const [nome, setNome] = useState("");

  const fase = FASES[faseIdx];
  const pergunta = perguntas[qIdx];
  const respondida = escolha !== null;
  const acertou = respondida && escolha === pergunta?.correta;

  const totalEstrelas = Object.values(progresso).reduce((s, p) => s + p.estrelas, 0);
  const totalPontos = Object.values(progresso).reduce((s, p) => s + p.pontos, 0);
  const todasConcluidas = FASES.every((_, i) => (progresso[i]?.estrelas ?? 0) > 0);

  const liberada = (i: number) => i === 0 || (progresso[i - 1]?.estrelas ?? 0) > 0;

  function iniciarFase(i: number) {
    setFaseIdx(i);
    setTela("dicas");
  }

  function comecarPerguntas() {
    setPerguntas(preparar(fase.perguntas));
    setQIdx(0);
    setEscolha(null);
    setVidas(VIDAS);
    setAcertos(0);
    setPontos(0);
    setSequencia(0);
    setFala("");
    setTela("jogo");
  }

  function responder(i: number) {
    if (respondida) return;
    setEscolha(i);
    if (i === pergunta.correta) {
      const novaSeq = sequencia + 1;
      setSequencia(novaSeq);
      setAcertos((a) => a + 1);
      setPontos((p) => p + 100 + Math.min(novaSeq - 1, 4) * 25);
      setFala(pick(FALAS_ACERTO));
    } else {
      setSequencia(0);
      setVidas((v) => v - 1);
      setFala(pick(FALAS_ERRO));
    }
  }

  function proxima() {
    const acabou = qIdx + 1 >= perguntas.length || vidas <= 0;
    if (acabou) {
      const estrelas = vidas <= 0 ? 0 : calcEstrelas(acertos, perguntas.length);
      const anterior = progresso[faseIdx];
      if (!anterior || estrelas > anterior.estrelas || (estrelas === anterior.estrelas && pontos > anterior.pontos)) {
        const novo = { ...progresso, [faseIdx]: { estrelas, pontos } };
        setProgresso(novo);
        salvar(novo);
      }
      setTela("resultado");
      return;
    }
    setQIdx((q) => q + 1);
    setEscolha(null);
    setFala("");
  }

  // Atalhos de teclado: 1–4 respondem, Enter avança
  useEffect(() => {
    if (tela !== "jogo" || !pergunta) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (!respondida && n >= 1 && n <= pergunta.opcoes.length) responder(n - 1);
      else if (respondida && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        proxima();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const moodJogo: Mood = !respondida ? "pensando" : acertou ? "feliz" : "triste";

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white relative overflow-x-hidden">
      {/* Fundo: grid + glow (mesmo visual do pet original) */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#E0234E 1px, transparent 1px), linear-gradient(90deg, #E0234E 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E0234E 0%, transparent 70%)" }} />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-6 md:py-10 min-h-screen flex flex-col">
        {tela !== "inicio" && (
          <header className="flex items-center justify-between mb-6 gap-3">
            <button onClick={() => setTela("mapa")} className="text-xl md:text-2xl font-bold tracking-tight hover:opacity-80">
              Nest<span className="text-[#E0234E]">Cat</span> <span className="text-white/50 font-light">Auditor</span>
            </button>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <span title="Estrelas">⭐ {totalEstrelas}/{FASES.length * 3}</span>
              <span title="Pontos">🏆 {totalPontos}</span>
            </div>
          </header>
        )}

        {/* ═══════════ INÍCIO ═══════════ */}
        {tela === "inicio" && (
          <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 fade-in">
            <div className="order-2 md:order-1 text-center md:text-left max-w-md">
              <p className="text-[#E0234E] text-sm font-semibold uppercase tracking-widest mb-2">Jogo de Auditoria Contábil</p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Nest<span className="text-[#E0234E]">Cat</span>
                <br />
                <span className="text-white/90">Auditor</span>
              </h1>
              <p className="text-white/60 mt-4 leading-relaxed">
                Ajude o NestCat a se tornar auditor! Responda às perguntas baseadas no livro{" "}
                <em className="text-white/80">Auditoria Contábil</em> (Crepaldi), itens <b className="text-white">{TEMA.itens}</b>, e conquiste seu certificado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center md:justify-start">
                <button onClick={() => setTela("mapa")} className="btn-primary">
                  ▶ Jogar
                </button>
                <button onClick={() => setTela("comoJogar")} className="btn-secondary">
                  Como jogar
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <NestCat lupa size={260} />
            </div>
          </section>
        )}

        {/* ═══════════ COMO JOGAR ═══════════ */}
        {tela === "comoJogar" && (
          <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 fade-in">
            <NestCat mood="feliz" size={180} />
            <div className="card max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Como jogar</h2>
              <ul className="space-y-3 text-white/80 leading-relaxed">
                <li>🗺️ Há <b>{FASES.length} fases</b>, uma para cada item do livro ({TEMA.itens}). Concluir uma fase libera a próxima.</li>
                <li>💡 Antes de cada fase, o NestCat mostra um <b>resumo do livro</b> com as páginas de referência.</li>
                <li>❤️ Você tem <b>{VIDAS} vidas</b> por fase. Cada erro custa uma vida.</li>
                <li>🔥 Acertos seguidos dão <b>bônus de sequência</b>.</li>
                <li>📖 Depois de cada resposta aparece a explicação e a <b>página do livro</b> onde está o conteúdo.</li>
                <li>⭐ 3 estrelas = acertar tudo. Pode rejogar para melhorar!</li>
                <li>⌨️ Atalhos: teclas <b>1–4</b> para responder e <b>Enter</b> para continuar.</li>
              </ul>
              <button onClick={() => setTela("mapa")} className="btn-primary mt-6 w-full">
                Entendi, vamos lá!
              </button>
            </div>
          </section>
        )}

        {/* ═══════════ MAPA DE FASES ═══════════ */}
        {tela === "mapa" && (
          <section className="flex-1 fade-in">
            <div className="flex items-center gap-4 mb-6">
              <NestCat lupa size={90} animado={false} />
              <div className="card flex-1 !py-3">
                <p className="text-white/80">
                  {todasConcluidas ? "Você completou todas as fases! Pegue seu certificado. 🎓" : "Escolha uma fase para auditar. Miau!"}
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {FASES.map((f, i) => {
                const ok = liberada(i);
                const est = progresso[i]?.estrelas ?? 0;
                return (
                  <button
                    key={f.item}
                    disabled={!ok}
                    onClick={() => iniciarFase(i)}
                    className={`card text-left transition group ${ok ? "hover:border-[#E0234E]/70 hover:-translate-y-0.5 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[#E0234E] font-semibold">
                          Fase {i + 1} · Item {f.item}
                        </p>
                        <h3 className="text-lg font-semibold mt-1">{f.titulo}</h3>
                        <p className="text-white/50 text-sm mt-1">
                          {f.perguntas.length} perguntas · {f.paginas}
                        </p>
                      </div>
                      <span className="text-3xl">{ok ? f.icone : "🔒"}</span>
                    </div>
                    <div className="mt-3 text-xl tracking-widest">
                      {[0, 1, 2].map((s) => (
                        <span key={s} className={s < est ? "" : "grayscale opacity-30"}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {todasConcluidas && (
                <button onClick={() => setTela("final")} className="btn-primary">
                  🎓 Ver certificado
                </button>
              )}
              <button onClick={() => setTela("inicio")} className="btn-secondary">
                Início
              </button>
            </div>
          </section>
        )}

        {/* ═══════════ DICAS DO NESTCAT ═══════════ */}
        {tela === "dicas" && (
          <section className="flex-1 flex flex-col md:flex-row items-center gap-6 md:gap-10 fade-in">
            <div className="shrink-0">
              <NestCat mood="normal" lupa size={200} />
            </div>
            <div className="card flex-1 bubble">
              <p className="text-xs uppercase tracking-widest text-[#E0234E] font-semibold">
                Fase {faseIdx + 1} · Item {fase.item} · {fase.paginas}
              </p>
              <h2 className="text-2xl font-bold mt-1 mb-4">
                {fase.icone} {fase.titulo}
              </h2>
              <p className="text-white/60 mb-3">Antes de começar, anote estas dicas do livro:</p>
              <ul className="space-y-3">
                {fase.dicas.map((d, i) => (
                  <li key={i} className="flex gap-3 text-white/85 leading-relaxed">
                    <span className="text-[#E0234E] font-bold">{i + 1}.</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={comecarPerguntas} className="btn-primary">
                  Começar auditoria ▶
                </button>
                <button onClick={() => setTela("mapa")} className="btn-secondary">
                  Voltar
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ PERGUNTA ═══════════ */}
        {tela === "jogo" && pergunta && (
          <section className="flex-1 fade-in" key={qIdx}>
            {/* barra de status */}
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">
                Item {fase.item} · Pergunta {qIdx + 1}/{perguntas.length}
              </span>
              <span className="flex items-center gap-3">
                {sequencia >= 2 && <span className="text-amber-300 pop">🔥 x{sequencia}</span>}
                <span>🏆 {pontos}</span>
                <span aria-label={`${vidas} vidas`}>
                  {Array.from({ length: VIDAS }, (_, i) => (
                    <span key={i} className={i < vidas ? "" : "grayscale opacity-25"}>
                      ❤️
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
              <div className="h-full bg-[#E0234E] transition-all duration-500" style={{ width: `${((qIdx + (respondida ? 1 : 0)) / perguntas.length) * 100}%` }} />
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              <div className="shrink-0 flex flex-col items-center">
                <div className={respondida && !acertou ? "shake" : ""}>
                  <NestCat mood={moodJogo} lupa={!respondida} size={150} />
                </div>
                {fala && <p className="mt-2 text-center text-sm text-white/80 max-w-[180px] pop">{fala}</p>}
              </div>

              <div className="flex-1 w-full">
                <div className="card">
                  <p className="text-xs uppercase tracking-widest text-[#E0234E] font-semibold mb-2">
                    {pergunta.tipo === "vf" ? "Verdadeiro ou Falso" : "Múltipla escolha"}
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold leading-snug">{pergunta.enunciado}</h2>
                </div>

                <div className={`grid gap-3 mt-4 ${pergunta.tipo === "vf" ? "grid-cols-2" : ""}`}>
                  {pergunta.opcoes.map((op, i) => {
                    let estilo = "border-white/10 bg-white/[0.03] hover:border-[#E0234E]/70 hover:bg-[#E0234E]/10";
                    if (respondida) {
                      if (i === pergunta.correta) estilo = "border-emerald-400 bg-emerald-500/15";
                      else if (i === escolha) estilo = "border-rose-500 bg-rose-500/15";
                      else estilo = "border-white/5 bg-white/[0.02] opacity-50";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => responder(i)}
                        disabled={respondida}
                        className={`text-left rounded-xl border-2 px-4 py-3 transition flex items-center gap-3 ${estilo}`}
                      >
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">
                          {respondida && i === pergunta.correta ? "✓" : respondida && i === escolha ? "✗" : i + 1}
                        </span>
                        <span className="leading-snug">{op}</span>
                      </button>
                    );
                  })}
                </div>

                {respondida && (
                  <div className={`card mt-4 pop ${acertou ? "!border-emerald-400/50" : "!border-rose-500/50"}`}>
                    <p className={`font-bold ${acertou ? "text-emerald-300" : "text-rose-300"}`}>{acertou ? "✔ Correto!" : "✘ Não foi dessa vez"}</p>
                    <p className="text-white/80 mt-2 leading-relaxed">{pergunta.explicacao}</p>
                    <p className="text-white/50 text-sm mt-3">
                      📖 Crepaldi, <i>Auditoria Contábil</i>, item {fase.item}, p. {pergunta.pagina}
                    </p>
                    <button onClick={proxima} className="btn-primary mt-4 w-full sm:w-auto">
                      {vidas <= 0 ? "Ver resultado" : qIdx + 1 >= perguntas.length ? "Finalizar fase" : "Próxima ▶"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ RESULTADO DA FASE ═══════════ */}
        {tela === "resultado" && (
          <ResultadoFase
            faseIdx={faseIdx}
            acertos={acertos}
            total={perguntas.length}
            pontos={pontos}
            semVidas={vidas <= 0}
            onRepetir={comecarPerguntas}
            onMapa={() => setTela("mapa")}
            onProxima={() => (faseIdx + 1 < FASES.length ? iniciarFase(faseIdx + 1) : setTela("final"))}
          />
        )}

        {/* ═══════════ FINAL / CERTIFICADO ═══════════ */}
        {tela === "final" && (
          <section className="flex-1 flex flex-col items-center fade-in">
            <NestCat mood="feliz" lupa size={170} />
            <div className="card max-w-xl w-full mt-4 text-center certificado">
              <p className="text-xs uppercase tracking-[0.3em] text-[#E0234E] font-semibold">Certificado</p>
              <h2 className="text-3xl font-bold mt-2">Auditor(a) NestCat</h2>
              <p className="text-white/60 mt-4">Certificamos que</p>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="mt-2 w-full text-center text-2xl font-semibold bg-transparent border-b-2 border-[#E0234E]/50 focus:border-[#E0234E] outline-none py-1"
              />
              <p className="text-white/70 mt-4 leading-relaxed">
                concluiu as {FASES.length} fases sobre os itens <b>{TEMA.itens}</b> do livro <i>Auditoria Contábil</i> (Crepaldi), com{" "}
                <b className="text-amber-300">
                  {totalEstrelas}/{FASES.length * 3} ⭐
                </b>{" "}
                e <b className="text-white">{totalPontos} pontos</b>.
              </p>
              <p className="text-white/40 text-sm mt-4">“Parecer sem ressalvas.” — NestCat 🐾</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {TEMA.questionarioUrl && (
                <a href={TEMA.questionarioUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  📝 Responder questionário
                </a>
              )}
              <button onClick={() => window.print()} className="btn-secondary">
                🖨️ Imprimir
              </button>
              <button onClick={() => setTela("mapa")} className="btn-secondary">
                Voltar às fases
              </button>
            </div>
          </section>
        )}

        <footer className="mt-10 text-center text-xs text-white/30 no-print">
          Conteúdo: {TEMA.livro} ·{" "}
          <a className="underline hover:text-white/60" href={TEMA.livroUrl} target="_blank" rel="noreferrer">
            PDF do livro
          </a>{" "}
          · Mascote NestCat reutilizado do projeto pet-cat-si
        </footer>
      </main>
    </div>
  );
}

function ResultadoFase(props: {
  faseIdx: number;
  acertos: number;
  total: number;
  pontos: number;
  semVidas: boolean;
  onRepetir: () => void;
  onMapa: () => void;
  onProxima: () => void;
}) {
  const { faseIdx, acertos, total, pontos, semVidas } = props;
  const estrelas = semVidas ? 0 : calcEstrelas(acertos, total);
  const passou = estrelas > 0;
  const ultima = faseIdx + 1 >= FASES.length;

  const msg = useMemo(() => {
    if (semVidas) return "Acabaram as vidas! Releia as dicas e tente de novo — todo auditor revisa seus papéis de trabalho.";
    if (estrelas === 3) return "Perfeito! Parecer sem ressalvas! 🏆";
    if (estrelas === 2) return "Muito bom! Só uma ou outra ressalva.";
    if (estrelas === 1) return "Passou! Mas dá pra melhorar essa opinião.";
    return "Ainda não deu. Que tal revisar o conteúdo e tentar novamente?";
  }, [semVidas, estrelas]);

  return (
    <section className="flex-1 flex flex-col items-center justify-center fade-in">
      <NestCat mood={passou ? "feliz" : "triste"} size={170} />
      <div className="card max-w-md w-full mt-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#E0234E] font-semibold">
          Fase {faseIdx + 1} · Item {FASES[faseIdx].item}
        </p>
        <div className="text-5xl my-3 tracking-widest">
          {[0, 1, 2].map((s) => (
            <span key={s} className={`inline-block ${s < estrelas ? "pop" : "grayscale opacity-25"}`} style={{ animationDelay: `${s * 150}ms` }}>
              ⭐
            </span>
          ))}
        </div>
        <p className="text-lg">{msg}</p>
        <p className="text-white/60 mt-3">
          Acertos: <b className="text-white">{acertos}/{total}</b> · Pontos: <b className="text-white">{pontos}</b>
        </p>
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {passou && (
            <button onClick={props.onProxima} className="btn-primary">
              {ultima ? "🎓 Certificado" : "Próxima fase ▶"}
            </button>
          )}
          <button onClick={props.onRepetir} className={passou ? "btn-secondary" : "btn-primary"}>
            ↻ Jogar de novo
          </button>
          <button onClick={props.onMapa} className="btn-secondary">
            Fases
          </button>
        </div>
      </div>
    </section>
  );
}
