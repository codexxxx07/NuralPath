import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Flame,
  Award,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Play,
  HelpCircle,
  Terminal,
  CheckCircle2,
  FileText,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const stats = [
  { label: "Courses Enrolled", value: "4", icon: BookOpen, color: "text-blue-500" },
  { label: "Hours Learned", value: "128", icon: Clock, color: "text-emerald-500" },
  { label: "Day Streak", value: "12", icon: Flame, color: "text-orange-500" },
  { label: "Certificates", value: "2", icon: Award, color: "text-purple-500" },
];

const activeCourses = [
  { id: 1, name: "Linux Fundamentals", progress: 72, nextClass: "File Permissions & chmod", instructor: "Rahul Sharma" },
  { id: 2, name: "Shell Scripting Mastery", progress: 45, nextClass: "Loops & Conditionals", instructor: "Priya Mehta" },
  { id: 3, name: "C Programming Deep Dive", progress: 88, nextClass: "Memory Management", instructor: "Amit Verma" },
  { id: 4, name: "Open Source Contribution", progress: 30, nextClass: "Finding Your First Issue", instructor: "Neha Gupta" },
];

const upcomingSchedule = [
  { id: 1, date: "Mon, Aug 25", time: "10:00 AM", topic: "Linux Process Management", mentor: "Rahul Sharma", type: "Live Class" },
  { id: 2, date: "Tue, Aug 26", time: "2:00 PM", topic: "Shell Scripting Lab", mentor: "Priya Mehta", type: "Practice Lab" },
  { id: 3, date: "Wed, Aug 27", time: "11:00 AM", topic: "C Pointers Workshop", mentor: "Amit Verma", type: "Workshop" },
  { id: 4, date: "Thu, Aug 28", time: "3:00 PM", topic: "Open Source PR Review", mentor: "Neha Gupta", type: "Mentor Session" },
];

const recentActivity = [
  { id: 1, action: "Completed lesson: Linux File System Hierarchy", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-500" },
  { id: 2, action: "Submitted assignment: Shell Script Assignment #3", time: "5 hours ago", icon: FileText, color: "text-blue-500" },
  { id: 3, action: "Attended live class: C Memory Allocation", time: "Yesterday", icon: Users, color: "text-purple-500" },
  { id: 4, action: "Scored 92% on Linux Quiz", time: "2 days ago", icon: Award, color: "text-orange-500" },
  { id: 5, action: "Started new course: Open Source Contribution", time: "3 days ago", icon: BookOpen, color: "text-blue-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <Button variant="outline" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Arjun</h1>
        <p className="text-muted-foreground mt-1">{today}</p>
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

      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Active Courses</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/courses">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {activeCourses.map((course) => (
            <Card key={course.id} className="min-w-[280px] flex-shrink-0">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">{course.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{course.progress}% complete</span>
                  <span>{course.instructor}</span>
                </div>
                <Progress value={course.progress} className="h-2 mb-3" />
                <div className="flex items-center text-sm">
                  <Play className="h-3.5 w-3.5 text-primary mr-2" />
                  <span className="text-muted-foreground">Next: {course.nextClass}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSchedule.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-center min-w-[48px]">
                    <p className="text-xs text-muted-foreground">{event.date.split(",")[0]}</p>
                    <p className="text-sm font-semibold text-foreground">{event.date.split(",")[1]?.trim()}</p>
                    <p className="text-xs text-primary">{event.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{event.topic}</p>
                    <p className="text-xs text-muted-foreground">{event.mentor} · {event.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <activity.icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", activity.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/dashboard/practice-lab">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10">
                  <Terminal className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Practice Lab</p>
                  <p className="text-sm text-muted-foreground">Hands-on terminal</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/live-classes">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Play className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Live Classes</p>
                  <p className="text-sm text-muted-foreground">Join upcoming sessions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/doubts">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <HelpCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Doubt Solving</p>
                  <p className="text-sm text-muted-foreground">Ask your questions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
