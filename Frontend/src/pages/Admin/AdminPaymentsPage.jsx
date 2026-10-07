import { useState } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  Clock,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const stats = [
  { label: "Total Revenue", value: "₹12,45,000", change: "+18.3%", up: true, icon: IndianRupee },
  { label: "Pending Payments", value: "₹87,500", change: "+5.2%", up: true, icon: Clock },
  { label: "Refunds", value: "₹23,000", change: "-12.0%", up: false, icon: RefreshCw },
  { label: "This Month", value: "₹3,45,000", change: "+22.1%", up: true, icon: TrendingUp },
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
  { course: "Full Stack MERN Bootcamp", revenue: 495000, students: 198 },
  { course: "Python for Data Science", revenue: 468000, students: 234 },
  { course: "Advanced React & Next.js", revenue: 372000, students: 186 },
  { course: "Linux Administration Pro", revenue: 213000, students: 142 },
  { course: "DevOps Bootcamp", revenue: 0, students: 87 },
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
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Transaction history and revenue overview</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-4 lg:grid-cols-4" variants={item}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {stat.up ? (
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="text-xs font-medium text-foreground">{stat.change}</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div className="lg:col-span-2" variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                  <div key={txn.id} className="flex items-center justify-between rounded-md bg-muted p-3 transition-colors hover:bg-accent">
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{txn.student}</p>
                        <span className="text-xs text-muted-foreground">{txn.id}</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{txn.course}</p>
                    </div>
                    <div className="ml-4 flex items-center gap-4">
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
              <CardTitle className="text-base font-semibold tracking-tight">Revenue by Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueByCourse.map((course) => (
                <div key={course.course} className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate font-medium text-foreground">{course.course}</span>
                    <span className="whitespace-nowrap text-muted-foreground">
                      {course.revenue > 0 ? `₹${(course.revenue / 1000).toFixed(0)}K` : "—"}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
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
