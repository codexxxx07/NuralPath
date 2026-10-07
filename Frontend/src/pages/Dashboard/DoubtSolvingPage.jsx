import { useState } from "react";
import { Send } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { cn } from "../../lib/utils";

const pastDoubts = [
  {
    id: 1,
    question: "How does chmod 755 differ from chmod 777?",
    topic: "Linux",
    timestamp: "2 hours ago",
    status: "resolved",
    replies: [
      {
        id: 1,
        sender: "student",
        text: "I'm confused about file permissions. What's the difference between chmod 755 and chmod 777? When should I use each?",
        time: "2:30 PM",
      },
      {
        id: 2,
        sender: "mentor",
        text: "Great question! chmod 755 gives the owner full permissions (rwx), while group and others get read and execute (r-x). chmod 777 gives everyone full permissions (rwxrwxrwx), which is a security risk. Use 755 for executables and directories, 644 for regular files.",
        time: "2:35 PM",
      },
      {
        id: 3,
        sender: "student",
        text: "So 777 should basically never be used in production?",
        time: "2:38 PM",
      },
      {
        id: 4,
        sender: "mentor",
        text: "Exactly! 777 is a security nightmare. Always follow the principle of least privilege. Only grant the minimum permissions needed.",
        time: "2:40 PM",
      },
    ],
  },
  {
    id: 2,
    question: "Why is my shell script not executing?",
    topic: "Shell",
    timestamp: "Yesterday",
    status: "resolved",
    replies: [
      {
        id: 1,
        sender: "student",
        text: "I wrote a shell script but when I run ./script.sh I get 'Permission denied'. I already wrote the script with proper shebang.",
        time: "4:15 PM",
      },
      {
        id: 2,
        sender: "mentor",
        text: "You need to make the script executable first. Run: chmod +x script.sh. The shebang (#!/bin/bash) tells the system which interpreter to use, but you still need execute permission on the file itself.",
        time: "4:20 PM",
      },
      {
        id: 3,
        sender: "student",
        text: "That worked! Thank you.",
        time: "4:22 PM",
      },
    ],
  },
  {
    id: 3,
    question: "What's the difference between malloc and calloc in C?",
    topic: "C",
    timestamp: "3 days ago",
    status: "resolved",
    replies: [
      {
        id: 1,
        sender: "student",
        text: "Can someone explain when to use malloc vs calloc? They both seem to allocate memory.",
        time: "11:00 AM",
      },
      {
        id: 2,
        sender: "mentor",
        text: "Both allocate memory on the heap, but with key differences: malloc allocates uninitialized memory (contains garbage values), while calloc allocates zero-initialized memory. calloc also takes two arguments (count, size) and automatically calculates total bytes. Use calloc when you need zeroed memory, malloc when you'll fill it immediately.",
        time: "11:10 AM",
      },
    ],
  },
  {
    id: 4,
    question: "How do I find my first open source issue?",
    topic: "Open Source",
    timestamp: "5 days ago",
    status: "resolved",
    replies: [
      {
        id: 1,
        sender: "student",
        text: "I want to contribute to open source but don't know where to start. How do I find issues I can work on?",
        time: "3:00 PM",
      },
      {
        id: 2,
        sender: "mentor",
        text: "Start by looking for 'good first issue' or 'help wanted' labels on GitHub. Look for projects you actually use. Read the CONTRIBUTING.md file first. Fork the repo, set up the dev environment, then pick a small issue. Don't try to fix everything at once!",
        time: "3:15 PM",
      },
    ],
  },
];

const topicTags = ["Linux", "Shell", "C", "Open Source", "Git"];

export default function DoubtSolvingPage() {
  const [selectedDoubt, setSelectedDoubt] = useState(pastDoubts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showAskForm, setShowAskForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", description: "", topic: "Linux" });

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updatedDoubt = {
      ...selectedDoubt,
      replies: [
        ...selectedDoubt.replies,
        { id: Date.now(), sender: "student", text: newMessage, time: "Now" },
      ],
    };
    setSelectedDoubt(updatedDoubt);
    setNewMessage("");
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Doubt Solving</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get help from mentors and resolve your doubts</p>
        </div>
        <Button onClick={() => setShowAskForm(!showAskForm)} className="shrink-0">
          {showAskForm ? "Cancel" : "Ask a Doubt"}
        </Button>
      </div>

      {showAskForm && (
        <section className="rounded-lg border border-border p-5">
          <h2 className="text-base font-semibold tracking-tight text-foreground">Ask a New Doubt</h2>
          <div className="mt-4 space-y-4">
            <Input
              placeholder="Brief title for your doubt"
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            />
            <Textarea
              placeholder="Describe your doubt in detail. Include what you've tried so far..."
              rows={4}
              value={newQuestion.description}
              onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Topic:</span>
              {topicTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={newQuestion.topic === tag ? "success" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setNewQuestion({ ...newQuestion, topic: tag })}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Button onClick={() => { setShowAskForm(false); setNewQuestion({ title: "", description: "", topic: "Linux" }); }}>
              Submit Doubt
            </Button>
          </div>
        </section>
      )}

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <section className="h-fit">
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Past Doubts
          </h2>
          <div>
            {pastDoubts.map((doubt) => (
              <div
                key={doubt.id}
                onClick={() => setSelectedDoubt(doubt)}
                className={cn(
                  "cursor-pointer border-b border-border px-3 py-4 transition-colors",
                  selectedDoubt?.id === doubt.id ? "bg-muted" : "hover:bg-muted/60"
                )}
              >
                <p className="line-clamp-1 text-sm font-medium text-foreground">{doubt.question}</p>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{doubt.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doubt.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col rounded-lg border border-border">
          <div className="border-b border-border px-5 py-4">
            <p className="text-sm font-medium text-foreground">{selectedDoubt?.question}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{selectedDoubt?.topic}</Badge>
              <Badge variant="success">Resolved</Badge>
            </div>
          </div>
          <div className="max-h-[400px] flex-1 space-y-4 overflow-y-auto p-5">
            {selectedDoubt?.replies.map((reply) => (
              <div
                key={reply.id}
                className={cn(
                  "flex",
                  reply.sender === "student" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3.5 py-2.5",
                    reply.sender === "student"
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm">{reply.text}</p>
                  <p
                    className={cn(
                      "mt-1 text-xs",
                      reply.sender === "student" ? "text-background/60" : "text-muted-foreground"
                    )}
                  >
                    {reply.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button size="icon" onClick={handleSend} aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
