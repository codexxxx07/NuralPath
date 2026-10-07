import {
  Users,
  IndianRupee,
  TrendingUp,
  Smile,
  Clock,
  BookOpen,
  MessageSquare,
  Award,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";

const keyMetrics = [
  { label: "Total Users", value: "2,847", change: "+12.5%", up: true, icon: Users },
  { label: "Total Revenue", value: "₹12,45,000", change: "+18.3%", up: true, icon: IndianRupee },
  { label: "Completion Rate", value: "72%", change: "-2.1%", up: false, icon: TrendingUp },
  { label: "Satisfaction", value: "4.7/5", change: "+0.3", up: true, icon: Smile },
];

const monthlyUsers = [
  { month: "Sep", value: 1820 },
  { month: "Oct", value: 1950 },
  { month: "Nov", value: 2080 },
  { month: "Dec", value: 2200 },
  { month: "Jan", value: 2320 },
  { month: "Feb", value: 2410 },
  { month: "Mar", value: 2500 },
  { month: "Apr", value: 2580 },
  { month: "May", value: 2650 },
  { month: "Jun", value: 2720 },
  { month: "Jul", value: 2790 },
  { month: "Aug", value: 2847 },
];

const maxUsers = Math.max(...monthlyUsers.map((d) => d.value));

const coursePerformance = [
  { title: "Advanced React & Next.js", students: 186, completion: 68, rating: 4.7, revenue: 372000, trend: "+15%" },
  { title: "Python for Data Science", students: 234, completion: 72, rating: 4.8, revenue: 468000, trend: "+22%" },
  { title: "Full Stack MERN Bootcamp", students: 198, completion: 55, rating: 4.6, revenue: 495000, trend: "+18%" },
  { title: "Linux Administration Pro", students: 142, completion: 81, rating: 4.9, revenue: 213000, trend: "+10%" },
  { title: "DevOps Bootcamp", students: 87, completion: 34, rating: 4.5, revenue: 0, trend: "New" },
];

const geographicData = [
  { region: "Maharashtra", users: 824, percentage: 29 },
  { region: "Karnataka", users: 541, percentage: 19 },
  { region: "Tamil Nadu", users: 427, percentage: 15 },
  { region: "Delhi NCR", users: 342, percentage: 12 },
  { region: "Telangana", users: 285, percentage: 10 },
  { region: "Other States", users: 428, percentage: 15 },
];

const engagementMetrics = [
  { metric: "Avg. Daily Active Users", value: "1,234", icon: Users, description: "Unique users active per day" },
  { metric: "Avg. Session Duration", value: "42 min", icon: Clock, description: "Average time spent per session" },
  { metric: "Assignments Submitted", value: "3,456", icon: BookOpen, description: "Total submissions this month" },
  { metric: "Doubts Resolved", value: "892", icon: MessageSquare, description: "Questions answered by mentors" },
  { metric: "Certificates Issued", value: "456", icon: Award, description: "Course completion certificates" },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Platform Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Comprehensive platform performance insights</p>
      </div>

      {/* Key metrics */}
      <div className="card-depth p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {keyMetrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-2xl/3xl font-semibold tracking-tight tabular-nums text-foreground">{metric.value}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {metric.change} vs last month
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* User growth */}
      <section>
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          User Growth — Last 12 Months
        </h2>
        <div className="flex h-52 items-stretch gap-2 pt-5">
          {monthlyUsers.map((d) => (
            <div key={d.month} className="flex h-full flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                {d.value.toLocaleString("en-IN")}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-foreground transition-all duration-500"
                  style={{ height: `${(d.value / maxUsers) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Course Performance
          </h2>
          <div className="mt-4">
            {coursePerformance.map((course) => (
              <div key={course.title} className="border-t border-border py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 truncate text-sm font-medium text-foreground">{course.title}</p>
                  <Badge variant={course.trend === "New" ? "secondary" : "outline"}>{course.trend}</Badge>
                </div>
                <div className="mt-2.5 flex items-center gap-4">
                  <Progress value={course.completion} className="flex-1" />
                  <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                    {course.completion}%
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  ★ {course.rating} rating · {course.students} students
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-10">
          <section>
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Geographic Distribution
            </h2>
            <div className="mt-4">
              {geographicData.map((geo) => (
                <div key={geo.region} className="border-t border-border py-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-foreground">{geo.region}</span>
                    <span className="tabular-nums text-muted-foreground">{geo.users} users ({geo.percentage}%)</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground transition-all duration-500"
                      style={{ width: `${geo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Engagement Metrics
            </h2>
            <div className="mt-4">
              {engagementMetrics.map((eng) => (
                <div key={eng.metric} className="flex items-baseline justify-between gap-4 border-t border-border py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{eng.metric}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{eng.description}</p>
                  </div>
                  <p className="shrink-0 text-sm font-medium tabular-nums text-foreground">{eng.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
