import { useState } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  Clock,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  Download,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

const stats = [
  { label: "Total Revenue", value: "₹12,45,000", change: "+18.3%", up: true, icon: IndianRupee, color: "text-emerald-500" },
  { label: "Pending Payments", value: "₹87,500", change: "+5.2%", up: true, icon: Clock, color: "text-orange-500" },
  { label: "Refunds", value: "₹23,000", change: "-12.0%", up: false, icon: RefreshCw, color: "text-red-500" },
  { label: "This Month", value: "₹3,45,000", change: "+22.1%", up: true, icon: TrendingUp, color: "text-blue-500" },
];

const transactions = [
  { id: "TXN001", student: "Aarav Patel", course: "Advanced React & Next.js", amount: 19999, date: "Aug 23, 2026", status: "Paid", method: "UPI" },
  { id: "TXN002", student: "Sneha Reddy", course: "Python for Data Science", amount: 19999, date: "Aug 22, 2026", status: "Paid", method: "Card" },
  { id: "TXN003", student: "Vikram Singh", course: "Full Stack MERN Bootcamp", amount: 24999, date: "Aug 22, 2026", status: "Pending", method: "Net Banking" },
  { id: "TXN004", student: "Ananya Joshi", course: "DevOps Bootcamp", amount: 22999, date: "Aug 21, 2026", status: "Paid", method: "UPI" },
  { id: "TXN005", student: "Karthik Nair", course: "Linux Administration Pro", amount: 14999, date: "Aug 21, 2026", status: "Refunded", method: "Card" },
  { id: "TXN006", student: "Priya Mehta", course: "Advanced React & Next.js", amount: 19999, date: "Aug 20, 2026", status: "Paid", method: "UPI" },
  { id: "TXN007", student: "Deepak Rao", course: "Full Stack MERN Bootcamp", amount: 24999, date: "Aug 20, 2026", status: "Paid", method: "Card" },
  { id: "TXN008", student: "Isha Singhania", course: "Python for Data Science", amount: 19999, date: "Aug 19, 2026", status: "Pending", method: "UPI" },
  { id: "TXN009", student: "Rohan Verma", course: "Linux Administration Pro", amount: 14999, date: "Aug 19, 2026", status: "Paid", method: "Net Banking" },
  { id: "TXN010", student: "Aditya Kumar", course: "Advanced React & Next.js", amount: 19999, date: "Aug 18, 2026", status: "Refunded", method: "Card" },
  { id: "TXN011", student: "Neha Gupta", course: "Python for Data Science", amount: 19999, date: "Aug 18, 2026", status: "Paid", method: "UPI" },
  { id: "TXN012", student: "Meera Kulkarni", course: "Full Stack MERN Bootcamp", amount: 24999, date: "Aug 17, 2026", status: "Paid", method: "Card" },
];

const revenueByCourse = [
  { course: "Full Stack MERN Bootcamp", revenue: 495000, students: 198, color: "bg-blue-500" },
  { course: "Python for Data Science", revenue: 468000, students: 234, color: "bg-emerald-500" },
  { course: "Advanced React & Next.js", revenue: 372000, students: 186, color: "bg-purple-500" },
  { course: "Linux Administration Pro", revenue: 213000, students: 142, color: "bg-orange-500" },
  { course: "DevOps Bootcamp", revenue: 0, students: 87, color: "bg-gray-500" },
];

const maxCourseRevenue = Math.max(...revenueByCourse.map((c) => c.revenue));

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) => {
    const matchFilter = filter === "All" || t.status === filter;
    const matchSearch = t.student.toLowerCase().includes(search.toLowerCase()) || t.course.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-1">Transaction history and revenue overview</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={item}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className={cn("p-3 rounded-lg bg-muted", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.up ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={cn("text-xs font-medium", stat.up ? "text-emerald-500" : "text-red-500")}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2" variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search student or course..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList>
                    <TabsTrigger value="All">All</TabsTrigger>
                    <TabsTrigger value="Paid">Paid</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Refunded">Refunded</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                {filtered.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-medium text-foreground text-sm">{txn.student}</p>
                        <span className="text-xs text-muted-foreground">{txn.id}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{txn.course}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{txn.amount.toLocaleString("en-IN")}</p>
                        <p className="text-xs text-muted-foreground">{txn.date}</p>
                      </div>
                      <Badge
                        variant={txn.status === "Paid" ? "success" : txn.status === "Refunded" ? "destructive" : "secondary"}
                      >
                        {txn.status}
                      </Badge>
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
              <CardTitle className="text-lg">Revenue by Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueByCourse.map((course) => (
                <div key={course.course} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium truncate">{course.course}</span>
                    <span className="text-muted-foreground whitespace-nowrap ml-2">
                      {course.revenue > 0 ? `₹${(course.revenue / 1000).toFixed(0)}K` : "—"}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", course.color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.revenue > 0 ? (course.revenue / maxCourseRevenue) * 100 : 0}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{course.students} students enrolled</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
