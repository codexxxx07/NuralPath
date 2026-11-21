/**
 * Educational schematics for VLSI topics. Static SVG only — no simulation.
 */

const stroke = "var(--color-wood-dark)";
const fill = "var(--color-paper-warm)";
const ink = "var(--color-foreground)";
const wire = "var(--color-graphite)";

function Frame({ children, label, caption }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border">
      <div className="circuit-board p-4 sm:p-6">
        <svg viewBox="0 0 420 220" className="mx-auto h-auto w-full max-w-xl" role="img" aria-label={label}>
          {children}
        </svg>
      </div>
      {caption ? (
        <figcaption className="border-t border-border bg-[var(--color-paper-warm)] px-4 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

const label = (x, y, text, size = 10, anchor = "start") => (
  <text x={x} y={y} fontSize={size} fontFamily="JetBrains Mono, monospace" fill={ink} textAnchor={anchor}>
    {text}
  </text>
);

function Gates() {
  return (
    <Frame label="NAND gate CMOS structure" caption="NAND2: parallel PMOS pull-up, series NMOS pull-down.">
      <rect x="18" y="18" width="180" height="184" rx="4" fill="none" stroke={stroke} strokeDasharray="4 4" opacity="0.4" />
      {label(26, 34, "VDD", 10)}
      <line x1="40" y1="48" x2="170" y2="48" stroke={wire} strokeWidth="2" />
      {label(330, 34, "VDD", 10)}
      <line x1="280" y1="48" x2="400" y2="48" stroke={wire} strokeWidth="2" />
      {/* PMOS parallel */}
      <line x1="40" y1="48" x2="40" y2="70" stroke={wire} strokeWidth="2" />
      <line x1="80" y1="48" x2="80" y2="70" stroke={wire} strokeWidth="2" />
      <rect x="28" y="70" width="24" height="30" rx="2" fill={fill} stroke={stroke} />
      <rect x="68" y="70" width="24" height="30" rx="2" fill={fill} stroke={stroke} />
      {label(24, 116, "A", 9)}
      <line x1="18" y1="88" x2="28" y2="88" stroke={wire} strokeWidth="1.6" />
      {label(68, 116, "B", 9)}
      <line x1="60" y1="88" x2="80" y2="88" stroke={wire} strokeWidth="1.6" />
      <line x1="40" y1="100" x2="40" y2="122" stroke={wire} strokeWidth="2" />
      <line x1="80" y1="100" x2="80" y2="122" stroke={wire} strokeWidth="2" />
      <line x1="40" y1="122" x2="80" y2="122" stroke={wire} strokeWidth="2" />
      <line x1="60" y1="122" x2="60" y2="142" stroke={wire} strokeWidth="2" />
      {label(64, 156, "Y = !(A·B)", 9)}
      {/* NMOS series */}
      <line x1="280" y1="48" x2="280" y2="62" stroke={wire} strokeWidth="2" />
      <rect x="268" y="62" width="24" height="28" rx="2" fill={fill} stroke={stroke} />
      <line x1="280" y1="90" x2="280" y2="118" stroke={wire} strokeWidth="2" />
      <rect x="268" y="118" width="24" height="28" rx="2" fill={fill} stroke={stroke} />
      <line x1="280" y1="146" x2="280" y2="176" stroke={wire} strokeWidth="2" />
      <line x1="252" y1="176" x2="340" y2="176" stroke={wire} strokeWidth="2" />
      {label(345, 180, "GND", 10)}
      {label(300, 78, "A", 9)}
      <line x1="292" y1="76" x2="268" y2="76" stroke={wire} strokeWidth="1.5" />
      {label(300, 134, "B", 9)}
      <line x1="292" y1="132" x2="268" y2="132" stroke={wire} strokeWidth="1.5" />
      <line x1="280" y1="104" x2="330" y2="104" stroke={wire} strokeWidth="1.6" strokeDasharray="3 3" />
      {label(336, 108, "Y", 10)}
    </Frame>
  );
}

function Inverter() {
  return (
    <Frame label="CMOS inverter" caption="PMOS pull-up to VDD and NMOS pull-down to GND, gates tied to the input.">
      <line x1="40" y1="42" x2="380" y2="42" stroke={wire} strokeWidth="2" />
      {label(44, 32, "VDD", 10)}
      <line x1="120" y1="42" x2="120" y2="64" stroke={wire} strokeWidth="2" />
      <rect x="104" y="64" width="32" height="30" rx="2" fill={fill} stroke={stroke} />
      <line x1="120" y1="94" x2="120" y2="128" stroke={wire} strokeWidth="2" />
      <rect x="104" y="128" width="32" height="30" rx="2" fill={fill} stroke={stroke} />
      <line x1="120" y1="158" x2="120" y2="182" stroke={wire} strokeWidth="2" />
      <line x1="60" y1="182" x2="200" y2="182" stroke={wire} strokeWidth="2" />
      {label(206, 186, "GND", 10)}
      <line x1="60" y1="110" x2="104" y2="110" stroke={wire} strokeWidth="1.8" />
      {label(44, 113, "Vin", 10)}
      <line x1="136" y1="110" x2="230" y2="110" stroke={wire} strokeWidth="1.8" />
      <circle cx="240" cy="110" r="4" fill={ink} />
      {label(250, 114, "Vout", 10)}
      <line x1="230" y1="42" x2="230" y2="110" stroke={wire} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.5" />
      {label(60, 210, "Vin low → PMOS on → Vout high", 9)}
      {label(250, 210, "Vin high → NMOS on → Vout low", 9)}
    </Frame>
  );
}

function Amplifier() {
  return (
    <Frame label="Common source amplifier" caption="A resistively loaded common-source stage biased in saturation.">
      <line x1="40" y1="40" x2="360" y2="40" stroke={wire} strokeWidth="2" />
      {label(44, 30, "VDD", 10)}
      <rect x="210" y="52" width="26" height="54" rx="2" fill={fill} stroke={stroke} />
      <line x1="223" y1="40" x2="223" y2="52" stroke={wire} strokeWidth="2" />
      {label(244, 82, "RD", 10)}
      <line x1="223" y1="106" x2="223" y2="134" stroke={wire} strokeWidth="2" />
      <rect x="200" y="134" width="46" height="34" rx="2" fill={fill} stroke={stroke} />
      {label(210, 156, "NMOS", 9)}
      <line x1="223" y1="168" x2="223" y2="188" stroke={wire} strokeWidth="2" />
      <line x1="190" y1="188" x2="270" y2="188" stroke={wire} strokeWidth="2" />
      {label(278, 192, "GND", 10)}
      {label(160, 132, "Vin", 10)}
      <line x1="196" y1="132" x2="150" y2="132" stroke={wire} strokeWidth="1.8" />
      <line x1="196" y1="150" x2="150" y2="150" stroke={wire} strokeWidth="1.8" />
      <line x1="150" y1="126" x2="150" y2="156" stroke={wire} strokeWidth="1.8" />
      <line x1="246" y1="150" x2="330" y2="150" stroke={wire} strokeWidth="1.8" />
      <circle cx="338" cy="150" r="4" fill={ink} />
      {label(346, 154, "Vout", 10)}
      {label(60, 96, "gain ≈ -gm·(ro ∥ RD)", 9)}
      {label(60, 112, "bandwidth set by RD ∥ ro and C_load", 9)}
    </Frame>
  );
}

function RtlFlow() {
  return (
    <Frame label="RTL to GDSII flow" caption="Each stage produces a new representation; timing is verified on the extracted layout.">
      {[
        ["RTL", 40],
        ["Synthesis", 118],
        ["Placement", 196],
        ["CTS", 274],
        ["Route", 352],
      ].map(([text, x], i) => (
        <g key={text}>
          <rect x={x} y="82" width="62" height="44" rx="3" fill={fill} stroke={stroke} />
          {label(x + 31, 108, text, 9, "middle")}
          {i < 4 ? <line x1={x + 62} y1="104" x2={x + 78} y2="104" stroke={wire} strokeWidth="2" markerEnd="url(#arrow)" /> : null}
        </g>
      ))}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={wire} />
        </marker>
      </defs>
      {label(40, 48, "Design intent", 9)}
      <line x1="70" y1="60" x2="370" y2="60" stroke={wire} strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
      {label(40, 166, "Timing / power / area feedback at every stage", 9)}
      {label(40, 186, "Final signoff uses extracted parasitics, not RTL delays", 9)}
    </Frame>
  );
}

function SvLayers() {
  return (
    <Frame label="Verification layers" caption="Stimulus, checking and coverage all observe the same interface; assertions sit closest to the design.">
      {[
        ["Sequences", 34],
        ["Sequencer", 92],
        ["Driver", 150],
        ["DUT", 218],
        ["Monitor", 296],
        ["Scoreboard", 356],
      ].map(([text, x]) => (
        <g key={text}>
          <rect x={x} y="78" width="58" height="46" rx="3" fill={fill} stroke={stroke} />
          {label(x + 29, 105, text, 8, "middle")}
        </g>
      ))}
      {[92, 150, 218, 296].map((x) => (
        <line key={x} x1={x + 58} y1="101" x2={x + 58 + (x === 296 ? 0 : 0)} y2="101" stroke={wire} strokeWidth="2" />
      ))}
      <line x1="208" y1="101" x2="218" y2="101" stroke={wire} strokeWidth="2" />
      <line x1="276" y1="101" x2="296" y2="101" stroke={wire} strokeWidth="2" />
      <line x1="384" y1="101" x2="404" y2="101" stroke={wire} strokeWidth="2" opacity="0" />
      {label(30, 152, "assertions observe DUT pins in parallel", 9)}
      <line x1="40" y1="162" x2="380" y2="162" stroke={wire} strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
      {label(30, 186, "coverage collects the same observed transactions", 9)}
    </Frame>
  );
}

function TimingPath() {
  return (
    <Frame label="Setup timing path" caption="Launch register, combinational cloud and capture register. Clock period must cover Tcq + Tcomb + Tsetup + skew.">
      <rect x="34" y="86" width="54" height="54" rx="3" fill={fill} stroke={stroke} />
      {label(61, 108, "FF1", 9, "middle")}
      {label(61, 122, "launch", 8, "middle")}
      <rect x="180" y="86" width="76" height="54" rx="3" fill={fill} stroke={stroke} strokeDasharray="4 3" />
      {label(218, 108, "logic", 9, "middle")}
      {label(218, 122, "Tcomb", 8, "middle")}
      <rect x="330" y="86" width="54" height="54" rx="3" fill={fill} stroke={stroke} />
      {label(357, 108, "FF2", 9, "middle")}
      {label(357, 122, "capture", 8, "middle")}
      <line x1="88" y1="112" x2="180" y2="112" stroke={wire} strokeWidth="2" />
      <line x1="256" y1="112" x2="330" y2="112" stroke={wire} strokeWidth="2" />
      <line x1="20" y1="58" x2="400" y2="58" stroke={wire} strokeWidth="1.4" strokeDasharray="5 3" />
      {label(20, 50, "clock", 9)}
      <line x1="61" y1="58" x2="61" y2="86" stroke={wire} strokeWidth="1.2" />
      <line x1="357" y1="58" x2="357" y2="86" stroke={wire} strokeWidth="1.2" />
      {label(34, 180, "slack = Tclk - (Tcq + Tcomb + Tsetup + skew)", 9)}
      {label(34, 198, "negative slack = setup violation", 9)}
    </Frame>
  );
}

function Floorplan() {
  return (
    <Frame label="Floorplan" caption="Macros at the boundary, standard-cell core, power stripes, I/O on the die edge.">
      <rect x="34" y="30" width="352" height="160" rx="4" fill={fill} stroke={stroke} />
      <rect x="42" y="38" width="74" height="46" rx="2" fill="color-mix(in srgb, var(--color-brass) 30%, transparent)" stroke={stroke} />
      {label(79, 65, "SRAM", 9, "middle")}
      <rect x="300" y="38" width="78" height="46" rx="2" fill="color-mix(in srgb, var(--color-brass) 30%, transparent)" stroke={stroke} />
      {label(339, 65, "PLL", 9, "middle")}
      <rect x="130" y="56" width="150" height="112" rx="2" fill="color-mix(in srgb, var(--color-notebook-blue) 22%, transparent)" stroke={stroke} strokeDasharray="4 3" />
      {label(205, 80, "standard cell core", 8, "middle")}
      {[96, 124, 152, 180, 208, 236, 264, 292].map((y) => (
        <line key={y} x1="138" y1={y} x2="272" y2={y} stroke={wire} strokeWidth="1" opacity="0.35" />
      ))}
      {[60, 110, 160].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="180" stroke="var(--color-destructive)" strokeWidth="2" opacity="0.35" />
      ))}
      {[70, 120, 170].map((y) => (
        <line key={y} x1="36" y1={y} x2="384" y2={y} stroke="var(--color-destructive)" strokeWidth="2" opacity="0.2" />
      ))}
      {label(34, 208, "red stripes: power distribution · dashed core: placement region", 8)}
    </Frame>
  );
}

function ScanChain() {
  return (
    <Frame label="Scan chain" caption="Scan-in feeds the first flop; each Q drives the next SI. SE selects scan mode; the final flop feeds scan-out.">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={50 + i * 82} y="84" width="54" height="52" rx="3" fill={fill} stroke={stroke} />
          {label(77 + i * 82, 104, "FF", 9, "middle")}
          {label(77 + i * 82, 118, "SI / D", 8, "middle")}
          {i < 3 ? <line x1={104 + i * 82} y1="110" x2={132 + i * 82} y2="110" stroke={wire} strokeWidth="2" markerEnd="url(#scanArrow)" /> : null}
        </g>
      ))}
      <defs>
        <marker id="scanArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={wire} />
        </marker>
      </defs>
      {label(16, 100, "SI", 9)}
      <line x1="28" y1="110" x2="50" y2="110" stroke={wire} strokeWidth="2" />
      <line x1="378" y1="110" x2="404" y2="110" stroke={wire} strokeWidth="2" />
      {label(390, 100, "SO", 9)}
      <line x1="40" y1="56" x2="380" y2="56" stroke={wire} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.6" />
      {label(40, 50, "SE (scan enable)", 9)}
      {label(40, 172, "shift: SI → FF1 → FF2 → FF3 → FF4 → SO", 9)}
      {label(40, 190, "capture: one functional clock, then shift out", 9)}
    </Frame>
  );
}

function UvmLayers() {
  return (
    <Frame label="UVM component graph" caption="Test → environment → agent → sequencer/driver/monitor, with scoreboard and coverage subscribing to the monitor.">
      <rect x="150" y="26" width="120" height="30" rx="3" fill={fill} stroke={stroke} />
      {label(210, 45, "Test", 9, "middle")}
      <line x1="210" y1="56" x2="210" y2="72" stroke={wire} strokeWidth="1.6" />
      <rect x="130" y="72" width="160" height="28" rx="3" fill={fill} stroke={stroke} />
      {label(210, 90, "Environment", 9, "middle")}
      <line x1="210" y1="100" x2="210" y2="114" stroke={wire} strokeWidth="1.6" />
      <rect x="120" y="114" width="180" height="30" rx="3" fill={fill} stroke={stroke} />
      {label(210, 133, "Agent", 9, "middle")}
      {[
        ["Sequencer", 56],
        ["Driver", 170],
        ["Monitor", 282],
      ].map(([text, x]) => (
        <g key={text}>
          <line x1={210} y1="144" x2={x + 34} y2="164" stroke={wire} strokeWidth="1.2" />
          <rect x={x} y="164" width="70" height="28" rx="3" fill={fill} stroke={stroke} />
          {label(x + 35, 182, text, 8, "middle")}
        </g>
      ))}
      <rect x="274" y="26" width="110" height="30" rx="3" fill={fill} stroke={stroke} />
      {label(329, 45, "Scoreboard", 8, "middle")}
      <line x1="282" y1="56" x2="310" y2="164" stroke={wire} strokeWidth="1.1" strokeDasharray="3 3" />
      {label(34, 146, "DUT", 8)}
    </Frame>
  );
}

const DIAGRAMS = {
  gates: Gates,
  inverter: Inverter,
  amplifier: Amplifier,
  "rtl-flow": RtlFlow,
  "sv-layers": SvLayers,
  "timing-path": TimingPath,
  floorplan: Floorplan,
  "scan-chain": ScanChain,
  "uvm-layers": UvmLayers,
};

export default function CircuitDiagram({ type, caption }) {
  const Component = DIAGRAMS[type] || Gates;
  return <Component caption={caption} />;
}
