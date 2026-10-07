const stats = [
  { label: "Avg Completion Rate", value: "64%", change: "+5%" },
  { label: "Avg Quiz Score", value: "79%", change: "+3%" },
  { label: "Active Students", value: "128", change: "+12" },
  { label: "Total Revenue", value: "₹4.2L", change: "+18%" },
];

const coursePerformance = [
  { name: "Linux Fundamentals", completion: 74, avgScore: 82, students: 52, rating: 4.8 },
  { name: "Shell Scripting", completion: 61, avgScore: 78, students: 48, rating: 4.6 },
  { name: "C Programming", completion: 56, avgScore: 75, students: 48, rating: 4.5 },
];

const progressDistribution = [
  { range: "0-25%", count: 18 },
  { range: "26-50%", count: 32 },
  { range: "51-75%", count: 45 },
  { range: "76-100%", count: 53 },
];

const engagementMetrics = [
  { label: "Avg Daily Active", value: "42" },
  { label: "Avg Session Time", value: "48 min" },
  { label: "Assignment Submit Rate", value: "87%" },
  { label: "Live Class Attendance", value: "91%" },
];

export default function MentorAnalyticsPage() {
  const maxStudents = Math.max(...progressDistribution.map((d) => d.count));

  return (
    <div className="max-w-6xl space-y-12">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Insights across all your courses</p>
      </div>

      {/* Stats */}
      <div className="card-depth p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl/3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Course Performance */}
        <section>
          <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Course Performance
          </h2>
          <div className="card-depth">
            {coursePerformance.map((course, idx) => (
              <div
                key={course.name}
                className={`px-4 py-5 sm:px-5 ${idx !== coursePerformance.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium text-foreground">{course.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {course.students} students · ★ {course.rating}
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-xs text-muted-foreground">Completion</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-xs text-foreground">{course.completion}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-xs text-muted-foreground">Avg Score</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/70 transition-all duration-500"
                        style={{ width: `${course.avgScore}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-xs text-foreground">{course.avgScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Student Progress Distribution */}
        <section>
          <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Student Progress Distribution
          </h2>
          <div className="card-depth">
            {progressDistribution.map((dist, idx) => (
              <div
                key={dist.range}
                className={`flex items-center gap-4 px-4 py-4 sm:px-5 ${idx !== progressDistribution.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="w-16 shrink-0 text-xs text-muted-foreground">{dist.range}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(dist.count / maxStudents) * 100}%` }}
                  />
                </div>
                <span className="w-24 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {dist.count} students
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-4 sm:px-5">
              <span className="text-sm text-muted-foreground">Total Students</span>
              <span className="text-base font-semibold text-foreground">148</span>
            </div>
          </div>
        </section>
      </div>

      {/* Engagement Metrics */}
      <section>
        <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Engagement Metrics
        </h2>
        <div className="card-depth p-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {engagementMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl/3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
