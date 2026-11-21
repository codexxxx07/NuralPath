import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { cn } from "../../lib/utils";
import { MetalPanel } from "./Surfaces";

/* ────────────────────────────────────────────────────────────
   Frame builders. Every frame is a real, inspectable algorithm
   state — no invented motion.
   ──────────────────────────────────────────────────────────── */

function bubbleFrames(input) {
  const a = [...input];
  const frames = [{ array: [...a], note: "Start: compare each adjacent pair, left to right.", active: [], done: [] }];
  const done = [];
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      frames.push({
        array: [...a],
        active: [j, j + 1],
        done: [...done],
        note: `Compare ${a[j]} and ${a[j + 1]}${a[j] > a[j + 1] ? " → swap" : " → keep order"}.`,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        frames.push({ array: [...a], active: [j, j + 1], done: [...done], note: `Swapped to ${a[j]} , ${a[j + 1]}.` });
      }
    }
    done.unshift(a.length - 1 - i);
    frames.push({ array: [...a], active: [], done: [...done], note: `Position ${a.length - i} is final.` });
    if (!swapped) break;
  }
  return frames.map((f) => ({ ...f, done: f.done.length ? f.done : [] }));
}

function selectionFrames(input) {
  const a = [...input];
  const frames = [{ array: [...a], active: [], done: [], note: "Start: repeatedly select the smallest remaining value." }];
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      frames.push({ array: [...a], active: [min, j], done: range(i), note: `Is ${a[j]} smaller than current minimum ${a[min]}?` });
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
    frames.push({ array: [...a], active: [i, min], done: range(i + 1), note: `Placed ${a[i]} at index ${i}.` });
  }
  return frames;
}

function insertionFrames(input) {
  const a = [...input];
  const frames = [{ array: [...a], active: [], done: [0], note: "Start: the first element is a sorted prefix." }];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    frames.push({ array: [...a], active: [i], done: range(i), note: `Insert ${key} into the sorted prefix.` });
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      frames.push({ array: [...a], active: [j, j + 1], done: range(i), note: `${a[j + 1]} > ${key} → shift right.` });
      j--;
    }
    a[j + 1] = key;
    frames.push({ array: [...a], active: [j + 1], done: range(i + 1), note: `${key} inserted at index ${j + 1}.` });
  }
  return frames;
}

function linearSearchFrames(input, target) {
  const a = [...input];
  const frames = [];
  for (let i = 0; i < a.length; i++) {
    frames.push({ array: [...a], active: [i], done: [], note: `Check index ${i}: ${a[i]} ${a[i] === target ? "=" : "≠"} ${target}.` });
    if (a[i] === target) {
      frames.push({ array: [...a], active: [i], found: [i], done: [], note: `Found ${target} at index ${i}.` });
      return frames;
    }
  }
  frames.push({ array: [...a], active: [], done: [], note: `${target} is not in the array.` });
  return frames;
}

function binarySearchFrames(input, target) {
  const a = [...input].sort((x, y) => x - y);
  const frames = [{ array: [...a], active: [], done: [], note: `Sorted array. Searching for ${target}.` }];
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    frames.push({ array: [...a], active: [mid], done: [], note: `lo=${lo}, hi=${hi}, mid=${mid} → ${a[mid]}.` });
    if (a[mid] === target) {
      frames.push({ array: [...a], active: [], found: [mid], done: [], note: `Found ${target} at index ${mid} in ${Math.ceil(Math.log2(a.length + 1))} comparisons.` });
      return frames;
    }
    if (a[mid] < target) {
      frames.push({ array: [...a], active: [], done: [], note: `${a[mid]} < ${target} → discard the left half.` });
      lo = mid + 1;
    } else {
      frames.push({ array: [...a], active: [], done: [], note: `${a[mid]} > ${target} → discard the right half.` });
      hi = mid - 1;
    }
  }
  frames.push({ array: [...a], active: [], done: [], note: `${target} is not in the array.` });
  return frames;
}

const range = (n) => Array.from({ length: n }, (_, i) => i);

const BUILDERS = {
  bubbleSort: bubbleFrames,
  selectionSort: selectionFrames,
  insertionSort: insertionFrames,
  linearSearch: linearSearchFrames,
  binarySearch: binarySearchFrames,
};

export const ALGORITHM_LABELS = {
  bubbleSort: "Bubble Sort",
  selectionSort: "Selection Sort",
  insertionSort: "Insertion Sort",
  linearSearch: "Linear Search",
  binarySearch: "Binary Search",
};

/* ────────────────────────────────────────────────────────────
   Playback
   ──────────────────────────────────────────────────────────── */

function usePlayback(frames, speed = 700) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(speed);
  const timer = useRef(null);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [frames]);

  useEffect(() => {
    if (!playing) return undefined;
    if (index >= frames.length - 1) {
      setPlaying(false);
      return undefined;
    }
    timer.current = setTimeout(() => setIndex((i) => i + 1), rate);
    return () => clearTimeout(timer.current);
  }, [playing, index, frames.length, rate]);

  const step = useCallback(
    (dir) => {
      setPlaying(false);
      setIndex((i) => Math.max(0, Math.min(frames.length - 1, i + dir)));
    },
    [frames.length]
  );

  return {
    index,
    setIndex,
    playing,
    setPlaying,
    rate,
    setRate,
    step,
    reset: () => {
      setPlaying(false);
      setIndex(0);
    },
    frame: frames[index],
  };
}

function PlaybackControls({ playback, frames, label }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={() => playback.setPlaying((p) => !p)}
        aria-label={playback.playing ? "Pause" : "Play"}
        className="metal grid h-9 w-9 place-items-center rounded-md transition-transform active:translate-y-px"
      >
        {playback.playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button
        type="button"
        onClick={() => playback.step(-1)}
        disabled={playback.index === 0}
        aria-label="Step backward"
        className="metal grid h-9 w-9 place-items-center rounded-md disabled:opacity-40"
      >
        <SkipBack className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => playback.step(1)}
        disabled={playback.index === frames.length - 1}
        aria-label="Step forward"
        className="metal grid h-9 w-9 place-items-center rounded-md disabled:opacity-40"
      >
        <SkipForward className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={playback.reset}
        aria-label="Reset"
        className="metal grid h-9 w-9 place-items-center rounded-md"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
      <label className="ml-1 flex items-center gap-2 text-[11px] text-muted-foreground">
        Speed
        <input
          type="range"
          min={120}
          max={1400}
          step={20}
          value={1520 - playback.rate}
          onChange={(e) => playback.setRate(1520 - Number(e.target.value))}
          className="h-1 w-20 cursor-pointer accent-[var(--color-wood)]"
          aria-label="Animation speed"
        />
      </label>
      <span className="ml-auto font-mono text-[11px] text-muted-foreground">
        {label} · {playback.index + 1}/{frames.length}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Array visualization (sorting + searching)
   ──────────────────────────────────────────────────────────── */

const DEFAULT_ARRAY = [38, 17, 56, 9, 72, 24, 45, 61];

function ArrayVisual({ algorithm = "bubbleSort", values = DEFAULT_ARRAY, target = 56 }) {
  const [input, setInput] = useState(values.join(","));
  const [query, setQuery] = useState(String(target));
  const [algo, setAlgo] = useState(algorithm);
  useEffect(() => setAlgo(algorithm), [algorithm]);
  const frames = useMemo(() => {
    const parsed = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => Number.isFinite(n))
      .slice(0, 12);
    const safe = parsed.length ? parsed : DEFAULT_ARRAY;
    const t = Number(query);
    return (BUILDERS[algo] || bubbleFrames)(safe, Number.isFinite(t) ? t : safe[0]);
  }, [algo, input, query]);

  const pb = usePlayback(frames);
  const frame = pb.frame;
  const max = Math.max(1, ...frame.array);

  return (
    <div>
      <div className="rounded-lg border border-border/70 bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] p-4 sm:p-5">
        <div className="flex min-h-[168px] items-end justify-center gap-1.5 sm:gap-2.5">
          {frame.array.map((value, i) => {
            const isActive = frame.active?.includes(i);
            const isFound = frame.found?.includes(i);
            const isDone = frame.done?.includes(i);
            return (
              <div key={`${i}-${value}`} className="flex w-8 flex-col items-center gap-1 sm:w-10">
                <span className="font-mono text-[10px] text-muted-foreground">{value}</span>
                <div
                  className={cn(
                    "w-full rounded-t-[3px] border border-black/20 transition-all duration-200",
                    isFound
                      ? "bg-[linear-gradient(180deg,#9ed3a9,#4f9060)]"
                      : isActive
                        ? "bg-[linear-gradient(180deg,#f0d27e,#b98724)]"
                        : isDone
                          ? "bg-[linear-gradient(180deg,#b9cfe0,#6f96b8)]"
                          : "bg-[linear-gradient(180deg,#e6dcc9,#b7a98f)]"
                  )}
                  style={{ height: `${Math.max(18, (value / max) * 128)}px` }}
                />
                <span className="font-mono text-[9px] text-muted-foreground/70">{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 min-h-10 rounded-md border border-border/60 bg-[var(--color-paper-warm)] px-3 py-2 text-xs leading-relaxed text-foreground">
        {frame.note}
      </p>

      <div className="mt-3">
        <PlaybackControls playback={pb} frames={frames} label={ALGORITHM_LABELS[algo] || "Array"} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex flex-col gap-1 text-[11px] text-muted-foreground">
          Values (comma separated, max 12)
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="field h-8 px-2 font-mono text-xs"
            aria-label="Array values"
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px] text-muted-foreground">
          Algorithm
          <select
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
            className="field h-8 rounded-[4px] px-1.5 text-xs"
            aria-label="Visualized algorithm"
          >
            {Object.entries(ALGORITHM_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        {algo === "linearSearch" || algo === "binarySearch" ? (
          <label className="flex flex-col gap-1 text-[11px] text-muted-foreground">
            Target
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field h-8 w-20 px-2 font-mono text-xs"
              aria-label="Search target"
            />
          </label>
        ) : null}
        <button
          type="button"
          onClick={() => {
            const shuffled = Array.from({ length: 8 }, () => 5 + Math.floor(Math.random() * 90));
            setInput(shuffled.join(","));
          }}
          className="btn-paper mt-auto h-8 rounded-md px-3 text-xs"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Stack / Queue
   ──────────────────────────────────────────────────────────── */

function StackQueueVisual({ variant = "stack" }) {
  const [mode, setMode] = useState(variant);
  const [items, setItems] = useState([12, 27, 41]);
  const [note, setNote] = useState("LIFO: the top element leaves first.");
  const next = (items.at(-1) ?? 0) + 7;

  const switchMode = (m) => {
    setMode(m);
    setItems([12, 27, 41]);
    setNote(m === "stack" ? "LIFO: the top element leaves first." : "FIFO: the front element leaves first.");
  };

  const push = () => {
    if (items.length >= 8) {
      setNote("Capacity 8 reached — remove an item first.");
      return;
    }
    setItems([...items, next]);
    setNote(mode === "stack" ? `push(${next}) → new top.` : `enqueue(${next}) → added at the back.`);
  };
  const remove = () => {
    if (!items.length) {
      setNote(mode === "stack" ? "Stack underflow: nothing to pop." : "Queue underflow: nothing to dequeue.");
      return;
    }
    const value = mode === "stack" ? items[items.length - 1] : items[0];
    setItems(mode === "stack" ? items.slice(0, -1) : items.slice(1));
    setNote(mode === "stack" ? `pop() → ${value} leaves the top.` : `dequeue() → ${value} leaves the front.`);
  };

  return (
    <div>
      <div className="mb-3 flex gap-1.5">
        {["stack", "queue"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={cn(
              "rounded-[3px] border px-2 py-1 text-[11px] capitalize",
              mode === m ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold" : "border-border"
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex min-h-[240px] items-end justify-center gap-3 rounded-lg border border-border/70 bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] p-5">
        {mode === "stack" ? (
          <div className="flex w-40 flex-col-reverse items-stretch gap-1.5">
            {items.map((value, i) => (
              <div
                key={`${i}-${value}`}
                className={cn(
                  "rounded-[4px] border border-black/20 px-3 py-2 text-center font-mono text-sm shadow-[0_2px_4px_rgba(60,45,25,0.2)]",
                  i === items.length - 1
                    ? "bg-[linear-gradient(180deg,#f0d27e,#c99a33)]"
                    : "bg-[linear-gradient(180deg,#efe7d8,#cdbfa6)]"
                )}
              >
                {value}
                {i === items.length - 1 ? <span className="ml-2 text-[10px]">top</span> : null}
              </div>
            ))}
            <div className="h-1 rounded bg-[var(--color-wood-dark)]" />
          </div>
        ) : (
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-2">
            <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground">front</span>
            {items.map((value, i) => (
              <div
                key={`${i}-${value}`}
                className={cn(
                  "min-w-14 shrink-0 rounded-[4px] border border-black/20 px-3 py-3 text-center font-mono text-sm shadow-[0_2px_4px_rgba(60,45,25,0.2)]",
                  i === 0
                    ? "bg-[linear-gradient(180deg,#f0d27e,#c99a33)]"
                    : "bg-[linear-gradient(180deg,#efe7d8,#cdbfa6)]"
                )}
              >
                {value}
              </div>
            ))}
            <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground">back</span>
          </div>
        )}
      </div>
      <p className="mt-3 min-h-10 rounded-md border border-border/60 bg-[var(--color-paper-warm)] px-3 py-2 text-xs text-foreground">
        {note}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={push} className="btn-paper h-8 rounded-md px-3 text-xs">
          {mode === "stack" ? "Push" : "Enqueue"}
        </button>
        <button type="button" onClick={remove} className="btn-paper h-8 rounded-md px-3 text-xs">
          {mode === "stack" ? "Pop" : "Dequeue"}
        </button>
        <button
          type="button"
          onClick={() => {
            setItems([]);
            setNote("Emptied.");
          }}
          className="btn-paper h-8 rounded-md px-3 text-xs"
        >
          Reset
        </button>
        <span className="ml-auto self-center font-mono text-[11px] text-muted-foreground">
          size = {items.length}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Linked list, tree, graph
   ──────────────────────────────────────────────────────────── */

const LIST_NODES = [4, 9, 16, 23, 31];

function LinkedListVisual() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [linked, setLinked] = useState([]);

  useEffect(() => {
    if (!playing) return undefined;
    if (index >= LIST_NODES.length - 1) {
      setPlaying(false);
      return undefined;
    }
    const t = setTimeout(() => {
      setIndex((i) => i + 1);
      setLinked((l) => [...new Set([...l, index])]);
    }, 650);
    return () => clearTimeout(t);
  }, [playing, index]);

  return (
    <div>
      <div className="rounded-lg border border-border/70 bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] p-5">
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          <span className="shrink-0 rounded-[3px] bg-[var(--color-wood-dark)] px-2 py-1 font-mono text-[10px] text-white">
            head
          </span>
          {LIST_NODES.map((value, i) => (
            <div key={value} className="flex shrink-0 items-center gap-1">
              <span className="text-muted-foreground">→</span>
              <div
                className={cn(
                  "flex overflow-hidden rounded-[4px] border border-black/25 shadow-[0_2px_4px_rgba(60,45,25,0.2)]",
                  i === index ? "ring-2 ring-[var(--color-brass)] ring-offset-1" : ""
                )}
              >
                <span className="bg-[linear-gradient(180deg,#efe7d8,#cdbfa6)] px-2.5 py-2 font-mono text-sm">
                  {value}
                </span>
                <span
                  className={cn(
                    "border-l border-black/20 px-1.5 py-1 font-mono text-[9px]",
                    linked.includes(i) ? "bg-[#8fb3a0] text-[#16352a]" : "bg-[var(--color-paper-warm)] text-muted-foreground"
                  )}
                  title={linked.includes(i) ? "next pointer followed" : "next pointer not followed yet"}
                >
                  ●
                </span>
              </div>
            </div>
          ))}
          <span className="shrink-0 text-muted-foreground">→</span>
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">null</span>
        </div>
      </div>
      <p className="mt-3 min-h-10 rounded-md border border-border/60 bg-[var(--color-paper-warm)] px-3 py-2 text-xs">
        Visited node {index + 1} of {LIST_NODES.length} — value {LIST_NODES[index]}. A traversal must follow
        `next` from the head; reaching null means the list ended.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => setPlaying((p) => !p)} className="metal grid h-9 w-9 place-items-center rounded-md">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="metal grid h-9 w-9 place-items-center rounded-md"
          aria-label="Step backward"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(LIST_NODES.length - 1, i + 1))}
          className="metal grid h-9 w-9 place-items-center rounded-md"
          aria-label="Step forward"
        >
          <SkipForward className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setLinked([]);
            setPlaying(false);
          }}
          className="metal grid h-9 w-9 place-items-center rounded-md"
          aria-label="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">O(n) traversal</span>
      </div>
    </div>
  );
}

const TREE_ORDER = {
  inorder: [10, 20, 30, 40, 50, 60, 70],
  preorder: [40, 20, 10, 30, 60, 50, 70],
  postorder: [10, 30, 20, 50, 70, 60, 40],
};

function TreeVisual() {
  const [order, setOrder] = useState("inorder");
  const [step, setStep] = useState(0);
  const visited = TREE_ORDER[order].slice(0, step);

  return (
    <div>
      <div className="rounded-lg border border-border/70 bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] p-4">
        <svg viewBox="0 0 100 62" className="mx-auto h-48 w-full max-w-md" role="img" aria-label="Binary search tree">
          {[
            ["50,16", "30,34"],
            ["50,16", "70,34"],
            ["30,34", "20,48"],
            ["30,34", "40,48"],
            ["70,34", "60,48"],
            ["70,34", "80,48"],
          ].map(([a, b]) => {
            const [x1, y1] = a.split(",").map(Number);
            const [x2, y2] = b.split(",").map(Number);
            return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-wood)" strokeWidth="0.9" opacity="0.55" />;
          })}
          {[
            { v: 40, x: 50, y: 14 },
            { v: 20, x: 30, y: 32 },
            { v: 60, x: 70, y: 32 },
            { v: 10, x: 20, y: 47 },
            { v: 30, x: 40, y: 47 },
            { v: 50, x: 60, y: 47 },
            { v: 70, x: 80, y: 47 },
          ].map((n) => {
            const active = visited.includes(n.v);
            return (
              <g key={n.v}>
                <circle cx={n.x} cy={n.y} r="7.4" fill={active ? "#a9c6df" : "#efe7d8"} stroke="#7c5638" strokeWidth="0.9" />
                <text x={n.x} y={n.y + 2.4} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#2b2b25">
                  {n.v}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {Object.keys(TREE_ORDER).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setOrder(k);
              setStep(0);
            }}
            className={cn(
              "rounded-[3px] border px-2 py-1 text-[11px] capitalize",
              k === order ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold" : "border-border"
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-12 rounded-md border border-border/60 bg-[var(--color-paper-warm)] px-3 py-2 font-mono text-xs">
        {visited.length ? visited.join(" → ") : "No nodes visited yet."}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(TREE_ORDER[order].length, s + 1))}
          className="btn-paper h-8 rounded-md px-3 text-xs"
        >
          Step
        </button>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="btn-paper h-8 rounded-md px-3 text-xs"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setStep(TREE_ORDER[order].length)}
          className="btn-paper h-8 rounded-md px-3 text-xs"
        >
          Full order
        </button>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">O(n) visit</span>
      </div>
    </div>
  );
}

const GRAPH = {
  A: { x: 18, y: 26, edges: ["B", "C"] },
  B: { x: 44, y: 12, edges: ["A", "D"] },
  C: { x: 44, y: 44, edges: ["A", "D", "E"] },
  D: { x: 68, y: 26, edges: ["B", "C", "F"] },
  E: { x: 68, y: 54, edges: ["C"] },
  F: { x: 86, y: 38, edges: ["D"] },
};

function bfs(start = "A") {
  const order = [];
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    GRAPH[node].edges.forEach((n) => {
      if (!seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    });
  }
  return order;
}

function dfs(start = "A") {
  const order = [];
  const seen = new Set();
  const walk = (node) => {
    if (seen.has(node)) return;
    seen.add(node);
    order.push(node);
    GRAPH[node].edges.forEach(walk);
  };
  walk(start);
  return order;
}

function GraphVisual() {
  const [method, setMethod] = useState("bfs");
  const order = useMemo(() => (method === "bfs" ? bfs() : dfs()), [method]);
  const [step, setStep] = useState(0);
  const visited = order.slice(0, step);

  const edges = [];
  Object.entries(GRAPH).forEach(([from, node]) => {
    node.edges.forEach((to) => {
      if (from < to) edges.push([from, to]);
    });
  });

  return (
    <div>
      <div className="rounded-lg border border-border/70 bg-[color-mix(in_srgb,var(--color-paper-deep)_55%,transparent)] p-4">
        <svg viewBox="0 0 100 64" className="mx-auto h-52 w-full max-w-md" role="img" aria-label="Undirected graph traversal">
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={GRAPH[a].x}
              y1={GRAPH[a].y}
              x2={GRAPH[b].x}
              y2={GRAPH[b].y}
              stroke="var(--color-wood)"
              strokeWidth="1"
              opacity={visited.includes(a) && visited.includes(b) ? 0.9 : 0.35}
            />
          ))}
          {Object.entries(GRAPH).map(([id, n]) => {
            const active = visited.includes(id);
            return (
              <g key={id}>
                <circle cx={n.x} cy={n.y} r="7.6" fill={active ? "#a9c6df" : "#efe7d8"} stroke="#7c5638" strokeWidth="1" />
                <text x={n.x} y={n.y + 2.5} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#2b2b25">
                  {id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["bfs", "dfs"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMethod(m);
              setStep(0);
            }}
            className={cn(
              "rounded-[3px] border px-2 py-1 text-[11px] uppercase",
              m === method ? "border-[var(--color-wood)] bg-[var(--color-paper-deep)] font-semibold" : "border-border"
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-12 rounded-md border border-border/60 bg-[var(--color-paper-warm)] px-3 py-2 font-mono text-xs">
        {visited.length ? visited.join(" → ") : "No nodes visited yet."}
        {method === "bfs" ? "   (queue-based, level by level)" : "   (recursive stack, depth first)"}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <button type="button" onClick={() => setStep((s) => Math.min(order.length, s + 1))} className="btn-paper h-8 rounded-md px-3 text-xs">
          Step
        </button>
        <button type="button" onClick={() => setStep(0)} className="btn-paper h-8 rounded-md px-3 text-xs">
          Reset
        </button>
        <button type="button" onClick={() => setStep(order.length)} className="btn-paper h-8 rounded-md px-3 text-xs">
          Full order
        </button>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">O(V + E)</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Public instrument
   ──────────────────────────────────────────────────────────── */

export default function DsaVisualizer({ kind = "array", algorithm = "bubbleSort", caption, className }) {
  return (
    <MetalPanel className={cn("p-3 sm:p-4", className)}>
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Learning instrument
        </p>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-circuit)]" />
          step-accurate
        </span>
      </div>
      <div className="rounded-lg bg-[var(--color-card)] p-3 shadow-[var(--shadow-sm)] sm:p-4">
        {kind === "stack" || kind === "queue" ? (
          <StackQueueVisual variant={kind} />
        ) : kind === "linkedlist" ? (
          <LinkedListVisual />
        ) : kind === "tree" ? (
          <TreeVisual />
        ) : kind === "graph" ? (
          <GraphVisual />
        ) : (
          <ArrayVisual algorithm={algorithm} />
        )}
      </div>
      {caption ? (
        <p className="mt-3 px-1 text-[11px] leading-relaxed text-muted-foreground">{caption}</p>
      ) : null}
    </MetalPanel>
  );
}
