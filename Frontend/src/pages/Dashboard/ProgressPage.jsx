import { motion } from "framer-motion";
import { TrendingUp, Flame, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProgressPage() {
  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Your Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your learning journey and achievements</p>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={item}>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{overallProgress}%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">12 Days</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">128 hrs</p>
                <p className="text-sm text-muted-foreground">Total Learning</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Learning Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-40">
                {weeklyHours.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">{day.hours}h</span>
                    <motion.div
                      className="w-full rounded-t-md bg-primary"
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      style={{ minHeight: "4px" }}
                    />
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Streak Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1.5">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={`header-${i}`} className="text-center text-xs text-muted-foreground font-medium py-1">
                    {d}
                  </div>
                ))}
                {streakDays.map((active, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-md flex items-center justify-center text-xs",
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-primary" /> Active
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-muted" /> Missed
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Course Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {courseProgress.map((course) => (
              <div key={course.name}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{course.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {course.completed}/{course.total} lessons · Current: {course.currentTopic}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skill Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{skill.name}</p>
                    <span className="text-sm font-semibold text-primary">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{skill.hours} hours</span>
                    <span>{skill.assessments} assessments</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quiz Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizScores.map((quiz, i) => (
                <div key={i} className="flex items-center justify-between rounded-md bg-muted p-3">
                  <div>
                    <p className="font-medium text-foreground text-sm">{quiz.quiz}</p>
                    <p className="text-xs text-muted-foreground">{quiz.course} · {quiz.date}</p>
                  </div>
                  <Badge variant={quiz.score >= 90 ? "success" : "secondary"}>
                    {quiz.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
