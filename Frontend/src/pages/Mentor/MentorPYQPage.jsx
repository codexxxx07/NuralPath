import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
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
      <div className="max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{selectedSet.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{questions.length} questions added · {selectedSet.duration}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setShowAddQuestion(false); setSelectedSet(null); setQuestions([]); }}>
              Done
            </Button>
          </div>
        </div>

        <section>
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Add MCQ Question</h2>
            <p className="text-xs text-muted-foreground">Question {questions.length + 1}</p>
          </div>
          <div className="space-y-4 pt-5">
            <div className="space-y-2">
              <Label>Question Text</Label>
              <Textarea
                placeholder="e.g., Which command is used to change file permissions in Linux?"
                rows={2}
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Option A</Label>
                <Input
                  placeholder="Option A"
                  value={newQuestion.optionA}
                  onChange={(e) => setNewQuestion({ ...newQuestion, optionA: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Option B</Label>
                <Input
                  placeholder="Option B"
                  value={newQuestion.optionB}
                  onChange={(e) => setNewQuestion({ ...newQuestion, optionB: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Option C</Label>
                <Input
                  placeholder="Option C"
                  value={newQuestion.optionC}
                  onChange={(e) => setNewQuestion({ ...newQuestion, optionC: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Option D</Label>
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
              <Button onClick={handleAddQuestion}>Add Question</Button>
            </div>
          </div>
        </section>

        {questions.length > 0 && (
          <section>
            <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
              Questions Preview
            </h2>
            <div>
              {questions.map((q) => (
                <div key={q.id} className="border-b border-border py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">
                      <span className="mr-1 text-muted-foreground">Q{q.id}.</span>
                      {q.text}
                    </p>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {["A", "B", "C", "D"].map((opt) => (
                      <div
                        key={opt}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-xs",
                          q.correctAnswer === opt
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {opt}. {q[`option${opt}`]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">PYQ Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">{questionSets.length} question sets created</p>
      </div>
        <Button onClick={() => setShowCreateSet(!showCreateSet)}>Create Question Set</Button>
      </div>

      {showCreateSet && (
        <section>
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Create New Question Set</h2>
            <p className="mt-1 text-xs text-muted-foreground">Define the question set details</p>
          </div>
          <div className="card-depth mt-5 p-5 sm:p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <Button onClick={handleCreateSet}>Create &amp; Add Questions</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Question Sets
        </h2>
        <div className="card-depth">
          {questionSets.map((set, idx) => (
            <div
              key={set.id}
              className={`flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-start sm:gap-8 sm:px-5 ${idx !== questionSets.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{set.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{set.course}</p>
                  </div>
                  <Badge variant={set.status === "Published" ? "success" : "secondary"} className="shrink-0">
                    {set.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {set.questions} questions · {set.duration} · {set.difficulty}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline">Preview</Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedSet(set);
                    setShowAddQuestion(true);
                    setQuestions([]);
                  }}
                >
                  Add Qs
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
