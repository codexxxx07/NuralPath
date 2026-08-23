import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  FileCheck,
  Video,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { cn } from "../../lib/utils";

const stats = [
  { label: "Active Courses", value: "3", icon: BookOpen, color: "text-blue-500" },
  { label: "Total Students", value: "148", icon: Users, color: "text-emerald-500" },
  { label: "Pending Submissions", value: "12", icon: FileCheck, color: "text-orange-500" },
  { label: "Live Classes This Week", value: "4", icon: Video, color: "text-purple-500" },
];

const upcomingClasses = [
  { id: 1, date: "Mon, Aug 25", time: "10:00 AM", topic: "Linux Kernel Internals", students: 42, course: "Linux Fundamentals" },
  { id: 2, date: "Tue, Aug 26", time: "2:00 PM", topic: "Advanced Shell Functions", students: 38, course: "Shell Scripting Mastery" },
  { id: 3, date: "Thu, Aug 28", time: "11:00 AM", topic: "C Memory Allocators", students: 35, course: "C Programming Deep Dive" },
];

const recentSubmissions = [
  { id: 1, student: "Priya Sharma", assignment: "Linux Process Lab", course: "Linux Fundamentals", submitted: "2 hours ago", status: "Pending" },
  { id: 2, student: "Arjun Mehta", assignment: "Shell Script #4", course: "Shell Scripting Mastery", submitted: "4 hours ago", status: "Pending" },
  { id: 3, student: "Neha Gupta", assignment: "C Pointers Exercise", course: "C Programming Deep Dive", submitted: "6 hours ago", status: "Pending" },
  { id: 4, student: "Rohan Verma", assignment: "Linux Networking Lab", course: "Linux Fundamentals", submitted: "Yesterday", status: "Reviewed" },
];

const engagementData = [
  { course: "Linux Fundamentals", students: 52, completion: 74, avgScore: 82 },
  { course: "Shell Scripting Mastery", students: 48, completion: 61, avgScore: 78 },
  { course: "C Programming Deep Dive", students: 48, completion: 56, avgScore: 75 },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MentorDashboardPage() {
  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Rahul Sharma</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={item}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className={cn("p-3 rounded-lg bg-muted", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Video className="h-5 w-5 text-purple-500" />
                Upcoming Live Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-center min-w-[48px]">
                    <p className="text-xs text-muted-foreground">{cls.date.split(",")[0]}</p>
                    <p className="text-sm font-semibold text-foreground">{cls.date.split(",")[1]?.trim()}</p>
                    <p className="text-xs text-primary">{cls.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{cls.topic}</p>
                    <p className="text-xs text-muted-foreground">{cls.course} · {cls.students} students</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5 text-orange-500" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{sub.student}</p>
                    <p className="text-xs text-muted-foreground truncate">{sub.assignment} · {sub.course}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <Badge variant={sub.status === "Pending" ? "destructive" : "success"}>
                      {sub.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{sub.submitted}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Student Engagement Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {engagementData.map((eng) => (
                <div key={eng.course} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{eng.course}</h3>
                    <span className="text-sm text-muted-foreground">{eng.students} students</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium text-foreground">{eng.completion}%</span>
                      </div>
                      <Progress value={eng.completion} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Avg Score</span>
                        <span className="font-medium text-foreground">{eng.avgScore}%</span>
                      </div>
                      <Progress value={eng.avgScore} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
