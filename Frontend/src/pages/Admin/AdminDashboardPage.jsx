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
import { cn } from "../../lib/utils";

const stats = [
  { label: "Total Users", value: "2,847", change: "+12.5%", up: true, icon: Users, color: "text-blue-500" },
  { label: "Active Students", value: "1,234", change: "+8.2%", up: true, icon: GraduationCap, color: "text-emerald-500" },
  { label: "Revenue", value: "₹12,45,000", change: "+18.3%", up: true, icon: IndianRupee, color: "text-purple-500" },
  { label: "Completion Rate", value: "72%", change: "-2.1%", up: false, icon: TrendingUp, color: "text-orange-500" },
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
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and key metrics</p>
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
              <div className="flex items-center gap-1 mt-3">
                {stat.up ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={cn("text-xs font-medium", stat.up ? "text-emerald-500" : "text-red-500")}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
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
                <IndianRupee className="h-5 w-5 text-purple-500" />
                Revenue — Last 6 Months
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-48">
                {revenueData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium">
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-blue-500" />
                Recent Registrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRegistrations.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.course}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{user.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCourses.map((course) => (
                <div key={course.id} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm">{course.title}</h3>
                    <Badge variant="secondary">{course.students} students</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={cn("mt-0.5", alert.type === "error" ? "text-red-500" : alert.type === "warning" ? "text-orange-500" : "text-blue-500")}>
                    {alert.type === "error" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : alert.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
