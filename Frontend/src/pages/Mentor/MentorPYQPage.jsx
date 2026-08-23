import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  GripVertical,
  List,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

const initialQuestionSets = [
  {
    id: 1,
    title: "Linux Fundamentals - Midterm",
    course: "Linux Fundamentals",
    questions: 15,
    duration: "60 min",
    difficulty: "Intermediate",
    status: "Published",
  },
  {
    id: 2,
    title: "Shell Scripting - Assignment 3",
    course: "Shell Scripting Mastery",
    questions: 10,
    duration: "45 min",
    difficulty: "Beginner",
    status: "Draft",
  },
  {
    id: 3,
    title: "C Programming - Final Exam",
    course: "C Programming Deep Dive",
    questions: 25,
    duration: "120 min",
    difficulty: "Advanced",
    status: "Published",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MentorPYQPage() {
  const [questionSets, setQuestionSets] = useState(initialQuestionSets);
  const [showCreateSet, setShowCreateSet] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [newSet, setNewSet] = useState({ title: "", course: "", duration: "", difficulty: "" });
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState([]);

  const handleCreateSet = () => {
    if (!newSet.title || !newSet.course || !newSet.duration || !newSet.difficulty) return;
    const set = {
      id: questionSets.length + 1,
      ...newSet,
      questions: 0,
      status: "Draft",
    };
    setQuestionSets([...questionSets, set]);
    setSelectedSet(set);
    setNewSet({ title: "", course: "", duration: "", difficulty: "" });
    setShowCreateSet(false);
    setShowAddQuestion(true);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text || !newQuestion.optionA || !newQuestion.optionB || !newQuestion.optionC || !newQuestion.optionD || !newQuestion.correctAnswer) return;
    setQuestions([...questions, { id: questions.length + 1, ...newQuestion }]);
    setNewQuestion({ text: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" });
  };

  if (showAddQuestion && selectedSet) {
    return (
      <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedSet.title}</h1>
            <p className="text-muted-foreground mt-1">{questions.length} questions added · {selectedSet.duration}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setShowAddQuestion(false); setSelectedSet(null); setQuestions([]); }}>
              Done
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add MCQ Question</CardTitle>
              <CardDescription>Question {questions.length + 1}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Question Text</Label>
                <Textarea
                  placeholder="e.g., Which command is used to change file permissions in Linux?"
                  rows={2}
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <span className="text-primary">A</span> Option
                  </Label>
                  <Input
                    placeholder="Option A"
                    value={newQuestion.optionA}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <span className="text-primary">B</span> Option
                  </Label>
                  <Input
                    placeholder="Option B"
                    value={newQuestion.optionB}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <span className="text-primary">C</span> Option
                  </Label>
                  <Input
                    placeholder="Option C"
                    value={newQuestion.optionC}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <span className="text-primary">D</span> Option
                  </Label>
                  <Input
                    placeholder="Option D"
                    value={newQuestion.optionD}
                    onChange={(e) => setNewQuestion({ ...newQuestion, optionD: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Correct Answer</Label>
                <Select value={newQuestion.correctAnswer} onValueChange={(val) => setNewQuestion({ ...newQuestion, correctAnswer: val })}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {questions.length > 0 && (
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-foreground text-sm">
                        <span className="text-primary mr-1">Q{q.id}.</span>
                        {q.text}
                      </p>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 ml-5">
                      {["A", "B", "C", "D"].map((opt) => (
                        <div
                          key={opt}
                          className={cn(
                            "text-xs px-3 py-1.5 rounded-md",
                            q.correctAnswer === opt
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {opt}. {q[`option${opt}`]}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">PYQ Management</h1>
          <p className="text-muted-foreground mt-1">{questionSets.length} question sets created</p>
        </div>
        <Button onClick={() => setShowCreateSet(!showCreateSet)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Question Set
        </Button>
      </motion.div>

      {showCreateSet && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Question Set</CardTitle>
              <CardDescription>Define the question set details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="e.g., Linux Midterm Exam"
                    value={newSet.title}
                    onChange={(e) => setNewSet({ ...newSet, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select value={newSet.course} onValueChange={(val) => setNewSet({ ...newSet, course: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Linux Fundamentals">Linux Fundamentals</SelectItem>
                      <SelectItem value="Shell Scripting Mastery">Shell Scripting Mastery</SelectItem>
                      <SelectItem value="C Programming Deep Dive">C Programming Deep Dive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    placeholder="e.g., 60 min"
                    value={newSet.duration}
                    onChange={(e) => setNewSet({ ...newSet, duration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={newSet.difficulty} onValueChange={(val) => setNewSet({ ...newSet, difficulty: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowCreateSet(false)}>Cancel</Button>
                <Button onClick={handleCreateSet}>Create & Add Questions</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" variants={item}>
        {questionSets.map((set) => (
          <Card key={set.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{set.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{set.course}</p>
                </div>
                <Badge variant={set.status === "Published" ? "success" : "secondary"}>
                  {set.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <List className="h-3.5 w-3.5" />
                  {set.questions} questions
                </span>
                <span>{set.duration}</span>
                <Badge variant="outline" className="text-xs">{set.difficulty}</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedSet(set);
                    setShowAddQuestion(true);
                    setQuestions([]);
                  }}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Qs
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
