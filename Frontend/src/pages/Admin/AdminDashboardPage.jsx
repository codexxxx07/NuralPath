import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

const stats = [
  { label: "Total Users", value: "2,847", change: "+12.5%", up: true, icon: Users },
  { label: "Active Students", value: "1,234", change: "+8.2%", up: true, icon: GraduationCap },
  { label: "Revenue", value: "₹12,45,000", change: "+18.3%", up: true, icon: IndianRupee },
  { label: "Completion Rate", value: "72%", change: "-2.1%", up: false, icon: TrendingUp },
];

const revenueData = [
  { month: "Mar", value: 820000 },
  { month: "Apr", value: 950000 },
  { month: "May", value: 1100000 },
  { month: "Jun", value: 980000 },
  { month: "Jul", value: 1250000 },
  { month: "Aug", value: 1345000 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const recentRegistrations = [
  { id: 1, name: "Aarav Patel", email: "aarav.patel@email.com", course: "Advanced React", date: "Aug 23, 2026", initials: "AP" },
  { id: 2, name: "Sneha Reddy", email: "sneha.r@email.com", course: "Python for Data Science", date: "Aug 22, 2026", initials: "SR" },
  { id: 3, name: "Vikram Singh", email: "vikram.s@email.com", course: "Full Stack MERN", date: "Aug 22, 2026", initials: "VS" },
  { id: 4, name: "Ananya Joshi", email: "ananya.j@email.com", course: "Linux Administration", date: "Aug 21, 2026", initials: "AJ" },
  { id: 5, name: "Karthik Nair", email: "karthik.n@email.com", course: "DevOps Bootcamp", date: "Aug 21, 2026", initials: "KN" },
];

const activeCourses = [
  { id: 1, title: "Advanced React & Next.js", students: 186, completion: 68, status: "Active" },
  { id: 2, title: "Python for Data Science", students: 234, completion: 72, status: "Active" },
  { id: 3, title: "Full Stack MERN Bootcamp", students: 198, completion: 55, status: "Active" },
  { id: 4, title: "Linux Administration Pro", students: 142, completion: 81, status: "Active" },
];

const systemAlerts = [
  { id: 1, type: "warning", message: "Server disk usage at 78% — consider cleanup", time: "2 hours ago" },
  { id: 2, type: "info", message: "Scheduled maintenance window: Aug 25, 2:00 AM IST", time: "5 hours ago" },
  { id: 3, type: "error", message: "Payment gateway timeout spike detected (3 occurrences)", time: "8 hours ago" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboardPage() {
  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform overview and key metrics</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-4 lg:grid-cols-4" variants={item}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {stat.up ? (
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="text-xs font-medium text-foreground">{stat.change}</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                Revenue — Last 6 Months
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-3">
                {revenueData.map((d) => (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      ₹{(d.value / 100000).toFixed(1)}L
                    </span>
                    <motion.div
                      className="w-full rounded-t-md bg-primary"
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.value / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                    <span className="text-xs text-muted-foreground">{d.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <Users className="h-4 w-4 text-muted-foreground" />
                Recent Registrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentRegistrations.map((user) => (
                <div key={user.id} className="flex items-center gap-3 rounded-md bg-muted p-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.course}</p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-muted-foreground">{user.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeCourses.map((course) => (
                <div key={course.id} className="rounded-md bg-muted p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">{course.title}</h3>
                    <Badge variant="secondary">{course.students} students</Badge>
                  </div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium text-foreground">{course.completion}%</span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 rounded-md bg-muted p-3">
                  <div className={`mt-0.5 ${alert.type === "error" ? "text-destructive" : "text-muted-foreground"}`}>
                    {alert.type === "info" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="mt-2 w-full">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
