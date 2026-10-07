import { useState } from "react";
import {
  IndianRupee,
  Clock,
  RefreshCw,
  TrendingUp,
  Search,
  Download,
} from "lucide-react";
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

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) => {
    const matchFilter = filter === "All" || t.status === filter;
    const matchSearch = t.student.toLowerCase().includes(search.toLowerCase()) || t.course.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Transaction history and revenue overview</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-b border-border py-5 pr-6 sm:border-b-0">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {stat.change} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Transactions
          </h2>

          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
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

          <div>
            {filtered.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{txn.student}</p>
                    <span className="text-xs text-muted-foreground">{txn.id}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{txn.course}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">₹{txn.amount.toLocaleString("en-IN")}</p>
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
        </section>

        <section>
          <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
            Revenue by Course
          </h2>
          <div className="space-y-5 pt-4">
            {revenueByCourse.map((course) => (
              <div key={course.course}>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium text-foreground">{course.course}</span>
                  <span className="whitespace-nowrap text-muted-foreground">
                    {course.revenue > 0 ? `₹${(course.revenue / 1000).toFixed(0)}K` : "—"}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground transition-all duration-500"
                    style={{ width: `${course.revenue > 0 ? (course.revenue / maxCourseRevenue) * 100 : 0}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{course.students} students enrolled</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
