import {
  Users,
  GraduationCap,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
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

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform overview and key metrics</p>
      </div>

      {/* Stats */}
      <div className="card-depth p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl/3xl font-semibold tracking-tight tabular-nums text-foreground">{stat.value}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {stat.change} vs last month
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue + Recent Registrations */}
      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Revenue — Last 6 Months
          </h2>
          <div className="flex h-48 items-stretch gap-3 pt-5">
            {revenueData.map((d) => (
              <div key={d.month} className="flex h-full flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  ₹{(d.value / 100000).toFixed(1)}L
                </span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-foreground transition-all duration-500"
                    style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Recent Registrations
          </h2>
          <div className="mt-4">
            {recentRegistrations.map((user) => (
              <div key={user.id} className="flex items-center gap-3 border-t border-border py-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-[10px]">{user.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.course}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{user.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Active Courses + System Alerts */}
      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Active Courses
          </h2>
          <div className="mt-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="border-t border-border py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="min-w-0 truncate text-sm font-medium text-foreground">
                    {course.title}
                  </p>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {course.students} students
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-4">
                  <Progress value={course.completion} className="flex-1" />
                  <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                    {course.completion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            System Alerts
          </h2>
          <div className="mt-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between gap-4 border-t border-border py-4">
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className={alert.type === "error" ? "text-destructive" : undefined}>
                      {alert.type === "error"
                        ? "Error"
                        : alert.type === "warning"
                        ? "Warning"
                        : "Info"}
                    </span>
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4">
            View All Alerts
          </Button>
        </section>
      </div>
    </div>
  );
}
