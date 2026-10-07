import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  BarChart3,
  Award,
  Clock,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const stats = [
  { label: "Avg Completion Rate", value: "64%", icon: Target, change: "+5%" },
  { label: "Avg Quiz Score", value: "79%", icon: Award, change: "+3%" },
  { label: "Active Students", value: "128", icon: Users, change: "+12" },
  { label: "Total Revenue", value: "₹4.2L", icon: DollarSign, change: "+18%" },
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
  { label: "Avg Daily Active", value: "42", icon: Users },
  { label: "Avg Session Time", value: "48 min", icon: Clock },
  { label: "Assignment Submit Rate", value: "87%", icon: BookOpen },
  { label: "Live Class Attendance", value: "91%", icon: TrendingUp },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MentorAnalyticsPage() {
  const maxStudents = Math.max(...progressDistribution.map((d) => d.count));

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Insights across all your courses</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={item}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <stat.icon className="h-4 w-4" />
                </div>
                <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                Course Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {coursePerformance.map((course) => (
                <div key={course.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground text-sm">{course.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{course.students} students</Badge>
                      <span className="text-xs text-muted-foreground">★ {course.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-20">Completion</span>
                      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.completion}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground w-10 text-right">{course.completion}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-20">Avg Score</span>
                      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-muted-foreground/40 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.avgScore}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground w-10 text-right">{course.avgScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <Users className="h-4 w-4 text-muted-foreground" />
                Student Progress Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressDistribution.map((dist) => (
                  <div key={dist.range} className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-16">{dist.range}</span>
                    <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full rounded-full bg-muted-foreground/40"
                        initial={{ width: 0 }}
                        animate={{ width: `${(dist.count / maxStudents) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
                        {dist.count} students
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-semibold text-foreground">148</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Engagement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {engagementMetrics.map((metric) => (
                <div key={metric.label} className="p-4 rounded-md border border-border text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground mx-auto mb-3">
                    <metric.icon className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
