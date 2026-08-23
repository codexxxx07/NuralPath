import { motion } from "framer-motion";
import {
  Users,
  IndianRupee,
  TrendingUp,
  Smile,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  BarChart3,
  Clock,
  BookOpen,
  MessageSquare,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { cn } from "../../lib/utils";

const keyMetrics = [
  { label: "Total Users", value: "2,847", change: "+12.5%", up: true, icon: Users, color: "text-blue-500" },
  { label: "Total Revenue", value: "₹12,45,000", change: "+18.3%", up: true, icon: IndianRupee, color: "text-emerald-500" },
  { label: "Completion Rate", value: "72%", change: "-2.1%", up: false, icon: TrendingUp, color: "text-orange-500" },
  { label: "Satisfaction", value: "4.7/5", change: "+0.3", up: true, icon: Smile, color: "text-purple-500" },
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminAnalyticsPage() {
  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive platform performance insights</p>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={item}>
        {keyMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
                <div className={cn("p-3 rounded-lg bg-muted", metric.color)}>
                  <metric.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {metric.up ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={cn("text-xs font-medium", metric.up ? "text-emerald-500" : "text-red-500")}>
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              User Growth — Last 12 Months
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-52">
              {monthlyUsers.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {d.value.toLocaleString("en-IN")}
                  </span>
                  <motion.div
                    className="w-full rounded-t-md bg-primary"
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / maxUsers) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Course Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coursePerformance.map((course) => (
                <div key={course.title} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm">{course.title}</h3>
                    <Badge variant={course.trend === "New" ? "secondary" : "outline"}>{course.trend}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Completion</p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.completion} className="h-2 flex-1" />
                        <span className="font-medium text-foreground">{course.completion}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">Rating</p>
                        <p className="font-medium text-foreground">★ {course.rating}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Students</p>
                        <p className="font-medium text-foreground">{course.students}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-6" variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-purple-500" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {geographicData.map((geo) => (
                <div key={geo.region} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{geo.region}</span>
                    <span className="text-muted-foreground">{geo.users} users ({geo.percentage}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${geo.percentage}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {engagementMetrics.map((eng) => (
                <div key={eng.metric} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-muted">
                    <eng.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{eng.value}</p>
                    <p className="text-xs text-muted-foreground">{eng.metric}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
