/**
 * VLSI content library. Diagrams are educational SVG schematics rendered by
 * CircuitDiagram — they are not connected to any simulator.
 */

export const vlsiTopics = [
  {
    slug: "digital-electronics",
    title: "Digital Electronics",
    subtitle: "Boolean algebra, logic gates, combinational and sequential building blocks.",
    tone: "#2f6b57",
    label: "VLSI-01",
    level: "Foundation",
    readTime: "30 min",
    stack: ["Boolean algebra", "K-maps", "Adders", "Flip-flops"],
    intro: [
      "Digital electronics is the contract between abstract logic and physical voltage. A gate is a circuit that maps input voltage levels to an output level with enough margin that a chain of gates still resolves to a clean 0 or 1.",
      "Everything above this layer — RTL, synthesis, timing — inherits its assumptions. If you do not know why a NAND gate is preferred over an AND gate in CMOS, or why a latch differs from a flip-flop, later tools will feel like magic.",
    ],
    concepts: [
      {
        title: "Boolean minimisation",
        body: "Karnaugh maps group adjacent minterms to remove variables. The goal is not the smallest expression in a textbook sense, but fewer literals and shallower logic depth, which usually means smaller and faster CMOS.",
        bullets: [
          "Group powers of two (1, 2, 4, 8) and wrap edges.",
          "Don't-care terms can be grouped to simplify further.",
          "NAND/NAND implementations are preferred because CMOS inverts naturally.",
        ],
      },
      {
        title: "Combinational building blocks",
        body: "Adders, multiplexers, decoders and comparators are assembled from gates. Their delay is the longest path through the gate network; their area is the gate count. Ripple-carry adders are small but slow; carry-lookahead trades area for depth.",
        bullets: [
          "Half adder: sum = A XOR B, carry = A AND B.",
          "Full adder: three inputs, sum and carry out.",
          "A 2:1 mux is the primitive of datapath selection and is often mapped directly in a standard-cell library.",
        ],
      },
      {
        title: "Latches versus flip-flops",
        body: "A latch is level-sensitive: while enabled, the output follows the input. A flip-flop is edge-triggered: it samples only at a clock edge. Edge-triggered design is the default for synchronous digital systems because it gives a simple timing model.",
        bullets: [
          "A D flip-flop is two latches in series with opposite enables (master–slave).",
          "Avoid latches in synthesis unless intentional — incomplete if/case branches infer them.",
          "Reset choice: asynchronous reset is immediate but needs recovery/removal checks.",
        ],
      },
    ],
    diagram: "gates",
    diagramCaption:
      "Static CMOS NAND2: the pull-down network conducts only when both inputs are high; the pull-up network conducts when either is low. The inverting structure is why NAND is cheaper than AND.",
    code: [
      {
        title: "Full adder in Verilog",
        lang: "verilog",
        note: "Behavioural description; synthesis maps the arithmetic to library cells.",
        code: `module full_adder(
  input  a, b, cin,
  output sum, cout
);
  assign sum  = a ^ b ^ cin;
  assign cout = (a & b) | (cin & (a ^ b));
endmodule`,
      },
      {
        title: "Edge-triggered D flip-flop",
        lang: "verilog",
        note: "Nonblocking assignment models the edge-triggered behaviour correctly.",
        code: `module dff(
  input clk, rst_n, d,
  output reg q
);
  always @(posedge clk or negedge rst_n)
    if (!rst_n) q <= 1'b0;
    else        q <= d;
endmodule`,
      },
    ],
    complexity: [
      { operation: "Gate delay", time: "Library dependent", space: "1 cell", note: "Fanout affects delay" },
      { operation: "Ripple-carry adder", time: "O(n) depth", space: "O(n) cells", note: "Simple, slow" },
      { operation: "Carry-lookahead adder", time: "O(log n) depth", space: "O(n log n)", note: "Faster, larger" },
      { operation: "Flip-flop setup/hold", time: "Fixed per cell", space: "1 cell", note: "Checked by STA" },
    ],
    practice: [
      { title: "Minimise F = Σm(0,1,2,5,6,7)", difficulty: "Easy", prompt: "Use a 3-variable K-map and write the minimal SOP expression.", hint: "Look for a group of four first." },
      { title: "Design a 4:1 mux from 2:1 muxes", difficulty: "Easy", prompt: "Build the tree and write the select mapping.", hint: "Two select levels: first pair, then final." },
      { title: "Latch inference", difficulty: "Medium", prompt: "Explain why an incomplete if statement in an always block infers a latch.", hint: "The tool must hold the previous value when no branch assigns." },
      { title: "Clock domain observation", difficulty: "Medium", prompt: "Why can two edge-triggered flops on different clocks not be connected directly?", hint: "Metastability when setup/hold is violated." },
    ],
    mistakes: [
      "Treating logic levels as ideal — real gates have thresholds, delays and noise margins.",
      "Using blocking assignments in sequential always blocks and creating simulation races.",
      "Forgetting that unused branch assignments infer storage.",
      "Assuming an AND gate costs the same as a NAND gate in CMOS.",
    ],
    related: [
      { label: "CMOS", to: "/vlsi/cmos" },
      { label: "Verilog", to: "/vlsi/verilog" },
      { label: "STA", to: "/vlsi/sta" },
    ],
  },
  {
    slug: "analog-electronics",
    title: "Analog Electronics",
    subtitle: "MOS small-signal behaviour, biasing, gain and the analog/mixed-signal boundary.",
    tone: "#7a5a3c",
    label: "VLSI-02",
    level: "Intermediate",
    readTime: "32 min",
    stack: ["Small signal", "Biasing", "Gain", "Noise"],
    intro: [
      "Digital design hides the transistor behind a switch model. Analog design lives in the region where that model breaks: subthreshold conduction, channel-length modulation, capacitance, and noise all matter.",
      "You do not need a full analog design career to work in VLSI, but you do need to understand why a standard cell has a characterised delay at a given load, why power grids droop, and why mixed-signal blocks need careful isolation.",
    ],
    concepts: [
      {
        title: "Regions of operation",
        body: "An NMOS is off below threshold, in linear/triode when Vds is small relative to overdrive, and in saturation when Vds exceeds the overdrive. Digital CMOS spends most of its time in cutoff or linear; analog gain stages bias in saturation.",
        bullets: [
          "Overdrive Vov = Vgs − Vth.",
          "Saturation current grows roughly quadratically with overdrive.",
          "Channel-length modulation adds finite output resistance ro.",
        ],
      },
      {
        title: "Small-signal models",
        body: "Around a bias point, a transistor becomes a transconductance gm and an output resistance ro. Gain of a common-source stage is approximately −gm·(ro ∥ RD). Increasing bias current raises gm and gain, at the cost of power.",
        bullets: [
          "gm = 2ID / Vov in strong inversion.",
          "Intrinsic gain gm·ro is a technology figure of merit.",
          "Load capacitance sets the bandwidth together with output resistance.",
        ],
      },
      {
        title: "Biasing and current mirrors",
        body: "A current mirror copies a reference current by matching Vgs. Matching depends on layout: identical orientation, common centroid, and enough area to average out random variation.",
        bullets: [
          "Cascode mirrors raise output resistance at the cost of headroom.",
          "A bias network that is too sensitive to Vth spread will fail at corners.",
          "Always check the operating point at slow/fast and hot/cold corners.",
        ],
      },
    ],
    diagram: "amplifier",
    diagramCaption:
      "Common-source stage with a resistive load. The bias point sets gm; the load line and Vds headroom decide whether the device stays in saturation for the full output swing.",
    code: [
      {
        title: "Operating point calculation",
        lang: "python",
        note: "A first-order square-law estimate. Real designs use characterised models, not this equation.",
        code: `# Square-law estimate of an NMOS bias point
K = 200e-6      # mu*Cox*W/L (A/V^2)
VTH = 0.45      # threshold (V)
VGS = 0.9       # gate-source bias (V)
LAMBDA = 0.1    # channel-length modulation (1/V)

VOV = VGS - VTH
ID = 0.5 * K * VOV**2
GM = K * VOV
RO = 1 / (LAMBDA * ID)

print(f"Vov={VOV:.3f} V  Id={ID*1e3:.3f} mA")
print(f"gm={GM*1e3:.3f} mS  ro={RO/1e3:.2f} kOhm")
print(f"intrinsic gain={GM*RO:.1f}")`,
      },
    ],
    complexity: [
      { operation: "Bias point", time: "Iterative / graphical", space: "Per device", note: "Corners matter" },
      { operation: "Small-signal gain", time: "Algebraic", space: "Per stage", note: "gm, ro, load" },
      { operation: "Bandwidth", time: "RC limited", space: "Parasitics", note: "Load capacitance" },
    ],
    practice: [
      { title: "Gain estimate", difficulty: "Easy", prompt: "A common-source stage has gm = 2 mS and ro = 50 kΩ. Estimate intrinsic gain.", hint: "gm·ro, then convert to dB if asked." },
      { title: "Headroom", difficulty: "Medium", prompt: "Why does a cascode current mirror reduce output swing?", hint: "Two stacked devices need at least two overdrives." },
      { title: "Matching", difficulty: "Medium", prompt: "Name two layout techniques that improve device matching.", hint: "Common centroid and identical orientation." },
    ],
    mistakes: [
      "Using the square-law model for short-channel devices where velocity saturation dominates.",
      "Ignoring output resistance when estimating gain.",
      "Biasing without checking headroom across process corners.",
      "Treating analog and digital supplies as interchangeable — noise couples through shared rails.",
    ],
    related: [
      { label: "CMOS", to: "/vlsi/cmos" },
      { label: "Physical Design", to: "/vlsi/physical-design" },
      { label: "Interview questions", to: "/vlsi/interview-questions" },
    ],
  },
  {
    slug: "cmos",
    title: "CMOS",
    subtitle: "The inverter, voltage transfer curve, noise margins, power and sizing.",
    tone: "#41617a",
    label: "VLSI-03",
    level: "Foundation",
    readTime: "34 min",
    stack: ["Inverter VTC", "Noise margin", "Dynamic power", "Sizing"],
    intro: [
      "CMOS pairs an NMOS pull-down network with a PMOS pull-up network so that in steady state one network is off. That is why static CMOS draws almost no DC current and why it scaled for decades.",
      "The inverter is the reference circuit: every standard cell's delay, drive strength and input capacitance is characterised relative to it. Understand the VTC and you understand why gates have thresholds and margins.",
    ],
    concepts: [
      {
        title: "The voltage transfer characteristic",
        body: "Sweep Vin and plot Vout. The switching threshold VM is where Vin = Vout. Symmetric switching requires the PMOS width to be roughly 2–3× the NMOS width because hole mobility is lower.",
        bullets: [
          "Five regions: NMOS off, NMOS saturation, both saturation, PMOS saturation, PMOS off.",
          "Steep transition gives high gain and good noise immunity.",
          "VM shifts with beta ratio, temperature and process.",
        ],
      },
      {
        title: "Noise margins",
        body: "VIL and VIH are the points where the VTC slope is −1. NMH = VOH − VIH and NML = VIL − VOL. A larger margin means more tolerance to coupled noise and voltage droop.",
        bullets: [
          "Ratios are more meaningful than absolute volts across technologies.",
          "Input noise margin and output drive trade off through sizing.",
          "Crosstalk and IR drop eat margin at run time, not just at DC.",
        ],
      },
      {
        title: "Power components",
        body: "Dynamic power is α·C·V²·f. Short-circuit power flows while both networks conduct during a transition. Leakage is static and grows at fast corners and high temperature. Modern designs are often leakage-limited.",
        bullets: [
          "Clock trees often dominate dynamic power because α is high.",
          "Clock gating removes switching when a block is idle.",
          "Multi-Vt libraries trade speed for leakage.",
        ],
      },
      {
        title: "Sizing and fanout",
        body: "A larger transistor drives more current but presents more input capacitance and area. Logical effort formalises the trade-off; in practice, keep fanout near 4 and insert buffers on long nets.",
        bullets: [
          "Rise and fall times should be balanced for timing and duty cycle.",
          "Slew degradation adds delay on long wires.",
          "Do not upsize gates on a path that is not critical.",
        ],
      },
    ],
    diagram: "inverter",
    diagramCaption:
      "CMOS inverter with a PMOS pull-up and NMOS pull-down. Only one device conducts in steady state, so static current is leakage only.",
    code: [
      {
        title: "Inverter with explicit drive strength",
        lang: "verilog",
        note: "Drive strength and delay are library attributes; RTL only expresses intent.",
        code: `module inv (
  input  wire a,
  output wire y
);
  assign y = ~a;
endmodule

// A testbench check
module inv_tb;
  reg a;
  wire y;
  inv u_inv(.a(a), .y(y));
  initial begin
    a = 0; #1 $display("a=%b y=%b", a, y);
    a = 1; #1 $display("a=%b y=%b", a, y);
    $finish;
  end
endmodule`,
      },
    ],
    complexity: [
      { operation: "Static current", time: "≈ leakage only", space: "—", note: "One network off" },
      { operation: "Dynamic energy", time: "α·C·V² per switch", space: "—", note: "Frequency scales power" },
      { operation: "Propagation delay", time: "≈ 0.69·R·C", space: "—", note: "Load and drive" },
      { operation: "Short-circuit power", time: "Input-slope dependent", space: "—", note: "Reduced by matched slopes" },
    ],
    practice: [
      { title: "Symmetric inverter", difficulty: "Easy", prompt: "Why is PMOS wider than NMOS for a symmetric threshold?", hint: "Hole mobility is lower, so width compensates." },
      { title: "Power estimate", difficulty: "Medium", prompt: "A node switches 200 MHz with C = 20 fF at 0.9 V and α = 0.1. Estimate dynamic power.", hint: "P = αCV²f." },
      { title: "Noise margin reading", difficulty: "Medium", prompt: "Given VOH=0.9, VIH=0.62, VIL=0.35, VOL=0.05, compute NMH and NML.", hint: "Subtract the corresponding thresholds." },
      { title: "Leakage reduction", difficulty: "Medium", prompt: "Name two techniques that reduce standby leakage without changing the function.", hint: "Power gating and high-Vt cells." },
    ],
    mistakes: [
      "Assuming CMOS consumes no power — leakage and dynamic power are real.",
      "Ignoring input slew when comparing delays from a library.",
      "Sizing every gate up instead of only critical paths.",
      "Using typical-corner numbers for a signoff decision.",
    ],
    related: [
      { label: "Digital Electronics", to: "/vlsi/digital-electronics" },
      { label: "STA", to: "/vlsi/sta" },
      { label: "Cheat sheets", to: "/vlsi/cheat-sheets" },
    ],
  },
  {
    slug: "verilog",
    title: "Verilog",
    subtitle: "Modules, continuous and procedural assignments, testbenches and synthesisable style.",
    tone: "#6b7f4a",
    label: "VLSI-04",
    level: "Foundation",
    readTime: "36 min",
    stack: ["Modules", "always blocks", "Nonblocking", "Testbench"],
    intro: [
      "Verilog describes hardware, not a sequence of instructions. The distinction matters most in always blocks: you are describing registers and combinational clouds that all exist at once.",
      "Synthesisable RTL is a disciplined subset of the language. Testbenches may use the full language, because they run in simulation rather than becoming silicon.",
    ],
    concepts: [
      {
        title: "Continuous versus procedural",
        body: "assign describes a wire that continuously reflects an expression. always blocks describe behaviour evaluated when a sensitivity condition triggers. Both can be synthesisable; mixing them carelessly creates multiple drivers.",
        bullets: [
          "Use assign for simple combinational equations and wiring.",
          "Use always @(*) for combinational logic with case/if.",
          "Use always @(posedge clk) for sequential state.",
        ],
      },
      {
        title: "Blocking versus nonblocking",
        body: "In sequential always blocks use <= so all registers sample the old values at the edge. Blocking assignments execute in order and can create simulation/synthesis mismatches in state machines.",
        bullets: [
          "Rule: sequential → nonblocking; combinational → blocking.",
          "Never mix both in the same always block.",
          "Nonblocking models the physical parallelism of flip-flops.",
        ],
      },
      {
        title: "Testbench structure",
        body: "A testbench instantiates the design, drives stimulus, and checks outputs. Self-checking testbenches compare against expected values and report pass/fail instead of requiring waveform inspection.",
        bullets: [
          "Use an initial block for stimulus and $finish to end.",
          "Use $display or assertions for checks.",
          "Avoid race conditions by driving on the opposite edge or using nonblocking.",
        ],
      },
      {
        title: "Synthesisability checklist",
        body: "Synthesis tools accept a subset of Verilog. Loops must have static bounds, delays are ignored, and initial blocks are generally not synthesisable (FPGA initialisation is a vendor exception).",
        bullets: [
          "No #delays in synthesisable code.",
          "Use parameters, not magic numbers.",
          "Complete every branch to avoid unintended latches.",
        ],
      },
    ],
    diagram: "rtl-flow",
    diagramCaption:
      "RTL moves through elaboration, synthesis, place and route. The Verilog you write is only the first representation; timing is closed on the final netlist, not on the source.",
    code: [
      {
        title: "Synchronous counter with enable",
        lang: "verilog",
        note: "Reset, enable and nonblocking update — a complete sequential block.",
        code: `module counter #(parameter WIDTH = 8) (
  input  wire             clk,
  input  wire             rst_n,
  input  wire             en,
  output reg  [WIDTH-1:0] count
);
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n)       count <= {WIDTH{1'b0}};
    else if (en)      count <= count + 1'b1;
  end
endmodule`,
      },
      {
        title: "Self-checking testbench",
        lang: "verilog",
        note: "Checks the counter after eight enabled cycles.",
        code: `module counter_tb;
  reg clk = 0, rst_n = 0, en = 1;
  wire [7:0] count;

  counter u_dut(.clk(clk), .rst_n(rst_n), .en(en), .count(count));

  always #5 clk = ~clk;

  initial begin
    #12 rst_n = 1;
    repeat (8) @(posedge clk);
    if (count !== 8'd8) $display("FAIL: count=%0d", count);
    else                $display("PASS: count=%0d", count);
    $finish;
  end
endmodule`,
      },
    ],
    complexity: [
      { operation: "Module instantiation", time: "Compile-time", space: "Per instance", note: "Hierarchy" },
      { operation: "Continuous assign", time: "Combinational", space: "Gates", note: "No state" },
      { operation: "Nonblocking update", time: "One edge", space: "One register", note: "Parallel semantics" },
    ],
    practice: [
      { title: "Detect a sequence", difficulty: "Medium", prompt: "Write an RTL block that asserts when the last three sampled bits are 101.", hint: "Shift register plus a comparison." },
      { title: "Pulse synchroniser", difficulty: "Medium", prompt: "Synchronise a single-cycle pulse into a slower clock domain.", hint: "Toggle in the source domain, then edge-detect in the destination." },
      { title: "Latch bug", difficulty: "Easy", prompt: "Find why a case statement infers a latch.", hint: "A missing default or uncovered branch." },
      { title: "Parameterised mux", difficulty: "Easy", prompt: "Write a 2:1 mux with WIDTH parameter using assign.", hint: "Conditional operator on a vector." },
    ],
    mistakes: [
      "Using blocking assignments for sequential state.",
      "Comparing with == instead of === in a testbench where X values matter.",
      "Forgetting a default in case statements.",
      "Thinking RTL delay is meaningful after synthesis — it is not.",
    ],
    related: [
      { label: "SystemVerilog", to: "/vlsi/systemverilog" },
      { label: "Digital Electronics", to: "/vlsi/digital-electronics" },
      { label: "Verification / UVM", to: "/vlsi/verification-uvm" },
    ],
  },
  {
    slug: "systemverilog",
    title: "SystemVerilog",
    subtitle: "Interfaces, packed types, classes, assertions and functional coverage.",
    tone: "#6a5478",
    label: "VLSI-05",
    level: "Intermediate",
    readTime: "38 min",
    stack: ["Interfaces", "Classes", "SVA", "Coverage"],
    intro: [
      "SystemVerilog extends Verilog in two directions: stronger design constructs (interfaces, structs, always_comb/always_ff) and a verification language (classes, randomised stimulus, assertions, coverage).",
      "For design, the biggest daily win is the interface: bundle related signals once, connect once, and stop mismatching port lists. For verification, the biggest win is constrained-random stimulus with coverage closure.",
    ],
    concepts: [
      {
        title: "Interfaces remove port sprawl",
        body: "An interface groups signals and modports, and can carry clocking blocks. Modules connect to an interface instead of a dozen individual ports, which reduces wiring errors and makes wide buses manageable.",
        bullets: [
          "Declare modports for master/slave roles.",
          "Clocking blocks define sampling and drive skew.",
          "Virtual interfaces let classes drive real signals.",
        ],
      },
      {
        title: "Designer-friendly constructs",
        body: "always_ff, always_comb and always_latch state intent and let tools check it. Packed structs and enums make bus layouts explicit and readable.",
        bullets: [
          "always_ff rejects blocking assignments in most tools.",
          "always_comb runs at time zero, avoiding an initial-X simulation trap.",
          "Use logic instead of reg/wire confusion in new code.",
        ],
      },
      {
        title: "Assertions",
        body: "Immediate assertions check a condition when evaluated. Concurrent assertions describe temporal behaviour over clock cycles — for example, a request must be acknowledged within three cycles.",
        bullets: [
          "A |-> B means: if A holds, B must hold on the same cycle.",
          "A |=> B means: B must hold on the next cycle.",
          "Assertions are checked in simulation and can be bound into a design without editing it.",
        ],
      },
      {
        title: "Coverage is the exit criterion",
        body: "Functional coverage records which scenarios were exercised; code coverage records which lines and branches ran. Neither alone is sufficient. Coverage closure is a deliberate review of bins, not a percentage target.",
        bullets: [
          "Cross coverage finds combinations you never intended to miss.",
          "Illegal bins make the intent explicit.",
          "100% code coverage with no functional coverage can still miss the bug.",
        ],
      },
    ],
    diagram: "sv-layers",
    diagramCaption:
      "Verification stack: stimulus (sequences), checking (scoreboard/assertions), and coverage all observe the same interface. Assertions sit closest to the design boundary.",
    code: [
      {
        title: "Interface with a clocking block",
        lang: "systemverilog",
        note: "One bundle for a simple valid/ready bus.",
        code: `interface stream_if (input logic clk);
  logic       valid;
  logic       ready;
  logic [7:0] data;

  clocking cb @(posedge clk);
    default input #1step output #1;
    input  ready;
    output valid, data;
  endclocking
endinterface`,
      },
      {
        title: "Concurrent assertion",
        lang: "systemverilog",
        note: "Every request must be acknowledged within four cycles.",
        code: `property p_req_ack;
  @(posedge clk) disable iff (!rst_n)
    req |-> ##[1:4] ack;
endproperty

assert property (p_req_ack)
  else $error("request not acknowledged within 4 cycles");`,
      },
    ],
    complexity: [
      { operation: "Interface connection", time: "Elaboration", space: "One bundle", note: "Fewer ports" },
      { operation: "Constrained random", time: "Solver dependent", space: "Per object", note: "Seed reproducibility" },
      { operation: "Assertion check", time: "Per clock", space: "Monitor state", note: "Parallel evaluation" },
    ],
    practice: [
      { title: "Write an SVA property", difficulty: "Medium", prompt: "Express: after reset deasserts, valid must not be high for two consecutive cycles.", hint: "Use !valid throughout and ##1." },
      { title: "Randomise with constraints", difficulty: "Medium", prompt: "Generate addresses in 0..255 that are multiples of 4, excluding 0.", hint: "addr % 4 == 0 inside the constraint." },
      { title: "Cover a cross", difficulty: "Medium", prompt: "Cover every combination of burst length and response type.", hint: "cross cp_len, cp_resp." },
    ],
    mistakes: [
      "Confusing |-> (same cycle) with |=> (next cycle).",
      "Sampling signals with race-prone blocking drives instead of clocking blocks.",
      "Chasing 100% coverage without reviewing whether bins are meaningful.",
      "Using always_comb with variables assigned elsewhere, creating multiple drivers.",
    ],
    related: [
      { label: "Verilog", to: "/vlsi/verilog" },
      { label: "Verification / UVM", to: "/vlsi/verification-uvm" },
      { label: "Interview questions", to: "/vlsi/interview-questions" },
    ],
  },
  {
    slug: "sta",
    title: "Static Timing Analysis",
    subtitle: "Setup, hold, slack, clocks, derates and the paths that actually matter.",
    tone: "#8a5a52",
    label: "VLSI-06",
    level: "Intermediate",
    readTime: "40 min",
    stack: ["Setup", "Hold", "Slack", "Clocks", "Corners"],
    intro: [
      "Static timing analysis checks every timing path without simulating vectors. It is exhaustive over paths and pessimistic by construction, which is exactly what signoff needs.",
      "Two checks dominate: setup (data must arrive before the capture edge plus a margin) and hold (data must remain stable after the capture edge). Fixing one can worsen the other, which is why timing closure is iterative.",
    ],
    concepts: [
      {
        title: "The setup equation",
        body: "For a launch and capture flip-flop: Tclk ≥ Tcq + Tlogic + Tsetup + Tskew. Slack is the difference between the required time and the arrival time. Negative slack is a violation.",
        bullets: [
          "Data path delay includes cell delay and net delay.",
          "Clock uncertainty models jitter and skew.",
          "Hold is checked on the same edge and is independent of clock period.",
        ],
      },
      {
        title: "Clock constraints",
        body: "create_clock defines period and waveform. Generated clocks describe dividers and PLL outputs. Input/output delays constrain the boundary. False paths and multicycle paths must be justified, never used to hide real violations.",
        bullets: [
          "Unconstrained paths are not checked — missing constraints are a signoff risk.",
          "Clock groups express asynchronous relationships.",
          "I/O timing depends on the external device's specification.",
        ],
      },
      {
        title: "Corners and derates",
        body: "Delay varies with process, voltage and temperature. Setup is worst at slow process, low voltage and high temperature; hold is worst at fast process, high voltage and low temperature. On-chip variation derates model local differences.",
        bullets: [
          "The number of signoff corners grows with technology nodes.",
          "AOCV/POCV replace a single flat derate with path-depth-aware margins.",
          "Always report the corner alongside slack.",
        ],
      },
      {
        title: "Fixing violations",
        body: "Setup fixes: upsize cells, shorten the path with logic restructuring, reduce fanout, or move logic earlier. Hold fixes: add delay buffers, downsize drivers, or route longer. Every fix has area and power cost.",
        bullets: [
          "Insert hold buffers only after setup is reasonably closed.",
          "Retiming changes sequential boundaries and needs formal equivalence checking.",
          "Use useful skew deliberately, not accidentally.",
        ],
      },
    ],
    diagram: "timing-path",
    diagramCaption:
      "Launch flop → combinational cloud → capture flop. Setup compares arrival at the capture pin with the required time; hold checks that the same data does not change too early.",
    code: [
      {
        title: "SDC constraints",
        lang: "tcl",
        note: "A minimal clock plus I/O constraint set. Real constraint files are much larger.",
        code: `create_clock -name core_clk -period 2.0 [get_ports clk]
set_clock_uncertainty 0.08 [get_clocks core_clk]

set_input_delay  -clock core_clk 0.4 [remove_from_collection [all_inputs] [get_ports clk]]
set_output_delay -clock core_clk 0.4 [all_outputs]

set_false_path -from [get_ports rst_n]
report_timing -delay_type max -max_paths 20
report_timing -delay_type min -max_paths 20`,
      },
    ],
    complexity: [
      { operation: "Path enumeration", time: "O(paths)", space: "O(nodes)", note: "Pruned by graph analysis" },
      { operation: "Setup check", time: "Per endpoint", space: "Per path", note: "Max delay" },
      { operation: "Hold check", time: "Per endpoint", space: "Per path", note: "Min delay" },
      { operation: "Full signoff", time: "Hours", space: "Large reports", note: "Multiple corners" },
    ],
    practice: [
      { title: "Slack arithmetic", difficulty: "Easy", prompt: "Tclk=2ns, Tcq=0.25, Tlogic=1.3, Tsetup=0.15, skew=0.1. Compute setup slack.", hint: "Slack = Tclk − (sum of path terms)." },
      { title: "Hold reasoning", difficulty: "Medium", prompt: "Why does a faster data path make hold violations worse?", hint: "Data can arrive too soon after the capture edge." },
      { title: "Constraint audit", difficulty: "Medium", prompt: "A path is unconstrained. What report reveals it and what should you do?", hint: "check_timing; add the missing clock or I/O constraint." },
      { title: "Corner selection", difficulty: "Hard", prompt: "Explain why hold is checked at a fast corner and setup at a slow corner.", hint: "Delay extremes relative to the clock edge." },
    ],
    mistakes: [
      "Fixing hold before setup is stable, then undoing the setup fix.",
      "Using false paths to silence violations that are real.",
      "Reporting slack without naming the corner and the path.",
      "Assuming clock skew is always harmful — useful skew is a legitimate technique.",
    ],
    related: [
      { label: "Physical Design", to: "/vlsi/physical-design" },
      { label: "CMOS", to: "/vlsi/cmos" },
      { label: "Cheat sheets", to: "/vlsi/cheat-sheets" },
    ],
  },
  {
    slug: "physical-design",
    title: "Physical Design",
    subtitle: "Floorplan, placement, clock tree, routing, DRC/LVS and signoff.",
    tone: "#41617a",
    label: "VLSI-07",
    level: "Advanced",
    readTime: "42 min",
    stack: ["Floorplan", "Placement", "CTS", "Routing", "Signoff"],
    intro: [
      "Physical design turns a gate-level netlist into a manufacturable layout. Every stage trades area, timing, power and routability against the others; the job is to converge on a design that closes at every corner without breaking the rules.",
      "The flow is iterative. A routing detour changes parasitics, which changes timing, which may force a placement change. Understanding the dependencies is more valuable than memorising tool menus.",
    ],
    concepts: [
      {
        title: "Floorplan and power",
        body: "The floorplan sets die size, macro placement, I/O positions and the power grid. Macro placement has an outsized effect on congestion and timing; a poor floorplan cannot be fixed by later stages.",
        bullets: [
          "Keep macros near their logical neighbours and away from high-fanout regions.",
          "Build a robust power grid before detailed placement.",
          "Leave routing channels and keep-out margins around macros.",
        ],
      },
      {
        title: "Placement",
        body: "Global placement spreads cells to minimise wirelength while respecting density; detailed placement legalises onto rows. Congestion and timing-driven placement weight critical nets more heavily.",
        bullets: [
          "Utilisation above roughly 85% usually makes routing painful.",
          "Check congestion maps before committing to detailed routing.",
          "Timing-driven placement needs accurate constraints from the start.",
        ],
      },
      {
        title: "Clock tree synthesis",
        body: "CTS builds a buffered tree that distributes the clock with controlled skew and insertion delay. Clock buffers add area and power but are necessary for a usable clock.",
        bullets: [
          "Minimise skew between related flops; do not minimise insertion delay alone.",
          "Useful skew can buy setup margin on critical paths.",
          "Clock gating cells must be placed and timed as part of the tree.",
        ],
      },
      {
        title: "Routing and signoff",
        body: "Global routing assigns nets to regions; detailed routing assigns tracks and vias. DRC checks spacing, width and via rules; LVS checks that the layout matches the netlist. Both must be clean before tapeout.",
        bullets: [
          "Antenna, electromigration and IR-drop checks are signoff items too.",
          "Extraction produces parasitics for post-layout STA.",
          "ECO flows fix late violations without a full re-run.",
        ],
      },
    ],
    diagram: "floorplan",
    diagramCaption:
      "A simplified floorplan: macros around the edges, standard-cell rows in the core, power stripes across the block, and I/O pins on the boundary.",
    code: [
      {
        title: "Typical flow checkpoints",
        lang: "text",
        note: "Names vary by vendor; the order and dependencies do not.",
        code: `1. read netlist + constraints + libraries
2. floorplan (die size, macros, power grid)
3. placement (global + detailed + legalise)
4. CTS (build clock tree, re-time clock nets)
5. route (global + detailed + DRC clean)
6. extract parasitics (SPEF) -> post-route STA
7. signoff: DRC, LVS, IR drop, EM, antenna
8. ECO for remaining violations -> re-verify`,
      },
    ],
    complexity: [
      { operation: "Floorplan", time: "Minutes to hours", space: "Die area", note: "Macro decisions dominate" },
      { operation: "Placement", time: "Hours", space: "Cell area", note: "Congestion vs timing" },
      { operation: "CTS", time: "Hours", space: "Clock buffers", note: "Skew and power" },
      { operation: "Routing", time: "Hours to days", space: "Tracks and vias", note: "DRC closure" },
    ],
    practice: [
      { title: "Utilisation decision", difficulty: "Easy", prompt: "Why does very high utilisation increase routing congestion?", hint: "Fewer free tracks between cells." },
      { title: "Macro placement", difficulty: "Medium", prompt: "Where would you place a large SRAM feeding a datapath?", hint: "Adjacent to the consuming logic, with pins facing it." },
      { title: "Clock skew", difficulty: "Medium", prompt: "Why is zero skew not always the goal?", hint: "Useful skew can relax a critical setup path." },
      { title: "ECO", difficulty: "Hard", prompt: "When is an ECO preferable to a full re-run?", hint: "Late, localised fixes with limited scope and schedule pressure." },
    ],
    mistakes: [
      "Starting placement with an unrealistic floorplan or missing constraints.",
      "Ignoring congestion until detailed routing fails.",
      "Optimising clock insertion delay rather than skew.",
      "Signing off with unconstrained paths or stale parasitics.",
    ],
    related: [
      { label: "STA", to: "/vlsi/sta" },
      { label: "DFT", to: "/vlsi/dft" },
      { label: "Interview questions", to: "/vlsi/interview-questions" },
    ],
  },
  {
    slug: "dft",
    title: "Design for Test",
    subtitle: "Fault models, scan insertion, ATPG, compression and JTAG.",
    tone: "#7a5a3c",
    label: "VLSI-08",
    level: "Advanced",
    readTime: "32 min",
    stack: ["Fault models", "Scan", "ATPG", "JTAG"],
    intro: [
      "A manufactured chip can contain defects that no functional test vector ever excites. Design for test makes internal state controllable and observable so automatic test equipment can detect those defects quickly.",
      "Scan is the backbone: flip-flops are chained into shift registers in test mode. ATPG then generates patterns that shift in stimulus, capture the combinational response, and shift out the result.",
    ],
    concepts: [
      {
        title: "Fault models",
        body: "Stuck-at faults model a node permanently 0 or 1. Transition faults model slow-to-rise/fall. Bridging faults model shorts. Cell-aware models use layout-aware defect analysis. No model is reality, but coverage of good models correlates with quality.",
        bullets: [
          "Stuck-at coverage is the traditional baseline.",
          "At-speed testing catches delay defects that stuck-at misses.",
          "Fault coverage is measured over the modelled fault list.",
        ],
      },
      {
        title: "Scan chains",
        body: "Each scan flop has a multiplexer selecting functional data or scan data. Chains trade a small area and delay penalty for massively improved controllability and observability.",
        bullets: [
          "Balance chain lengths to reduce test time.",
          "Scan enables must be carefully timed and constrained.",
          "Lock-up latches handle clock domain boundaries in chains.",
        ],
      },
      {
        title: "ATPG and compression",
        body: "ATPG searches for input patterns that propagate a fault effect to an observable output. On large designs, test data volume explodes, so on-chip compression (EDT) broadcasts to many internal chains from few external pins.",
        bullets: [
          "Untestable faults should be analysed, not silently ignored.",
          "X-sources (uninitialised memory, analog blocks) reduce coverage — mask them deliberately.",
          "Test power can cause false failures; manage shift and capture power.",
        ],
      },
    ],
    diagram: "scan-chain",
    diagramCaption:
      "Scan flops are daisy-chained. In shift mode the chain loads stimulus serially; in capture mode the functional logic updates; then the chain shifts results out for comparison.",
    code: [
      {
        title: "Scan-ready flop (conceptual)",
        lang: "verilog",
        note: "The mux is normally inserted by the scan tool; this shows the structure.",
        code: `module scan_dff (
  input  wire clk, rst_n, se, si, d,
  output reg  q
);
  wire din = se ? si : d;
  always @(posedge clk or negedge rst_n)
    if (!rst_n) q <= 1'b0;
    else        q <= din;
endmodule`,
      },
    ],
    complexity: [
      { operation: "Shift cycle", time: "Chain length", space: "One bit per flop", note: "Serial" },
      { operation: "Capture cycle", time: "One clock", space: "Functional logic", note: "At-speed possible" },
      { operation: "ATPG runtime", time: "Design dependent", space: "Fault list", note: "NP-hard in general" },
    ],
    practice: [
      { title: "Coverage reading", difficulty: "Easy", prompt: "A report says 98% stuck-at coverage. What else must you check?", hint: "Untested faults, X-masking and transition coverage." },
      { title: "Scan chain balance", difficulty: "Medium", prompt: "Why are unequal chain lengths a problem?", hint: "Total shift time is set by the longest chain." },
      { title: "Test power", difficulty: "Hard", prompt: "Why can scan capture cause IR drop failures?", hint: "Many flops switch simultaneously." },
    ],
    mistakes: [
      "Reporting stuck-at coverage as if it were complete defect coverage.",
      "Ignoring X-sources that silently reduce effective coverage.",
      "Forgetting to constrain scan enable paths in STA.",
      "Testing only at slow speed for a design that must meet at-speed specs.",
    ],
    related: [
      { label: "Physical Design", to: "/vlsi/physical-design" },
      { label: "STA", to: "/vlsi/sta" },
      { label: "Cheat sheets", to: "/vlsi/cheat-sheets" },
    ],
  },
  {
    slug: "verification-uvm",
    title: "Verification / UVM",
    subtitle: "Agents, sequences, drivers, monitors, scoreboards and coverage closure.",
    tone: "#6a5478",
    label: "VLSI-09",
    level: "Advanced",
    readTime: "40 min",
    stack: ["UVM", "Sequences", "Scoreboard", "Coverage"],
    intro: [
      "Verification is usually the largest part of a modern SoC project. UVM is a methodology and class library that standardises how stimulus is generated, driven, observed and checked.",
      "The core idea is separation: a sequence does not know how signals are timed, a driver does not know what scenario is being tested, and a scoreboard does not trust either — it predicts the result independently.",
    ],
    concepts: [
      {
        title: "The component graph",
        body: "A UVM test builds an environment. The environment contains agents (driver, sequencer, monitor), a scoreboard, and coverage collectors. Agents can be active (drive + observe) or passive (observe only).",
        bullets: [
          "Driver converts transactions to pin-level activity.",
          "Monitor converts pin activity back into transactions.",
          "Scoreboard compares observed transactions with a reference model.",
        ],
      },
      {
        title: "Phases and objections",
        body: "UVM phases run in order: build, connect, run, check, report. The run phase is task-based and concurrent. Objections raise and drop to keep simulation alive until all stimulus and checking finish.",
        bullets: [
          "Raise an objection before starting time-consuming work.",
          "Never drop an objection before the last check completes.",
          "Reset behaviour must be modelled explicitly in every component.",
        ],
      },
      {
        title: "Sequences and virtual sequences",
        body: "A sequence produces transaction items and sends them to a sequencer. Virtual sequences coordinate multiple agents to create system-level scenarios such as a bus read while an interrupt fires.",
        bullets: [
          "Use `uvm_do macros or start_item/finish_item explicitly.",
          "Constraints belong in transaction classes; scenarios belong in sequences.",
          "Keep sequences independent so they can be reused.",
        ],
      },
      {
        title: "Coverage closure",
        body: "Coverage is a map of what has been tested. Functional coverage groups check intent; cross coverage checks combinations. Closure is reached by adding constrained-random seeds or directed sequences to hit missing bins.",
        bullets: [
          "Review uncovered bins — some may be unreachable by design.",
          "Illegal bins must be declared, not ignored.",
          "Coverage without assertions misses internal protocol violations.",
        ],
      },
    ],
    diagram: "uvm-layers",
    diagramCaption:
      "Stimulus flows sequence → sequencer → driver into the DUT; the monitor observes pins and feeds both the scoreboard and coverage. Checking and coverage are independent consumers of the same observed stream.",
    code: [
      {
        title: "A minimal UVM agent",
        lang: "systemverilog",
        note: "Structure first; the driver body is where pin timing lives.",
        code: `class my_agent extends uvm_agent;
  \`uvm_component_utils(my_agent)

  my_driver    drv;
  my_monitor   mon;
  uvm_sequencer #(my_item) seqr;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    mon = my_monitor::type_id::create("mon", this);
    if (get_is_active() == UVM_ACTIVE) begin
      drv  = my_driver::type_id::create("drv", this);
      seqr = uvm_sequencer#(my_item)::type_id::create("seqr", this);
    end
  endfunction

  function void connect_phase(uvm_phase phase);
    if (get_is_active() == UVM_ACTIVE)
      drv.seq_item_port.connect(seqr.seq_item_export);
  endfunction
endclass`,
      },
    ],
    complexity: [
      { operation: "Sequence item", time: "Zero simulation time", space: "One object", note: "Created per item" },
      { operation: "Driver handshake", time: "Pin timing", space: "Per transaction", note: "Protocol dependent" },
      { operation: "Scoreboard check", time: "Per observed item", space: "Queues", note: "Reference model" },
    ],
    practice: [
      { title: "Active vs passive agent", difficulty: "Easy", prompt: "When would you instantiate a passive agent?", hint: "Observing an interface you must not drive." },
      { title: "Objection bug", difficulty: "Medium", prompt: "Simulation ends before the scoreboard checks. What is the likely cause?", hint: "The objection was dropped too early." },
      { title: "Coverage closure", difficulty: "Medium", prompt: "A cross bin is never hit. Give two legitimate responses.", hint: "Add a directed sequence, or prove the bin is illegal." },
    ],
    mistakes: [
      "Putting scenario knowledge inside the driver.",
      "Checking results in the monitor instead of a separate scoreboard.",
      "Ending simulation when stimulus finishes rather than when checking finishes.",
      "Treating 100% coverage as proof of correctness.",
    ],
    related: [
      { label: "SystemVerilog", to: "/vlsi/systemverilog" },
      { label: "Verilog", to: "/vlsi/verilog" },
      { label: "Interview questions", to: "/vlsi/interview-questions" },
    ],
  },
];

export const vlsiRoadmapStages = [
  {
    stage: "Stage 01",
    title: "Electrical foundations",
    description: "Devices, gates and the MOS switch. Without this, timing and layout are vocabulary without meaning.",
    topics: [
      { label: "Digital electronics", to: "/vlsi/digital-electronics" },
      { label: "Analog electronics", to: "/vlsi/analog-electronics" },
    ],
    prerequisite: "Basic circuit theory",
  },
  {
    stage: "Stage 02",
    title: "CMOS & standard cells",
    description: "The inverter, noise margins, power and sizing. Learn why standard-cell libraries look the way they do.",
    topics: [{ label: "CMOS", to: "/vlsi/cmos" }],
    prerequisite: "Stage 01",
  },
  {
    stage: "Stage 03",
    title: "RTL design",
    description: "Verilog first, then SystemVerilog. Focus on synthesisable style, interfaces and assertions.",
    topics: [
      { label: "Verilog", to: "/vlsi/verilog" },
      { label: "SystemVerilog", to: "/vlsi/systemverilog" },
    ],
    prerequisite: "Stage 02",
  },
  {
    stage: "Stage 04",
    title: "Timing",
    description: "Constraints, setup/hold and corners. Timing is the language in which physical decisions are justified.",
    topics: [{ label: "Static timing analysis", to: "/vlsi/sta" }],
    prerequisite: "Stage 03",
  },
  {
    stage: "Stage 05",
    title: "Implementation",
    description: "Floorplan to signoff: placement, clock trees, routing and the checks that gate tapeout.",
    topics: [
      { label: "Physical design", to: "/vlsi/physical-design" },
      { label: "Design for test", to: "/vlsi/dft" },
    ],
    prerequisite: "Stage 04",
  },
  {
    stage: "Stage 06",
    title: "Verification",
    description: "UVM methodology, coverage and the discipline of independent checking.",
    topics: [
      { label: "Verification / UVM", to: "/vlsi/verification-uvm" },
      { label: "Interview questions", to: "/vlsi/interview-questions" },
    ],
    prerequisite: "Stage 03",
  },
];

export const vlsiInterviewQuestions = [
  {
    topic: "Digital & CMOS",
    items: [
      { q: "Why is NAND preferred over AND in CMOS?", a: "A static CMOS gate is inverting by construction. An AND is a NAND followed by an inverter, costing more area and delay." },
      { q: "What sets the switching threshold of an inverter?", a: "The beta ratio (W/L and mobility) of the NMOS and PMOS. Making PMOS roughly 2–3× wider balances the trip point." },
      { q: "Latches vs flip-flops?", a: "A latch is level-sensitive and transparent while enabled; a flip-flop is edge-triggered. Edge-triggered design gives a simpler timing model." },
      { q: "Where does dynamic power go?", a: "Charging and discharging node capacitance: P = αCV²f, plus short-circuit current during transitions." },
    ],
  },
  {
    topic: "Verilog / SystemVerilog",
    items: [
      { q: "Why nonblocking assignments in sequential blocks?", a: "They model all flops sampling old values at the edge, avoiding order-dependent races between registers." },
      { q: "What infers a latch?", a: "A combinational always block where some input combination does not assign the output, forcing the tool to hold the previous value." },
      { q: "Difference between |-> and |=>?", a: "|-> requires the consequent in the same cycle; |=> requires it in the next cycle." },
      { q: "What is a virtual interface?", a: "A class handle to a real interface instance, letting verification classes drive and sample design signals." },
    ],
  },
  {
    topic: "STA",
    items: [
      { q: "Write the setup inequality.", a: "Tclk ≥ Tcq + Tcomb + Tsetup + Tskew (plus uncertainty), with slack = required − arrival." },
      { q: "Why is hold independent of clock period?", a: "Hold compares data arrival against the same capture edge; it does not involve the next edge." },
      { q: "Setup and hold corners?", a: "Setup is worst at slow process/low voltage/high temperature; hold is worst at fast process/high voltage/low temperature." },
      { q: "What is useful skew?", a: "Deliberately delaying a capture clock to give a critical data path more time, within hold and clock-tree limits." },
    ],
  },
  {
    topic: "Physical Design",
    items: [
      { q: "What dominates floorplan quality?", a: "Macro placement, pin assignment and power-grid planning — later stages can only work within those decisions." },
      { q: "Why does utilisation affect routability?", a: "Higher cell density leaves fewer routing tracks, increasing detours and congestion." },
      { q: "What does CTS optimise?", a: "Skew, insertion delay and clock-tree power while meeting slew and DRC constraints." },
      { q: "DRC vs LVS?", a: "DRC checks geometric manufacturing rules; LVS checks that the extracted layout connectivity matches the netlist." },
    ],
  },
  {
    topic: "DFT & Verification",
    items: [
      { q: "What is scan insertion?", a: "Replacing functional flops with scan flops and chaining them so state can be shifted in and out during test." },
      { q: "Why is stuck-at coverage not enough?", a: "It misses delay, bridging and cell-internal defects; transition and cell-aware models add coverage." },
      { q: "Why separate driver and monitor?", a: "The monitor observes actual pins independently, so checking does not rely on what the driver intended." },
      { q: "When is coverage closure complete?", a: "When all meaningful bins are hit or explicitly justified as illegal/unreachable, with assertions passing." },
    ],
  },
];

export const vlsiCheatSheets = [
  {
    title: "CMOS & power",
    rows: [
      ["Dynamic power", "α · C · V² · f"],
      ["Propagation delay", "≈ 0.69 · R · C"],
      ["Noise margin high", "VOH − VIH"],
      ["Noise margin low", "VIL − VOL"],
      ["Inverter threshold", "Set by beta ratio"],
      ["Leakage", "Grows at fast corner, high temp"],
    ],
  },
  {
    title: "Timing",
    rows: [
      ["Setup", "Data stable before capture edge"],
      ["Hold", "Data stable after capture edge"],
      ["Slack", "Required time − arrival time"],
      ["Setup corner", "Slow / low V / high T"],
      ["Hold corner", "Fast / high V / low T"],
      ["OCV", "On-chip variation derate"],
    ],
  },
  {
    title: "Flow order",
    rows: [
      ["1", "RTL + constraints"],
      ["2", "Synthesis"],
      ["3", "Floorplan + power"],
      ["4", "Placement"],
      ["5", "CTS"],
      ["6", "Routing"],
      ["7", "Extraction + STA"],
      ["8", "DRC / LVS / signoff"],
    ],
  },
];
