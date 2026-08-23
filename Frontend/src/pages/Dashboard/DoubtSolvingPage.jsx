import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Send, Tag, Clock, MessageSquare, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div className="flex items-center justify-between" variants={item}>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doubt Solving</h1>
          <p className="text-muted-foreground mt-1">Get help from mentors and resolve your doubts</p>
        </div>
        <Button onClick={() => setShowAskForm(!showAskForm)}>
          {showAskForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {showAskForm ? "Cancel" : "Ask a Doubt"}
        </Button>
      </motion.div>

      {showAskForm && (
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ask a New Doubt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Topic:</span>
                {topicTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={newQuestion.topic === tag ? "default" : "outline"}
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
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div className="grid lg:grid-cols-[320px_1fr] gap-6" variants={item}>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Past Doubts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pastDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors border",
                  selectedDoubt?.id === doubt.id
                    ? "bg-primary/10 border-primary/30"
                    : "hover:bg-muted/50 border-transparent"
                )}
                onClick={() => setSelectedDoubt(doubt)}
              >
                <p className="font-medium text-foreground text-sm line-clamp-1">{doubt.question}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className="text-xs">{doubt.topic}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {doubt.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">{selectedDoubt?.question}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{selectedDoubt?.topic}</Badge>
              <Badge variant="success">Resolved</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
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
                      "max-w-[80%] rounded-lg p-3",
                      reply.sender === "student"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm">{reply.text}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      reply.sender === "student" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {reply.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
