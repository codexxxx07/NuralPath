import { useState, useRef, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const terminalHistory = [
  { type: "command", text: "pwd" },
  { type: "output", text: "/home/arjun/nuralpath" },
  { type: "command", text: "ls -la" },
  { type: "output", text: "total 32\ndrwxr-xr-x 4 arjun arjun 4096 Aug 23 10:00 .\ndrwxr-xr-x 3 root root 4096 Aug 20 09:00 ..\n-rw-r--r-- 1 arjun arjun  256 Aug 22 14:30 readme.txt\ndrwxr-xr-x 2 arjun arjun 4096 Aug 23 08:00 scripts\ndrwxr-xr-x 2 arjun arjun 4096 Aug 21 16:00 exercises" },
  { type: "command", text: "cat readme.txt" },
  { type: "output", text: "Welcome to NuralPath Practice Lab\nComplete the exercises to improve your skills\nCurrent streak: 12 days" },
  { type: "command", text: "cd scripts" },
  { type: "output", text: "" },
  { type: "command", text: "ls" },
  { type: "output", text: "hello.sh  backup.sh  process_log.sh" },
];

const exercises = [
  { id: 1, title: "Basic Navigation", description: "Practice ls, cd, pwd commands", difficulty: "Easy", status: "completed", xp: 50 },
  { id: 2, title: "File Operations", description: "Create, copy, move, delete files", difficulty: "Easy", status: "completed", xp: 75 },
  { id: 3, title: "Permissions Deep Dive", description: "Understand chmod, chown, umask", difficulty: "Medium", status: "in-progress", xp: 100 },
  { id: 4, title: "Process Management", description: "ps, top, kill, background jobs", difficulty: "Medium", status: "locked", xp: 120 },
  { id: 5, title: "Shell Scripting Basics", description: "Write your first bash scripts", difficulty: "Medium", status: "locked", xp: 150 },
  { id: 6, title: "Text Processing", description: "grep, sed, awk, cut, sort", difficulty: "Hard", status: "locked", xp: 200 },
];

const commandOutputs = {
  ls: "Desktop  Documents  Downloads  Music  Pictures  Videos  nuralpath",
  pwd: "/home/arjun",
  whoami: "arjun",
  date: "Sat Aug 23 14:30:25 IST 2026",
  uname: "Linux arjun-laptop 5.15.0-generic #1 SMP x86_64 GNU/Linux",
  clear: "__CLEAR__",
  help: "Available commands: ls, pwd, cd, cat, echo, mkdir, rm, cp, mv, chmod, grep, ps, whoami, date, uname, clear, help",
  echo: "Hello, World!",
  mkdir: "Directory created",
  touch: "File created",
  gcc: "gcc: no input files\nUsage: gcc [options] file...",
  "gcc --version": "gcc (Ubuntu 11.3.0) 11.3.0\nCopyright (C) 2021 Free Software Foundation, Inc.",
  ps: "  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps",
  top: "top - 14:30:25 up 2 days,  5:12,  1 user,  load average: 0.42, 0.38, 0.35\nTasks: 234 total,   1 running, 233 sleeping,   0 stopped,   0 zombie",
  df: "Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1      51200000 18200000  30500000  38% /\ntmpfs            4096000        0   4096000   0% /dev/shm",
  free: "              total        used        free      shared  buff/cache   available\nMem:        8167424     3245632     2456192      456780     2465600     4256788\nSwap:       2097152       65536     2031616",
  "cat /etc/os-release": 'NAME="Ubuntu"\nVERSION="22.04.3 LTS (Jammy Jellyfish)"\nID=ubuntu\nPRETTY_NAME="Ubuntu 22.04.3 LTS"',
};

export default function PracticeLabPage() {
  const [history, setHistory] = useState(terminalHistory);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: "command", text: trimmed }];

    if (trimmed === "clear") {
      setHistory([]);
    } else {
      const output = commandOutputs[trimmed] || `bash: ${trimmed.split(" ")[0]}: command not found`;
      newHistory.push({ type: "output", text: output });
    }

    setHistory(newHistory);
    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Practice Lab</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Hands-on terminal practice to sharpen your skills</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="card-depth overflow-hidden">
          <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-3">
            <span className="font-mono text-xs text-zinc-400">arjun@nuralpath:~</span>
          </div>
          <div
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
            className="h-[480px] cursor-text overflow-y-auto bg-zinc-950 p-4 font-mono text-sm"
          >
            {history.map((entry, i) => (
              <div
                key={i}
                className={cn(
                  "whitespace-pre-wrap",
                  entry.type === "command" ? "text-zinc-100" : "text-zinc-400"
                )}
              >
                {entry.type === "command" ? (
                  <span>
                    <span className="text-zinc-500">$ </span>
                    {entry.text}
                  </span>
                ) : (
                  <span>{entry.text}</span>
                )}
              </div>
            ))}
            <div className="mt-1 flex items-center">
              <span className="text-zinc-500">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="ml-1 flex-1 bg-transparent font-mono text-sm text-zinc-100 caret-zinc-100 outline-none"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Exercises
            </h2>
            <div>
              {exercises.map((ex) => (
                <div
                  key={ex.id}
                  className={cn(
                    "border-b border-border py-4",
                    ex.status === "locked" && "opacity-60"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-foreground">{ex.title}</p>
                        {ex.status === "completed" && <Badge variant="success">Completed</Badge>}
                        {ex.status === "in-progress" && (
                          <span className="text-xs font-medium text-foreground">In progress</span>
                        )}
                        {ex.status === "locked" && (
                          <span className="text-xs text-muted-foreground">Locked</span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{ex.description}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{ex.difficulty}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{ex.xp} XP</span>
                    {ex.status === "in-progress" && (
                      <Button variant="ghost" size="sm">Continue</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Quick Reference
            </h2>
            <div className="space-y-1.5 pt-3 text-xs font-mono text-muted-foreground">
              <p><span className="text-foreground">ls -la</span> — List all files</p>
              <p><span className="text-foreground">cd &lt;dir&gt;</span> — Change directory</p>
              <p><span className="text-foreground">cat &lt;file&gt;</span> — View file contents</p>
              <p><span className="text-foreground">chmod 755</span> — Change permissions</p>
              <p><span className="text-foreground">grep "str" file</span> — Search in file</p>
              <p><span className="text-foreground">ps aux</span> — List processes</p>
              <p><span className="text-foreground">gcc file.c</span> — Compile C code</p>
              <p><span className="text-foreground">clear</span> — Clear terminal</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
