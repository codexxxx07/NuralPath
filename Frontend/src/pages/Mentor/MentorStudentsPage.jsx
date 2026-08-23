import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Mail,
  Clock,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
    return "destructive";
  };

  if (selectedStudent) {
    return (
      <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Button variant="ghost" onClick={() => setSelectedStudent(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{selectedStudent.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{selectedStudent.name}</h1>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                  <Badge variant={statusColor(selectedStudent.status)} className="mt-1">{selectedStudent.status}</Badge>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{selectedStudent.progress}%</p>
                  <p className="text-sm text-muted-foreground">Progress</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{selectedStudent.quizzes}</p>
                  <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{selectedStudent.avgScore}%</p>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{selectedStudent.lastActive}</p>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Course</h3>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{selectedStudent.course}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Enrolled On</h3>
                  <span className="text-muted-foreground">{selectedStudent.enrolled}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Course Progress</h3>
                  <div className="flex items-center gap-3">
                    <Progress value={selectedStudent.progress} className="h-3 flex-1" />
                    <span className="text-sm font-medium text-foreground">{selectedStudent.progress}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">My Students</h1>
        <p className="text-muted-foreground mt-1">{students.length} students across all courses</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={item}>
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedStudent(student)}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{student.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <Badge variant={statusColor(student.status)} className="text-xs">{student.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">{student.course}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {student.lastActive}
                </span>
                <span>Avg: {student.avgScore}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
