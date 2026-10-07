import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";

const stats = [
  { label: "Courses", value: "04" },
  { label: "Hours learned", value: "128" },
  { label: "Day streak", value: "12" },
  { label: "Certificates", value: "02" },
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
  { id: 1, action: "Completed lesson: Linux File System Hierarchy", time: "2h ago" },
  { id: 2, action: "Submitted assignment: Shell Script Assignment #3", time: "5h ago" },
  { id: 3, action: "Attended live class: C Memory Allocation", time: "Yesterday" },
  { id: 4, action: "Scored 92% on Linux Quiz", time: "2 days ago" },
  { id: 5, action: "Started new course: Open Source Contribution", time: "3 days ago" },
];

const quickActions = [
  { to: "/dashboard/practice-lab", label: "Practice Lab", desc: "Hands-on terminal" },
  { to: "/dashboard/live-classes", label: "Live Classes", desc: "Join upcoming sessions" },
  { to: "/dashboard/doubts", label: "Doubt Solving", desc: "Ask your questions" },
];

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
    <div className="space-y-12">
      <div>
        <Button variant="outline" size="sm" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Good evening, Arjun.
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{today}</p>
      </div>

      {/* Stats */}
      <div className="card-depth p-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </dd>
              <dt className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Continue Learning */}
      <section className="card-depth p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Continue Learning
          </h2>
          <Link
            to="/dashboard/courses"
            className="text-xs font-medium text-primary transition-colors duration-200 hover:text-primary/80"
          >
            View all
          </Link>
        </div>
        <div className="mt-4">
          {activeCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col gap-3 border-t border-border py-4 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{course.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Next: {course.nextClass} · {course.instructor}
                </p>
              </div>
              <div className="flex w-full items-center gap-4 sm:w-64">
                <Progress value={course.progress} className="flex-1" />
                <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {course.progress}%
                </span>
              </div>
              <Link
                to="/dashboard/courses"
                className="flex shrink-0 items-center gap-1 text-sm text-primary transition-colors duration-200 hover:text-primary/80"
              >
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule + Activity */}
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Upcoming Schedule
          </h2>
          <div className="mt-4">
            {upcomingSchedule.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 border-t border-border py-4"
              >
                <div className="w-24 shrink-0">
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {event.time}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{event.topic}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {event.mentor} · {event.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Recent Activity
          </h2>
          <div className="mt-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-baseline justify-between gap-4 border-t border-border py-4"
              >
                <p className="min-w-0 truncate text-sm text-foreground">
                  {activity.action}
                </p>
                <p className="shrink-0 text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Quick Actions
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="card-depth card-depth-hover group flex items-center justify-between gap-4 p-5"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{action.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
