import { useId } from "react";

/**
 * NestCat — mascote REUTILIZADO do projeto "pet-cat-si"
 * (https://github.com/luanmvcosta0/pet-cat-si).
 *
 * O desenho SVG (corpo, cabeça, orelhas, rabo, emblema e bigodes) é o mesmo
 * do projeto original. Para o jogo foram ADICIONADOS:
 *  - prop `mood`: expressões (normal, feliz, triste, pensando, surpreso)
 *  - prop `lupa`: lupa de auditor segurada pela pata
 *  - prop `size`: tamanho configurável
 *  - ids de gradiente únicos (useId), para permitir mais de um gato na tela
 */
export type Mood = "normal" | "feliz" | "triste" | "pensando" | "surpreso";

type Props = {
  mood?: Mood;
  lupa?: boolean;
  size?: number;
  animado?: boolean;
};

export default function NestCat({ mood = "normal", lupa = false, size = 340, animado = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const body = `bodyGrad-${uid}`;
  const chest = `chestGrad-${uid}`;
  const tail = `tailGrad-${uid}`;
  const shadow = `softShadow-${uid}`;

  // deslocamento das pupilas conforme o humor
  const pupil = mood === "pensando" ? { dx: 6, dy: -6 } : mood === "triste" ? { dx: 0, dy: 4 } : { dx: 0, dy: 0 };
  const pupilRy = mood === "surpreso" ? 8 : 14;
  const pupilRx = mood === "surpreso" ? 8 : 8;

  return (
    <div className={animado ? "animate-float animate-glow" : "animate-glow"}>
      <svg
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.25}
        role="img"
        aria-label={`NestCat ${mood}`}
      >
        <defs>
          <radialGradient id={body} cx="38%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#F03560" />
            <stop offset="100%" stopColor="#B8173B" />
          </radialGradient>
          <radialGradient id={chest} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#F5496A" />
            <stop offset="100%" stopColor="#E0234E" />
          </radialGradient>
          <radialGradient id={tail} cx="20%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#F03560" />
            <stop offset="100%" stopColor="#C01A40" />
          </radialGradient>
          <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#80001F" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* ── Rabo ── */}
        <path
          className={mood === "feliz" ? "animate-tail-fast" : "animate-tail"}
          d="M 272,345 C 332,312 368,225 350,152 C 335,97 295,88 276,122"
          fill="none"
          stroke={`url(#${tail})`}
          strokeWidth="26"
          strokeLinecap="round"
          filter={`url(#${shadow})`}
        />

        {/* ── Corpo ── */}
        <ellipse cx="200" cy="368" rx="90" ry="95" fill={`url(#${body})`} filter={`url(#${shadow})`} />
        <ellipse cx="200" cy="350" rx="54" ry="67" fill={`url(#${chest})`} />

        {/* ── Emblema NestJS no peito ── */}
        <polygon points="182,318 194,292 206,318 194,340" fill="rgba(255,255,255,0.22)" />
        <polygon points="194,318 206,292 218,318 206,340" fill="rgba(255,255,255,0.18)" />
        <polygon points="194,292 206,292 206,340 194,340" fill="rgba(255,255,255,0.05)" />

        {/* ── Patas ── */}
        <ellipse cx="150" cy="453" rx="36" ry="21" fill={`url(#${body})`} filter={`url(#${shadow})`} />
        <ellipse cx="250" cy="453" rx="36" ry="21" fill={`url(#${body})`} filter={`url(#${shadow})`} />
        <g stroke="#A0103A" strokeWidth="2" strokeLinecap="round">
          <line x1="137" y1="460" x2="135" y2="469" />
          <line x1="150" y1="462" x2="150" y2="471" />
          <line x1="163" y1="460" x2="165" y2="469" />
          <line x1="237" y1="460" x2="235" y2="469" />
          <line x1="250" y1="462" x2="250" y2="471" />
          <line x1="263" y1="460" x2="265" y2="469" />
        </g>

        {/* ── Cabeça ── */}
        <circle cx="200" cy="188" r="91" fill={`url(#${body})`} filter={`url(#${shadow})`} />

        {/* ── Orelhas ── */}
        <polygon points="110,174 150,60 196,162" fill="#C01A3C" />
        <polygon points="128,163 154,90 184,156" fill="#E8446A" />
        <polygon points="204,162 250,60 290,174" fill="#C01A3C" />
        <polygon points="216,156 246,90 272,163" fill="#E8446A" />

        <ellipse cx="196" cy="153" rx="30" ry="20" fill="#F5496A" opacity="0.35" />

        {/* ── Olhos ── */}
        {mood === "feliz" ? (
          <g fill="none" stroke="#1C0800" strokeWidth="6" strokeLinecap="round">
            <path d="M 150,188 Q 170,164 190,188" />
            <path d="M 210,188 Q 230,164 250,188" />
          </g>
        ) : (
          <>
            <g className="animate-blink-left">
              <ellipse cx="170" cy="182" rx="23" ry="19" fill="#FFC107" />
              <ellipse cx={170 + pupil.dx} cy={182 + pupil.dy} rx={pupilRx} ry={pupilRy} fill="#1C0800" />
              <ellipse cx={164 + pupil.dx} cy={175 + pupil.dy} rx="5" ry="6" fill="white" opacity="0.88" />
            </g>
            <g className="animate-blink-right">
              <ellipse cx="230" cy="182" rx="23" ry="19" fill="#FFC107" />
              <ellipse cx={230 + pupil.dx} cy={182 + pupil.dy} rx={pupilRx} ry={pupilRy} fill="#1C0800" />
              <ellipse cx={224 + pupil.dx} cy={175 + pupil.dy} rx="5" ry="6" fill="white" opacity="0.88" />
            </g>
          </>
        )}

        {/* ── Sobrancelhas (triste / pensando) ── */}
        {mood === "triste" && (
          <g stroke="#8A0E2A" strokeWidth="5" strokeLinecap="round">
            <line x1="150" y1="158" x2="186" y2="150" />
            <line x1="214" y1="150" x2="250" y2="158" />
          </g>
        )}
        {mood === "pensando" && (
          <g stroke="#8A0E2A" strokeWidth="5" strokeLinecap="round">
            <line x1="150" y1="156" x2="186" y2="156" />
            <line x1="214" y1="150" x2="250" y2="144" />
          </g>
        )}

        {/* ── Nariz ── */}
        <polygon points="200,210 192,220 208,220" fill="#9E1030" />

        {/* ── Boca ── */}
        {mood === "feliz" && (
          <path d="M 184,222 Q 200,246 216,222 Z" fill="#7A0A24" stroke="#8A0E2A" strokeWidth="2" strokeLinejoin="round" />
        )}
        {mood === "triste" && (
          <path d="M 188,232 Q 200,220 212,232" fill="none" stroke="#8A0E2A" strokeWidth="2.6" strokeLinecap="round" />
        )}
        {mood === "surpreso" && <ellipse cx="200" cy="232" rx="7" ry="9" fill="#7A0A24" />}
        {(mood === "normal" || mood === "pensando") && (
          <path d="M 192,220 Q 200,228 208,220" fill="none" stroke="#8A0E2A" strokeWidth="2.2" strokeLinecap="round" />
        )}

        {/* ── Bigodes ── */}
        <g stroke="rgba(255,220,220,0.75)" strokeWidth="1.6" strokeLinecap="round">
          <line x1="103" y1="207" x2="173" y2="211" />
          <line x1="100" y1="219" x2="173" y2="219" />
          <line x1="103" y1="231" x2="173" y2="227" />
          <line x1="227" y1="211" x2="297" y2="207" />
          <line x1="227" y1="219" x2="300" y2="219" />
          <line x1="227" y1="227" x2="297" y2="231" />
        </g>

        {/* ── Lágrima (triste) ── */}
        {mood === "triste" && <path d="M 152,200 Q 146,214 152,220 Q 158,214 152,200 Z" fill="#7FD6FF" opacity="0.9" />}

        {/* ── Lupa do auditor (novo) ── */}
        {lupa && (
          <g className="animate-lupa">
            <line x1="292" y1="440" x2="330" y2="392" stroke="#5B3A1A" strokeWidth="12" strokeLinecap="round" />
            <circle cx="345" cy="370" r="34" fill="rgba(180,230,255,0.25)" stroke="#FFC107" strokeWidth="9" />
            <path d="M 330,352 Q 340,346 350,350" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            <ellipse cx="284" cy="446" rx="20" ry="14" fill={`url(#${body})`} />
          </g>
        )}
      </svg>
    </div>
  );
}
