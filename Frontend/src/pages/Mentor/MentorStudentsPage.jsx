import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

const students = [
  { id: 1, name: "Priya Sharma", initials: "PS", email: "priya.sharma@email.com", course: "Linux Fundamentals", progress: 82, lastActive: "2 hours ago", status: "Active", enrolled: "Jun 15, 2026", quizzes: 8, avgScore: 88 },
  { id: 2, name: "Arjun Mehta", initials: "AM", email: "arjun.mehta@email.com", course: "Shell Scripting Mastery", progress: 65, lastActive: "5 hours ago", status: "Active", enrolled: "Jul 1, 2026", quizzes: 6, avgScore: 79 },
  { id: 3, name: "Neha Gupta", initials: "NG", email: "neha.gupta@email.com", course: "C Programming Deep Dive", progress: 71, lastActive: "Yesterday", status: "Active", enrolled: "Jun 20, 2026", quizzes: 7, avgScore: 82 },
  { id: 4, name: "Rohan Verma", initials: "RV", email: "rohan.verma@email.com", course: "Linux Fundamentals", progress: 90, lastActive: "3 hours ago", status: "Active", enrolled: "May 10, 2026", quizzes: 9, avgScore: 92 },
  { id: 5, name: "Kavya Singh", initials: "KS", email: "kavya.singh@email.com", course: "Shell Scripting Mastery", progress: 48, lastActive: "2 days ago", status: "Idle", enrolled: "Jul 5, 2026", quizzes: 4, avgScore: 71 },
  { id: 6, name: "Vikram Patel", initials: "VP", email: "vikram.patel@email.com", course: "C Programming Deep Dive", progress: 55, lastActive: "1 day ago", status: "Active", enrolled: "Jun 25, 2026", quizzes: 5, avgScore: 76 },
  { id: 7, name: "Sneha Reddy", initials: "SR", email: "sneha.reddy@email.com", course: "Linux Fundamentals", progress: 38, lastActive: "5 days ago", status: "Inactive", enrolled: "Jul 10, 2026", quizzes: 3, avgScore: 65 },
  { id: 8, name: "Aditya Kumar", initials: "AK", email: "aditya.kumar@email.com", course: "Shell Scripting Mastery", progress: 72, lastActive: "4 hours ago", status: "Active", enrolled: "Jun 18, 2026", quizzes: 7, avgScore: 85 },
  { id: 9, name: "Meera Joshi", initials: "MJ", email: "meera.joshi@email.com", course: "C Programming Deep Dive", progress: 60, lastActive: "3 days ago", status: "Idle", enrolled: "Jul 8, 2026", quizzes: 5, avgScore: 74 },
  { id: 10, name: "Ravi Shankar", initials: "RS", email: "ravi.shankar@email.com", course: "Linux Fundamentals", progress: 85, lastActive: "1 hour ago", status: "Active", enrolled: "May 20, 2026", quizzes: 8, avgScore: 90 },
];

export default function MentorStudentsPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (courseFilter !== "all" && !s.course.toLowerCase().includes(courseFilter)) return false;
    return true;
  });

  const statusColor = (status) => {
    if (status === "Active") return "success";
    if (status === "Idle") return "secondary";
    return "outline";
  };

  if (selectedStudent) {
    return (
      <div className="max-w-6xl space-y-10">
        <Button variant="ghost" onClick={() => setSelectedStudent(null)} className="-ml-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </Button>

        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-base">{selectedStudent.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{selectedStudent.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{selectedStudent.email}</p>
          </div>
          <Badge variant={statusColor(selectedStudent.status)}>{selectedStudent.status}</Badge>
        </div>

        <div className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
          <div className="border-b border-border py-5 pr-6">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedStudent.progress}%</p>
            <p className="mt-1 text-sm text-muted-foreground">Progress</p>
          </div>
          <div className="border-b border-border py-5 pr-6">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedStudent.quizzes}</p>
            <p className="mt-1 text-sm text-muted-foreground">Quizzes Taken</p>
          </div>
          <div className="border-b border-border py-5 pr-6">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedStudent.avgScore}%</p>
            <p className="mt-1 text-sm text-muted-foreground">Avg Score</p>
          </div>
          <div className="border-b border-border py-5 pr-6">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedStudent.lastActive}</p>
            <p className="mt-1 text-sm text-muted-foreground">Last Active</p>
          </div>
        </div>

        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Details
          </h2>
          <div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border py-4">
              <span className="text-sm font-medium text-foreground">Course</span>
              <span className="text-sm text-muted-foreground">{selectedStudent.course}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border py-4">
              <span className="text-sm font-medium text-foreground">Enrolled On</span>
              <span className="text-sm text-muted-foreground">{selectedStudent.enrolled}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border py-4">
              <span className="text-sm font-medium text-foreground">Course Progress</span>
              <div className="flex w-full max-w-xs items-center gap-3">
                <Progress value={selectedStudent.progress} className="flex-1" />
                <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {selectedStudent.progress}%
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-10">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">My Students</h1>
        <p className="mt-1 text-sm text-muted-foreground">{students.length} students across all courses</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name or email..."
          className="sm:max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
      </div>

      <div className="card-depth">
        {filteredStudents.map((student, idx) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className={`flex cursor-pointer flex-col gap-3 px-4 py-4 transition-colors hover:bg-accent/60 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5 ${idx !== filteredStudents.length - 1 ? "border-b border-border" : ""}`}
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback>{student.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{student.name}</p>
                <Badge variant={statusColor(student.status)} className="text-xs">{student.status}</Badge>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{student.email}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{student.course}</p>
            </div>
            <div className="w-full shrink-0 sm:w-40">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span className="font-mono">{student.progress}%</span>
              </div>
              <Progress value={student.progress} />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-4 text-xs text-muted-foreground sm:block sm:text-right">
              <span>{student.lastActive}</span>
              <span className="sm:mt-0.5 sm:block">Avg: {student.avgScore}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
