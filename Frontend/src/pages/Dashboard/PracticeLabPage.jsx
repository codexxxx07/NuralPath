import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight, CheckCircle2, Lock, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Practice Lab</h1>
        <p className="text-muted-foreground mt-1">Hands-on terminal practice to sharpen your skills</p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-zinc-900 border-b border-zinc-800 py-3 px-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-zinc-400 text-sm ml-2 font-mono">arjun@nuralpath:~</span>
              </div>
            </CardHeader>
            <div
              ref={terminalRef}
              className="bg-zinc-950 p-4 h-[480px] overflow-y-auto font-mono text-sm cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, i) => (
                <div key={i} className={cn(
                  "whitespace-pre-wrap",
                  entry.type === "command" ? "text-emerald-400" : "text-zinc-300"
                )}>
                  {entry.type === "command" ? (
                    <span>
                      <span className="text-primary">$ </span>
                      {entry.text}
                    </span>
                  ) : (
                    <span>{entry.text}</span>
                  )}
                </div>
              ))}
              <div className="flex items-center mt-1">
                <span className="text-primary">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-zinc-100 font-mono text-sm outline-none ml-1 caret-emerald-400"
                  autoFocus
                  spellCheck={false}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exercises</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exercises.map((ex) => (
                <div
                  key={ex.id}
                  className={cn(
                    "p-3 rounded-lg border transition-colors",
                    ex.status === "completed" && "bg-emerald-500/5 border-emerald-500/20",
                    ex.status === "in-progress" && "bg-primary/5 border-primary/20",
                    ex.status === "locked" && "bg-muted/50 opacity-60"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {ex.status === "completed" && <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />}
                        {ex.status === "locked" && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                        {ex.status === "in-progress" && <Play className="h-4 w-4 text-primary flex-shrink-0" />}
                        <p className="font-medium text-foreground text-sm truncate">{ex.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{ex.description}</p>
                    </div>
                    <Badge variant={ex.difficulty === "Easy" ? "secondary" : ex.difficulty === "Medium" ? "default" : "destructive"} className="text-xs flex-shrink-0">
                      {ex.difficulty}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{ex.xp} XP</span>
                    {ex.status === "in-progress" && (
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Continue <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-xs font-mono text-muted-foreground">
                <p><span className="text-foreground">ls -la</span> — List all files</p>
                <p><span className="text-foreground">cd &lt;dir&gt;</span> — Change directory</p>
                <p><span className="text-foreground">cat &lt;file&gt;</span> — View file contents</p>
                <p><span className="text-foreground">chmod 755</span> — Change permissions</p>
                <p><span className="text-foreground">grep "str" file</span> — Search in file</p>
                <p><span className="text-foreground">ps aux</span> — List processes</p>
                <p><span className="text-foreground">gcc file.c</span> — Compile C code</p>
                <p><span className="text-foreground">clear</span> — Clear terminal</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
