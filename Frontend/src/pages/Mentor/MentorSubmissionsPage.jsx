import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Filter,
  ChevronRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
      <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Button variant="ghost" onClick={() => setSelectedSubmission(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Submissions
          </Button>
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{selectedSubmission.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{selectedSubmission.student}</h1>
              <p className="text-muted-foreground">{selectedSubmission.assignment} · {selectedSubmission.course}</p>
            </div>
            <Badge variant={selectedSubmission.status === "Pending" ? "destructive" : "success"} className="ml-auto">
              {selectedSubmission.status}
            </Badge>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Submitted Work</CardTitle>
              <CardDescription>Submitted {selectedSubmission.submitted}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm text-foreground whitespace-pre-wrap">
                {selectedSubmission.content}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Grade & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <Send className="h-4 w-4 mr-2" />
                  Submit Grade
                </Button>
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
        <h1 className="text-3xl font-bold text-foreground">Student Submissions</h1>
        <p className="text-muted-foreground mt-1">{submissions.filter((s) => s.status === "Pending").length} pending reviews</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filters:</span>
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
      </motion.div>

      <motion.div className="space-y-3" variants={item}>
        {filteredSubmissions.map((sub) => (
          <Card key={sub.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedSubmission(sub)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{sub.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{sub.student}</h3>
                    <Badge variant={sub.status === "Pending" ? "destructive" : "success"} className="text-xs">
                      {sub.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{sub.assignment} · {sub.course}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{sub.submitted}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
