export type MascotPose = 'memo' | 'cheer' | 'guide';

const OUTLINE = '#4E9DB5';
const HAIR = '#C9EEE7';
const HAIR_SHADE = '#AEE3D9';
const SKIN = '#FEF9F4';
const WING = '#E1F5FC';
const WING_LINE = '#AFDFF0';
const MINT = '#D6F0EA';
const GOLD = '#F4D06F';

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d="M 0 -7 L 2 -2 L 7 0 L 2 2 L 0 7 L -2 2 L -7 0 L -2 -2 Z"
      fill={GOLD}
      transform={`translate(${x} ${y}) scale(${s})`}
    />
  );
}

function Arm({ d, handX, handY }: { d: string; handX: number; handY: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke={OUTLINE} strokeWidth={19} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={13} strokeLinecap="round" />
      <circle cx={handX} cy={handY} r={7.5} fill={SKIN} stroke={OUTLINE} strokeWidth={3.5} />
    </g>
  );
}

function Clipboard({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      <rect x={150} y={168} width={46} height={60} rx={8} fill="#BDE8D2" stroke={OUTLINE} strokeWidth={4} />
      <rect x={156} y={177} width={34} height={45} rx={4} fill="#FFFFFF" stroke="#D3E9DC" strokeWidth={2} />
      <rect x={163} y={162} width={20} height={11} rx={5} fill="#A5D8C0" stroke={OUTLINE} strokeWidth={3.5} />
      {[188, 199, 210].map((y) => (
        <g key={y}>
          <path
            d={`M 160 ${y - 3} l 3.5 3.5 l 5.5 -7`}
            fill="none"
            stroke="#6FBF8B"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1={173} y1={y - 2} x2={185} y2={y - 2} stroke="#C9DFF0" strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

/**
 * サイトのイメージキャラクター(妖精ドクター)。
 * pose: memo=メモを取る / cheer=スマホでチェック完了 / guide=クリップボードで案内
 * 装飾用イラストのため、意味を持たせたい場合は title を指定する。
 */
export function Mascot({
  pose = 'guide',
  className,
  title,
}: {
  pose?: MascotPose;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 270"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}

      {/* 影 */}
      <ellipse cx={120} cy={252} rx={50} ry={8} fill="#E3EDF3" />

      {/* 羽 */}
      <g fill={WING} fillOpacity={0.85} stroke={WING_LINE} strokeWidth={3}>
        <ellipse cx={50} cy={148} rx={27} ry={13} transform="rotate(-26 50 148)" />
        <ellipse cx={56} cy={170} rx={20} ry={10} transform="rotate(-8 56 170)" />
        <ellipse cx={190} cy={148} rx={27} ry={13} transform="rotate(26 190 148)" />
        <ellipse cx={184} cy={170} rx={20} ry={10} transform="rotate(8 184 170)" />
      </g>

      {/* 脚 */}
      <rect x={94} y={212} width={22} height={36} rx={11} fill={MINT} stroke={OUTLINE} strokeWidth={4} />
      <rect x={124} y={212} width={22} height={36} rx={11} fill={MINT} stroke={OUTLINE} strokeWidth={4} />

      {/* 白衣 */}
      <path
        d="M 84 162 Q 120 150 156 162 L 172 218 Q 175 232 161 232 L 79 232 Q 65 232 68 218 Z"
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth={4}
      />
      <path d="M 106 160 L 120 180 L 134 160" fill="#E4F6F1" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      <line x1={120} y1={180} x2={120} y2={230} stroke="#D8ECF4" strokeWidth={3} />
      <rect x={138} y={202} width={19} height={15} rx={4} fill="none" stroke="#D8ECF4" strokeWidth={3} />

      {/* 聴診器 */}
      <path d="M 105 164 C 100 190 116 198 124 200" fill="none" stroke="#7FC6CE" strokeWidth={5} strokeLinecap="round" />
      <path d="M 135 164 C 140 182 132 195 126 199" fill="none" stroke="#7FC6CE" strokeWidth={5} strokeLinecap="round" />
      <circle cx={126} cy={202} r={7} fill="#A7DED6" stroke={OUTLINE} strokeWidth={3.5} />

      {/* 頭:後ろ髪 → 顔 → 前髪 → リボン → 芽 */}
      <ellipse cx={120} cy={98} rx={68} ry={62} fill={HAIR} stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={62} cy={138} rx={14} ry={27} transform="rotate(14 62 138)" fill={HAIR} stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={178} cy={138} rx={14} ry={27} transform="rotate(-14 178 138)" fill={HAIR} stroke={OUTLINE} strokeWidth={4} />
      <ellipse cx={120} cy={112} rx={56} ry={50} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
      <path
        d="M 64 112 Q 52 42 120 36 Q 188 42 176 112 Q 168 98 157 106 Q 149 82 131 97 Q 120 78 107 97 Q 91 82 83 106 Q 72 98 64 112 Z"
        fill={HAIR}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M 84 56 Q 116 42 152 54" fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.7} />

      {/* サイドのリボン(左を描いて右へ反転) */}
      {[
        'translate(0 0)',
        'translate(240 0) scale(-1 1)',
      ].map((t) => (
        <g key={t} transform={t} fill={HAIR} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round">
          <path d="M 68 96 C 42 86 32 52 53 44 C 71 38 79 70 73 94 Z" />
          <path d="M 64 100 C 42 104 26 90 35 72 C 42 59 61 72 67 92 Z" fill={HAIR_SHADE} />
        </g>
      ))}

      {/* 頭頂の芽 */}
      <path d="M 120 40 Q 119 33 121 27" fill="none" stroke={OUTLINE} strokeWidth={4} strokeLinecap="round" />
      <path d="M 121 28 C 112 14 121 0 132 6 C 141 11 135 26 121 28 Z" fill={HAIR} stroke={OUTLINE} strokeWidth={4} strokeLinejoin="round" />
      <Sparkle x={120} y={39} s={0.5} />

      {/* 目 */}
      {[94, 146].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={118} rx={13} ry={16} fill="#1E88A8" />
          <ellipse cx={cx} cy={119} rx={10.5} ry={13.5} fill="#3FC0DE" />
          <ellipse cx={cx} cy={125} rx={6.5} ry={5} fill="#8FE0F0" />
          <ellipse cx={cx} cy={120} rx={5} ry={7} fill="#0E6A8C" />
          <circle cx={cx - 4.5} cy={112} r={4.5} fill="#FFFFFF" />
          <circle cx={cx + 4} cy={125} r={2} fill="#FFFFFF" opacity={0.9} />
        </g>
      ))}

      {/* ほっぺ */}
      <ellipse cx={76} cy={140} rx={9} ry={5.5} fill="#F9C6C1" opacity={0.9} />
      <ellipse cx={164} cy={140} rx={9} ry={5.5} fill="#F9C6C1" opacity={0.9} />

      {/* 口 */}
      {pose === 'cheer' ? (
        <g>
          <path d="M 109 142 A 11.5 11 0 0 0 131 142 Z" fill="#B95E6B" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
          <path d="M 113 150 Q 120 145 127 150 L 126 152 Q 120 155 114 152 Z" fill="#E89099" />
        </g>
      ) : (
        <path d="M 112 145 Q 120 152 128 145" fill="none" stroke="#E08A8A" strokeWidth={3.5} strokeLinecap="round" />
      )}

      {/* ポーズごとの腕と持ち物 */}
      {pose === 'memo' && (
        <g>
          <Arm d="M 152 172 Q 162 180 163 186" handX={164} handY={188} />
          <Clipboard transform="rotate(10 170 198)" />
          <Arm d="M 90 176 Q 74 170 82 156" handX={83} handY={154} />
          <g transform="rotate(-35 79 143)">
            <rect x={75} y={120} width={8} height={34} rx={4} fill="#79C6CF" stroke={OUTLINE} strokeWidth={3} />
            <path d="M 75 120 L 79 110 L 83 120 Z" fill="#A7DED6" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
          </g>
          <circle cx={83} cy={154} r={7.5} fill={SKIN} stroke={OUTLINE} strokeWidth={3.5} />
        </g>
      )}

      {pose === 'cheer' && (
        <g>
          <Arm d="M 90 172 Q 66 176 56 166" handX={54} handY={164} />
          <Arm d="M 150 172 Q 168 152 173 134" handX={175} handY={131} />
          <g transform="rotate(8 182 110)">
            <rect x={168} y={88} width={28} height={44} rx={6} fill="#FFFFFF" stroke={OUTLINE} strokeWidth={4} />
            <rect x={172.5} y={94} width={19} height={30} rx={3} fill="#E8F6FB" />
            <path d="M 176 108 l 4.5 5 l 8 -10" fill="none" stroke="#58BE83" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={182} cy={128} r={1.8} fill="#B8D9E6" />
          </g>
          <circle cx={175} cy={131} r={7.5} fill={SKIN} stroke={OUTLINE} strokeWidth={3.5} />
          <line x1={152} y1={62} x2={147} y2={76} stroke={GOLD} strokeWidth={5} strokeLinecap="round" />
          <circle cx={144} cy={85} r={3.2} fill={GOLD} />
        </g>
      )}

      {pose === 'guide' && (
        <g>
          <Arm d="M 90 172 Q 72 182 63 175" handX={61} handY={173} />
          <Arm d="M 152 172 Q 162 180 163 186" handX={164} handY={188} />
          <Clipboard transform="rotate(10 170 198)" />
        </g>
      )}

      {/* きらきら */}
      <Sparkle x={26} y={116} s={0.8} />
      <Sparkle x={214} y={86} s={1} />
      <Sparkle x={206} y={206} s={0.7} />
    </svg>
  );
}
