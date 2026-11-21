/** Quiz bank, daily challenges, blog articles and practice data. */

export const quizzes = [
  {
    id: "dsa-core",
    title: "DSA Core Concepts",
    subject: "DSA",
    level: "Foundation",
    minutes: 10,
    description: "Complexity, arrays, linked lists and the core structure behaviour you should know cold.",
    questions: [
      {
        q: "What is the worst-case time complexity of binary search on a sorted array of n elements?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 1,
        explanation: "Each comparison halves the candidate range, so at most ⌈log₂(n+1)⌉ comparisons are needed.",
      },
      {
        q: "Which structure gives O(1) insertion at the head with no shifting?",
        options: ["Array", "Singly linked list", "Sorted array", "Binary heap"],
        answer: 1,
        explanation: "A linked list only rewires one pointer. An array must shift every following element.",
      },
      {
        q: "A monotonic stack solves which class of problems most directly?",
        options: ["Shortest path in weighted graphs", "Next greater element", "All-pairs connectivity", "Balanced tree insertion"],
        answer: 1,
        explanation: "A monotonic stack maintains an ordered set of candidates and resolves them when a larger (or smaller) value appears.",
      },
      {
        q: "What does a queue guarantee in an unweighted graph traversal?",
        options: ["Minimum spanning tree", "Nodes are visited in increasing distance", "All edges are visited twice", "The graph is acyclic"],
        answer: 1,
        explanation: "BFS processes in FIFO order, so the first time a node is reached is via a shortest path in edge count.",
      },
      {
        q: "Which traversal of a binary search tree yields sorted values?",
        options: ["Preorder", "Inorder", "Postorder", "Level order"],
        answer: 1,
        explanation: "Inorder visits left subtree, node, right subtree — smaller, equal, larger.",
      },
      {
        q: "Why must knapsack capacity be iterated backwards in the 1D 0/1 DP?",
        options: ["To save memory", "To prevent reusing the same item", "To sort the items", "To avoid integer overflow"],
        answer: 1,
        explanation: "Forward iteration would read a state already updated with the current item, effectively allowing unlimited use.",
      },
      {
        q: "What is the space complexity of an iterative linked list reversal?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 0,
        explanation: "Only three pointers are maintained regardless of list length.",
      },
      {
        q: "Which statement about hash map lookup is correct?",
        options: ["Worst case is O(1)", "Average case is O(1)", "It requires sorted keys", "It is always O(log n)"],
        answer: 1,
        explanation: "Average lookup is O(1); worst case can degrade to O(n) with heavy collisions.",
      },
    ],
  },
  {
    id: "vlsi-fundamentals",
    title: "VLSI Fundamentals",
    subject: "VLSI",
    level: "Foundation",
    minutes: 10,
    description: "CMOS behaviour, Verilog semantics and timing basics for a first technical screen.",
    questions: [
      {
        q: "Why does a static CMOS gate draw very little steady-state current?",
        options: ["Both networks always conduct", "One of the pull-up/pull-down networks is off", "The clock is stopped", "Transistors are ideal switches"],
        answer: 1,
        explanation: "In a valid input state either the pull-up or the pull-down path is off, leaving only leakage.",
      },
      {
        q: "Which assignment should be used inside an edge-triggered always block?",
        options: ["Blocking =", "Nonblocking <=", "Continuous assign", "Either, always"],
        answer: 1,
        explanation: "Nonblocking assignments model all registers sampling old values at the edge.",
      },
      {
        q: "What causes a latch to be inferred in synthesis?",
        options: ["A clock divider", "An incomplete assignment in a combinational block", "A parameterised module", "Using wire instead of reg"],
        answer: 1,
        explanation: "If some input combination does not assign the output, the tool must hold the previous value.",
      },
      {
        q: "Setup slack is computed as:",
        options: ["Arrival − required", "Required − arrival", "Clock period + skew", "Tsetup − Tcq"],
        answer: 1,
        explanation: "Slack is the margin by which the required time exceeds the arrival time; negative slack violates setup.",
      },
      {
        q: "At which corner is hold timing usually worst?",
        options: ["Slow process, low voltage, high temperature", "Fast process, high voltage, low temperature", "Typical corner", "Any corner equally"],
        answer: 1,
        explanation: "Fast data paths race the capture edge, so hold is checked at the fast corner.",
      },
      {
        q: "What does CTS stand for and do?",
        options: ["Clock Tree Synthesis — distributes the clock with controlled skew", "Cell Timing Scan — checks flops", "Clock Test Setup — verifies reset", "Circuit Trace Simulation — models routing"],
        answer: 0,
        explanation: "Clock tree synthesis builds a buffered clock distribution network and controls skew and insertion delay.",
      },
      {
        q: "Which is true of scan testing?",
        options: ["It replaces functional verification", "It improves controllability and observability of internal state", "It removes the need for timing constraints", "It only works on analog blocks"],
        answer: 1,
        explanation: "Scan chains let test equipment shift state in and out, making internal nodes controllable and observable.",
      },
      {
        q: "A concurrent assertion req |=> ack means:",
        options: ["ack in the same cycle as req", "ack in the cycle after req", "ack within four cycles", "ack never follows req"],
        answer: 1,
        explanation: "|=> requires the consequent in the next clock cycle; |-> would require the same cycle.",
      },
    ],
  },
  {
    id: "python-basics",
    title: "Python for Problem Solving",
    subject: "Programming",
    level: "Beginner",
    minutes: 8,
    description: "Lists, dictionaries, slicing and the small idioms that keep solution code readable.",
    questions: [
      {
        q: "What does list[-1] return?",
        options: ["An error", "The first element", "The last element", "None"],
        answer: 2,
        explanation: "Negative indices count from the end in Python.",
      },
      {
        q: "Which dictionary method returns a default without raising KeyError?",
        options: ["d[key]", "d.get(key, default)", "d.pop()", "d.keys()"],
        answer: 1,
        explanation: "get returns the supplied default when the key is absent.",
      },
      {
        q: "What is the time complexity of appending to a Python list?",
        options: ["O(1) amortised", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
        explanation: "Dynamic arrays occasionally resize, but the amortised cost of append is O(1).",
      },
      {
        q: "Which comprehension builds a list of squares for even numbers?",
        options: ["[x*x for x in xs if x % 2 == 0]", "[x for x in xs if x*x]", "{x*x: xs}", "map(xs, x*x)"],
        answer: 0,
        explanation: "The filter clause selects even x before applying the expression.",
      },
      {
        q: "How do you create an independent shallow copy of a list?",
        options: ["b = a", "b = a[:]", "b = list(a, copy)", "b = a.copy(deep=True)"],
        answer: 1,
        explanation: "Slicing creates a new list; plain assignment only aliases the same object.",
      },
    ],
  },
];

export const dailyChallenges = [
  {
    title: "Reverse words in a sentence",
    subject: "DSA",
    topic: "Strings",
    difficulty: "Easy",
    instructions: "Reverse the order of words while keeping each word intact. Collapse extra spaces.",
    question: "For the input \"  the sky is  blue  \", what is the correct output?",
    options: ["\"blue is sky the\"", "\"eulb si yks eht\"", "\"the sky is blue\"", "\"blue  is sky the\""],
    answer: 0,
    explanation: "Split on whitespace, reverse the word list, and join with single spaces.",
  },
  {
    title: "Spot the latch",
    subject: "VLSI",
    topic: "Verilog",
    difficulty: "Medium",
    instructions: "Read the always block and identify the synthesis consequence.",
    question: "always @(*) begin if (en) y = d; end — what does synthesis infer for y?",
    options: ["A flip-flop", "A latch", "A wire with no storage", "A combinational mux only"],
    answer: 1,
    explanation: "When en is low, y is not assigned, so the tool must hold its previous value: a level-sensitive latch.",
  },
  {
    title: "Slack arithmetic",
    subject: "VLSI",
    topic: "STA",
    difficulty: "Medium",
    instructions: "Use the setup inequality. All values are in nanoseconds.",
    question: "Tclk = 2.0, Tcq = 0.25, Tcomb = 1.40, Tsetup = 0.15, skew = 0.10. What is the setup slack?",
    options: ["0.10 ns", "0.20 ns", "0.00 ns", "−0.10 ns"],
    answer: 0,
    explanation: "Slack = 2.0 − (0.25 + 1.40 + 0.15 + 0.10) = 0.10 ns.",
  },
  {
    title: "Two-pointer water",
    subject: "DSA",
    topic: "Arrays",
    difficulty: "Medium",
    instructions: "Reason about which pointer can be moved without losing the optimum.",
    question: "In container-with-most-water, after comparing heights at both ends, which pointer should move?",
    options: ["The taller one", "The shorter one", "Both", "Neither"],
    answer: 1,
    explanation: "The area is limited by the shorter line; moving it is the only move that can possibly increase area.",
  },
  {
    title: "Traversal order",
    subject: "DSA",
    topic: "Trees",
    difficulty: "Easy",
    instructions: "Consider the tree: root 2, left 1, right 3.",
    question: "What is the postorder traversal of this tree?",
    options: ["2 1 3", "1 2 3", "1 3 2", "3 2 1"],
    answer: 2,
    explanation: "Postorder is left → right → node: 1, 3, 2.",
  },
  {
    title: "Nonblocking semantics",
    subject: "VLSI",
    topic: "SystemVerilog",
    difficulty: "Medium",
    instructions: "Two registers swap values in one always block.",
    question: "always @(posedge clk) begin a <= b; b <= a; end — what happens?",
    options: ["a and b always become equal", "a and b swap values", "Only a updates", "Synthesis fails"],
    answer: 1,
    explanation: "Both right-hand sides are sampled before either update, so the old values are exchanged.",
  },
  {
    title: "Cycle detection",
    subject: "DSA",
    topic: "Graphs",
    difficulty: "Hard",
    instructions: "Kahn's algorithm removes nodes with in-degree zero.",
    question: "Kahn's algorithm processes 7 of 9 nodes. What can you conclude?",
    options: ["The graph is disconnected", "There is a cycle among the remaining nodes", "The graph is a tree", "All edges are weighted"],
    answer: 1,
    explanation: "If fewer than V nodes are emitted, the remaining subgraph has no zero in-degree node — a cycle.",
  },
  {
    title: "Noise margins",
    subject: "VLSI",
    topic: "CMOS",
    difficulty: "Medium",
    instructions: "Use NMH = VOH − VIH and NML = VIL − VOL.",
    question: "VOH=0.90, VIH=0.62, VIL=0.35, VOL=0.05. What are NMH and NML?",
    options: ["0.28 V and 0.30 V", "0.55 V and 0.30 V", "0.28 V and 0.40 V", "0.90 V and 0.05 V"],
    answer: 0,
    explanation: "NMH = 0.90 − 0.62 = 0.28 V; NML = 0.35 − 0.05 = 0.30 V.",
  },
  {
    title: "Prefix sums",
    subject: "DSA",
    topic: "Arrays",
    difficulty: "Easy",
    instructions: "A prefix array P has P[0]=0 and P[i] = sum of the first i elements.",
    question: "For a = [3, 1, 4, 1, 5], what is the sum of a[1..3]?",
    options: ["6", "9", "5", "8"],
    answer: 0,
    explanation: "a[1]+a[2]+a[3] = 1 + 4 + 1 = 6, or P[4] − P[1] = 9 − 3.",
  },
  {
    title: "UVM checking",
    subject: "VLSI",
    topic: "Verification",
    difficulty: "Medium",
    instructions: "Think about which component should compare results.",
    question: "Where should observed DUT results be compared against predicted values?",
    options: ["In the driver", "In the sequence", "In the scoreboard", "In the clocking block"],
    answer: 2,
    explanation: "The scoreboard owns checking and compares monitor output with an independent reference.",
  },
];

export const blogPosts = [
  {
    slug: "why-skeuomorphic-learning",
    title: "Why a study desk beats another dashboard",
    category: "Design",
    date: "2026-11-12",
    readTime: "6 min",
    excerpt:
      "Physical study objects carry expectations: a notebook invites writing, a shelf invites browsing, a calendar page invites a daily habit. We borrowed those expectations for NuralPath.",
    body: [
      {
        h: "Objects teach behaviour",
        p: "A dashboard tells you what happened. A notebook tells you what to do next. The difference is not decoration — it is affordance. When progress lives in a bound journal with bookmarks, unfinished stages feel like an open page rather than a metric.",
      },
      {
        h: "Materials have to earn their place",
        p: "Wood behind every section becomes noise. We use wood for the desk and shelf, paper for content, metal only for controls that should feel engineered, and leather only for roadmap covers. Each material signals a different kind of object, so the interface stays legible.",
      },
      {
        h: "Dark mode is a different room",
        p: "A nighttime study desk is not an inverted photograph. Charcoal, graphite and dark wood replace cream and paper; the accent has to glow slightly instead of absorbing light. We tune both themes separately and keep the same information hierarchy.",
      },
      {
        h: "Restraint is the hard part",
        p: "Every skeuomorphic detail costs contrast, load time or attention. If an effect does not communicate interaction or structure, it is removed. That rule is why the pages still read like a product rather than a diorama.",
      },
    ],
  },
  {
    slug: "learning-dsa-with-a-visualizer",
    title: "A visualizer is only useful if its states are real",
    category: "Learning",
    date: "2026-11-05",
    readTime: "8 min",
    excerpt:
      "Animations that look plausible but do not correspond to an actual algorithm state teach the wrong lesson. Here is how the DSA instrument on NuralPath is built.",
    body: [
      {
        h: "Build the frames first",
        p: "Each algorithm runs once and emits a list of frames: the array, the indices being compared, the region already final, and a sentence describing the decision. Playback only moves an index into that list, so stepping backwards shows a state that genuinely existed.",
      },
      {
        h: "Deterministic beats flashy",
        p: "Random swap animations are easier to write and worse to learn from. Binary search in particular must show lo, hi and mid honestly, because the common bugs are boundary bugs.",
      },
      {
        h: "Separate instruments for separate structures",
        p: "Sorting is an array instrument. Stack and queue behaviour is a push/pop instrument. Tree and graph traversals are visit-order instruments. Forcing all of them into one animation would blur exactly the distinctions students need.",
      },
      {
        h: "Read the invariant",
        p: "The caption under each instrument states the invariant, not just the algorithm name. If a learner can describe what is always true between steps, they can reconstruct the code.",
      },
    ],
  },
  {
    slug: "verilog-habits",
    title: "Five Verilog habits that survive synthesis",
    category: "VLSI",
    date: "2026-10-28",
    readTime: "7 min",
    excerpt:
      "Most RTL bugs are not exotic. They are assignment style, incomplete branches and a testbench that agrees with the bug.",
    body: [
      {
        h: "Write intent, not simulation order",
        p: "Use always_ff for state, always_comb for logic, and nonblocking assignments for registers. If a block mixes both styles, stop and split it.",
      },
      {
        h: "Make every branch explicit",
        p: "A missing else or default is not a shortcut. In combinational logic it is storage you did not ask for. In sequential logic it is a state you did not define.",
      },
      {
        h: "Check your own outputs",
        p: "A testbench that only waves at a waveform is a demo, not a test. Add expected values and a pass/fail message; future you will thank present you.",
      },
      {
        h: "Constrain before you trust timing",
        p: "Synthesis timing means little if clocks and I/O delays are missing. Run a constraint check early — unconstrained paths are invisible failures.",
      },
      {
        h: "Keep names honest",
        p: "The signal is not ready because it is called ready. Name the condition, and document the handshake. RTL is read far more often than it is written.",
      },
    ],
  },
  {
    slug: "interview-prep-that-works",
    title: "Interview prep is recognition, not memorisation",
    category: "Career",
    date: "2026-10-14",
    readTime: "6 min",
    excerpt:
      "The strongest candidates are not the ones who solved the most problems. They are the ones who recognise a pattern in under a minute and can explain the trade-off.",
    body: [
      {
        h: "Build a trigger list",
        p: "Sorted input plus a pair means two pointers. Next greater element means a monotonic stack. Contiguous subarray with negatives means prefix sums. A short trigger list is more useful than a folder of solutions.",
      },
      {
        h: "Explain before you code",
        p: "State the invariant, complexity and edge cases out loud. Interviewers are evaluating the process, and a clear plan exposes mistakes earlier than a silent implementation.",
      },
      {
        h: "Practise the failure modes",
        p: "Empty input, one element, duplicates, overflow, null children. Most rejected solutions are correct on the happy path and wrong on the boundary.",
      },
      {
        h: "Close with trade-offs",
        p: "A working solution is the minimum. The differentiator is knowing when you would choose a different structure, and what it would cost.",
      },
    ],
  },
];

export const mockInterviewSets = [
  {
    id: "dsa-screen",
    category: "DSA",
    title: "DSA technical screen",
    level: "Intermediate",
    minutes: 35,
    description: "Two array/string problems and one structure question, with follow-ups on complexity.",
    questions: [
      "Explain the difference between O(n log n) sorting and O(n) counting sort. When is each appropriate?",
      "Given a sorted array, find two numbers summing to a target. Prove why the two-pointer approach is correct.",
      "Design an LRU cache. Which structures give O(1) get and put, and why?",
      "How would you detect a cycle in a linked list without extra memory?",
      "What is the worst case of quicksort and how do you mitigate it?",
    ],
  },
  {
    id: "vlsi-screen",
    category: "VLSI",
    title: "VLSI design screen",
    level: "Intermediate",
    minutes: 40,
    description: "CMOS, RTL and timing fundamentals with a debugging scenario.",
    questions: [
      "Walk through the CMOS inverter VTC and define the switching threshold.",
      "Why is a NAND gate cheaper than an AND gate in static CMOS?",
      "Write the setup timing equation and explain each term.",
      "A design has 100% stuck-at coverage but fails in the field. What could be missed?",
      "Explain blocking versus nonblocking assignment with a register-swap example.",
      "How does clock gating reduce dynamic power, and what does it cost?",
    ],
  },
  {
    id: "behavioral",
    category: "Behavioural",
    title: "Behavioural & project deep-dive",
    level: "Any",
    minutes: 30,
    description: "Structured stories about projects, conflict and learning under pressure.",
    questions: [
      "Describe a project where a design decision you made was later proven wrong. What did you change?",
      "Tell me about a time you had to learn a tool or concept quickly to unblock a team.",
      "How do you decide when a solution is good enough to ship rather than optimal?",
      "Describe a disagreement about technical direction and how it was resolved.",
      "What is a topic you know you are weak in, and what is your plan for it?",
    ],
  },
];

export const placementRoadmap = [
  {
    phase: "Semester 1",
    title: "Fundamentals",
    items: ["One programming language, deeply", "Complexity analysis", "Arrays, strings, hashing", "Git basics"],
    evidence: "You can solve easy problems without hints and explain your complexity.",
  },
  {
    phase: "Semester 2",
    title: "Core structures",
    items: ["Linked lists, stacks, queues", "Trees and graphs", "Recursion and backtracking", "SQL fundamentals"],
    evidence: "You can implement each structure from scratch and recognise its patterns.",
  },
  {
    phase: "Semester 3",
    title: "Domain depth",
    items: ["Choose DSA or VLSI depth", "Two substantial projects", "Testing and debugging discipline", "Technical writing"],
    evidence: "You can defend design decisions in a 20-minute project review.",
  },
  {
    phase: "Final year",
    title: "Interview execution",
    items: ["Timed problem practice", "Mock interviews", "Resume with measurable outcomes", "Company research"],
    evidence: "You can solve a medium problem and explain trade-offs under time pressure.",
  },
];

export const placementSkills = [
  { group: "Programming", items: ["C / C++ or Python", "Time & space analysis", "Debugging with tools", "Version control"] },
  { group: "DSA", items: ["Arrays & strings", "Trees & graphs", "Dynamic programming", "Pattern recognition"] },
  { group: "VLSI", items: ["Digital design", "Verilog RTL", "Timing basics", "Scripting (Tcl/Python)"] },
  { group: "Professional", items: ["Clear explanation", "Written communication", "Collaboration", "Ownership"] },
];

export const placementResources = [
  { title: "DSA roadmap", to: "/dsa/roadmap", note: "Stage-by-stage structure with prerequisites." },
  { title: "VLSI roadmap", to: "/vlsi/roadmap", note: "Electrical foundations through verification." },
  { title: "Practice problems", to: "/dsa/practice", note: "Filterable by topic, difficulty and pattern." },
  { title: "Mock interviews", to: "/mock-interviews", note: "Question sets with self-review notes." },
  { title: "Interview questions", to: "/dsa/interview-questions", note: "Expandable answers across both tracks." },
  { title: "Resume builder", to: "/resume", note: "Draft and print a clean one-page resume." },
];
