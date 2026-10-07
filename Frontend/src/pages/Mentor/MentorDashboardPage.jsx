import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

const stats = [
  { label: "Active Courses", value: "3" },
  { label: "Total Students", value: "148" },
  { label: "Pending Submissions", value: "12" },
  { label: "Live Classes This Week", value: "4" },
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

export default function MentorDashboardPage() {
  return (
    <div className="max-w-6xl space-y-12">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Mentor Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, Rahul Sharma</p>
      </div>

      {/* Stats */}
      <div className="card-depth p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl/3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Upcoming Live Classes */}
        <section>
          <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Upcoming Live Classes
          </h2>
          <div className="card-depth">
            {upcomingClasses.map((cls, idx) => (
              <div
                key={cls.id}
                className={`flex items-start gap-4 px-4 py-4 sm:px-5 ${idx !== upcomingClasses.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="w-24 shrink-0">
                  <p className="text-xs text-muted-foreground">{cls.date.split(",")[0]}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{cls.date.split(",")[1]?.trim()}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{cls.time}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{cls.topic}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{cls.course} · {cls.students} students</p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  Start
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Submissions */}
        <section>
          <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Recent Submissions
          </h2>
          <div className="card-depth">
            {recentSubmissions.map((sub, idx) => (
              <div
                key={sub.id}
                className={`flex items-start justify-between gap-4 px-4 py-4 sm:px-5 ${idx !== recentSubmissions.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{sub.student}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{sub.assignment} · {sub.course}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-muted-foreground">{sub.submitted}</span>
                  <Badge variant={sub.status === "Pending" ? "secondary" : "success"}>
                    {sub.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Student Engagement Summary */}
      <section>
        <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Student Engagement Summary
        </h2>
        <div className="card-depth">
          {engagementData.map((eng, idx) => (
            <div
              key={eng.course}
              className={`px-4 py-5 sm:px-5 ${idx !== engagementData.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-foreground">{eng.course}</p>
                <p className="text-xs text-muted-foreground">{eng.students} students</p>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-8">
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">Completion</span>
                  <Progress value={eng.completion} className="flex-1" />
                  <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                    {eng.completion}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-xs text-muted-foreground">Avg Score</span>
                  <Progress value={eng.avgScore} className="flex-1" />
                  <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                    {eng.avgScore}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
