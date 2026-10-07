import { useState } from "react";
import { ChevronRight, ArrowLeft, Send } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

const submissions = [
  { id: 1, student: "Priya Sharma", initials: "PS", assignment: "Linux Process Lab", course: "Linux Fundamentals", submitted: "2 hours ago", status: "Pending", content: "Process management using fork(), exec(), and wait() system calls. Created a process tree visualization script." },
  { id: 2, student: "Arjun Mehta", initials: "AM", assignment: "Shell Script #4 - File Automation", course: "Shell Scripting Mastery", submitted: "4 hours ago", status: "Pending", content: "Automated file organization using find, sort, and mv commands. Script renames and categorizes files by extension." },
  { id: 3, student: "Neha Gupta", initials: "NG", assignment: "C Pointers Exercise", course: "C Programming Deep Dive", submitted: "6 hours ago", status: "Pending", content: "Implemented a dynamic array using malloc, realloc, and free. Demonstrated pointer arithmetic and array traversal." },
  { id: 4, student: "Rohan Verma", initials: "RV", assignment: "Linux Networking Lab", course: "Linux Fundamentals", submitted: "Yesterday", status: "Reviewed", grade: "A", feedback: "Excellent work on socket programming.", content: "TCP client-server implementation using socket(), bind(), listen(), and accept()." },
  { id: 5, student: "Kavya Singh", initials: "KS", assignment: "Shell Script #3 - Text Processing", course: "Shell Scripting Mastery", submitted: "Yesterday", status: "Reviewed", grade: "B+", feedback: "Good use of awk and sed.", content: "Log analysis script using grep, awk, and sed to extract error patterns." },
  { id: 6, student: "Vikram Patel", initials: "VP", assignment: "C Memory Management", course: "C Programming Deep Dive", submitted: "2 days ago", status: "Reviewed", grade: "A-", feedback: "Solid understanding of memory allocation.", content: "Custom memory allocator implementation with free list management." },
  { id: 7, student: "Sneha Reddy", initials: "SR", assignment: "Linux Shell Customization", course: "Linux Fundamentals", submitted: "2 days ago", status: "Pending", content: "Custom bash prompt configuration with color codes, git branch display, and performance metrics." },
  { id: 8, student: "Aditya Kumar", initials: "AK", assignment: "Shell Script #4 - File Automation", course: "Shell Scripting Mastery", submitted: "3 days ago", status: "Pending", content: "File backup automation with timestamp naming and rotation policy implementation." },
];

export default function MentorSubmissionsPage() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredSubmissions = submissions.filter((sub) => {
    if (courseFilter !== "all" && !sub.course.toLowerCase().includes(courseFilter)) return false;
    if (statusFilter !== "all" && sub.status.toLowerCase() !== statusFilter) return false;
    return true;
  });

  const handleSubmitGrade = () => {
    if (!grade || !feedback) return;
    alert(`Grade ${grade} submitted for ${selectedSubmission.student}`);
    setSelectedSubmission(null);
    setGrade("");
    setFeedback("");
  };

  if (selectedSubmission) {
    return (
      <div className="max-w-6xl space-y-10">
        <div>
          <Button variant="ghost" onClick={() => setSelectedSubmission(null)} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Submissions
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{selectedSubmission.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">{selectedSubmission.student}</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{selectedSubmission.assignment} · {selectedSubmission.course}</p>
            </div>
            <Badge variant={selectedSubmission.status === "Pending" ? "secondary" : "success"}>
              {selectedSubmission.status}
            </Badge>
          </div>
        </div>

        <section>
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Submitted Work</h2>
            <p className="text-xs text-muted-foreground">Submitted {selectedSubmission.submitted}</p>
          </div>
          <div className="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm text-foreground">
            {selectedSubmission.content}
          </div>
        </section>

        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Grade &amp; Feedback
          </h2>
          <div className="space-y-4 pt-5">
            <div className="space-y-2">
              <Label>Grade</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A (90-100%)</SelectItem>
                  <SelectItem value="A-">A- (85-89%)</SelectItem>
                  <SelectItem value="B+">B+ (80-84%)</SelectItem>
                  <SelectItem value="B">B (75-79%)</SelectItem>
                  <SelectItem value="B-">B- (70-74%)</SelectItem>
                  <SelectItem value="C+">C+ (65-69%)</SelectItem>
                  <SelectItem value="C">C (60-64%)</SelectItem>
                  <SelectItem value="D">D (50-59%)</SelectItem>
                  <SelectItem value="F">F (Below 50%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Feedback</Label>
              <Textarea
                placeholder="Provide constructive feedback on the submission..."
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmitGrade} disabled={!grade || !feedback}>
                <Send className="h-4 w-4" />
                Submit Grade
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-10">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Student Submissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">{submissions.filter((s) => s.status === "Pending").length} pending reviews</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="text-xs text-muted-foreground">Filters</span>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="linux">Linux Fundamentals</SelectItem>
            <SelectItem value="shell">Shell Scripting Mastery</SelectItem>
            <SelectItem value="c">C Programming Deep Dive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="card-depth">
        {filteredSubmissions.map((sub, idx) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubmission(sub)}
            className={`flex cursor-pointer items-center gap-4 px-4 py-4 transition-colors hover:bg-accent/60 sm:px-5 ${idx !== filteredSubmissions.length - 1 ? "border-b border-border" : ""}`}
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback>{sub.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{sub.student}</p>
                <Badge variant={sub.status === "Pending" ? "secondary" : "success"} className="text-xs">
                  {sub.status}
                </Badge>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{sub.assignment} · {sub.course}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{sub.submitted}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}
