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
import { cn } from "../../lib/utils";

const stats = [
  { label: "Avg Completion Rate", value: "64%", icon: Target, color: "text-blue-500", change: "+5%" },
  { label: "Avg Quiz Score", value: "79%", icon: Award, color: "text-emerald-500", change: "+3%" },
  { label: "Active Students", value: "128", icon: Users, color: "text-purple-500", change: "+12" },
  { label: "Total Revenue", value: "₹4.2L", icon: DollarSign, color: "text-orange-500", change: "+18%" },
];

const coursePerformance = [
  { name: "Linux Fundamentals", completion: 74, avgScore: 82, students: 52, rating: 4.8 },
  { name: "Shell Scripting", completion: 61, avgScore: 78, students: 48, rating: 4.6 },
  { name: "C Programming", completion: 56, avgScore: 75, students: 48, rating: 4.5 },
];

const progressDistribution = [
  { range: "0-25%", count: 18, color: "bg-red-500" },
  { range: "26-50%", count: 32, color: "bg-orange-500" },
  { range: "51-75%", count: 45, color: "bg-blue-500" },
  { range: "76-100%", count: 53, color: "bg-emerald-500" },
];

const engagementMetrics = [
  { label: "Avg Daily Active", value: "42", icon: Users, color: "text-blue-500" },
  { label: "Avg Session Time", value: "48 min", icon: Clock, color: "text-emerald-500" },
  { label: "Assignment Submit Rate", value: "87%", icon: BookOpen, color: "text-purple-500" },
  { label: "Live Class Attendance", value: "91%", icon: TrendingUp, color: "text-orange-500" },
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
  const maxCompletion = Math.max(...coursePerformance.map((c) => c.completion));
  const maxStudents = Math.max(...progressDistribution.map((d) => d.count));

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights across all your courses</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={item}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <Badge variant="success" className="text-xs">{stat.change}</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
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
                          className="h-full bg-blue-500 rounded-full"
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
                          className="h-full bg-emerald-500 rounded-full"
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
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
                        className={cn("h-full rounded-full", dist.color)}
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
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Engagement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {engagementMetrics.map((metric) => (
                <div key={metric.label} className="p-4 rounded-lg bg-muted/50 text-center">
                  <metric.icon className={cn("h-6 w-6 mx-auto mb-2", metric.color)} />
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
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
