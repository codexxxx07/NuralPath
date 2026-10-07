import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

const weeklyHours = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 4.5 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 3.0 },
  { day: "Sat", hours: 5.0 },
  { day: "Sun", hours: 2.5 },
];

const maxHours = Math.max(...weeklyHours.map((d) => d.hours));

const streakDays = [
  true, true, true, false, true, true, true,
  true, true, true, true, false, true, true,
  true, true, true, true, true, false, true,
  true, true, true, true, true, true, true,
];

const courseProgress = [
  { name: "Linux Fundamentals", progress: 72, completed: 17, total: 24, currentTopic: "File Permissions" },
  { name: "Shell Scripting Mastery", progress: 45, completed: 9, total: 20, currentTopic: "Loops & Conditionals" },
  { name: "C Programming Deep Dive", progress: 88, completed: 26, total: 30, currentTopic: "Memory Management" },
  { name: "Open Source Contribution", progress: 30, completed: 5, total: 16, currentTopic: "Finding First Issue" },
];

const skills = [
  { name: "Linux", progress: 75, hours: 42, assessments: 8 },
  { name: "Shell", progress: 60, hours: 28, assessments: 5 },
  { name: "C", progress: 80, hours: 35, assessments: 7 },
  { name: "Git", progress: 55, hours: 12, assessments: 3 },
  { name: "Open Source", progress: 40, hours: 11, assessments: 2 },
];

const quizScores = [
  { quiz: "Linux Basics Quiz", score: 92, date: "Aug 15", course: "Linux Fundamentals" },
  { quiz: "Shell Variables Quiz", score: 95, date: "Aug 10", course: "Shell Scripting Mastery" },
  { quiz: "C Pointers Quiz", score: 88, date: "Aug 12", course: "C Programming Deep Dive" },
  { quiz: "Linux Navigation Quiz", score: 85, date: "Aug 8", course: "Linux Fundamentals" },
  { quiz: "Git Basics Quiz", score: 90, date: "Aug 5", course: "Open Source Contribution" },
];

const overallProgress = Math.round(courseProgress.reduce((acc, c) => acc + c.progress, 0) / courseProgress.length);

export default function ProgressPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Your Progress</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      {/* Stats */}
      <div className="card-depth p-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div>
            <dd className="text-2xl font-semibold tracking-tight text-foreground">{overallProgress}%</dd>
            <dt className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Overall Progress
            </dt>
          </div>
          <div>
            <dd className="text-2xl font-semibold tracking-tight text-foreground">12 Days</dd>
            <dt className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Current Streak
            </dt>
          </div>
          <div>
            <dd className="text-2xl font-semibold tracking-tight text-foreground">128 hrs</dd>
            <dt className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Total Learning
            </dt>
          </div>
        </dl>
      </div>

      {/* Weekly hours + streak */}
      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Weekly Learning Hours
          </h2>
          <div className="mt-5 flex items-end justify-between gap-2">
            {weeklyHours.map((day) => (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-mono text-xs text-muted-foreground">{day.hours}h</span>
                <div className="flex h-24 w-full items-end">
                  <div
                    className="w-full rounded-sm bg-foreground"
                    style={{
                      height: `${(day.hours / maxHours) * 100}%`,
                      minHeight: "4px",
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Streak Calendar
          </h2>
          <div className="mt-5 grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={`header-${i}`} className="py-1 text-center text-xs font-medium text-muted-foreground">
                {d}
              </div>
            ))}
            {streakDays.map((active, i) => (
              <div
                key={i}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-md text-xs",
                  active ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-foreground" /> Active
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-muted" /> Missed
            </div>
          </div>
        </section>
      </div>

      {/* Course Progress */}
      <section>
        <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Course Progress
        </h2>
        <div>
          {courseProgress.map((course) => (
            <div
              key={course.name}
              className="flex flex-col gap-3 border-b border-border py-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{course.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {course.completed}/{course.total} lessons · Current: {course.currentTopic}
                </p>
              </div>
              <div className="flex w-full items-center gap-4 sm:w-56">
                <Progress value={course.progress} className="flex-1" />
                <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {course.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Progress */}
      <section>
        <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Skill Progress
        </h2>
        <div>
          {skills.map((skill) => (
            <div key={skill.name} className="border-b border-border py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-foreground">{skill.name}</p>
                <span className="font-mono text-xs text-muted-foreground">{skill.progress}%</span>
              </div>
              <Progress value={skill.progress} className="mt-2 h-1.5" />
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <span>{skill.hours} hours</span>
                <span>{skill.assessments} assessments</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Scores */}
      <section>
        <h2 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Quiz Scores
        </h2>
        <div>
          {quizScores.map((quiz, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-b border-border py-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{quiz.quiz}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{quiz.course} · {quiz.date}</p>
              </div>
              <Badge variant={quiz.score >= 90 ? "success" : "secondary"} className="shrink-0">
                {quiz.score}%
              </Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
