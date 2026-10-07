import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Users,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";

const batches = [
  {
    id: 1,
    name: "Full Stack MERN — Batch 2026-A",
    startDate: "Jan 10, 2026",
    endDate: "Jul 10, 2026",
    mentor: "Rahul Sharma",
    mentorInitials: "RS",
    studentsEnrolled: 48,
    maxCapacity: 50,
    status: "Active",
    course: "Full Stack MERN Bootcamp",
    schedule: "Mon, Wed, Fri — 7:00 PM to 9:00 PM",
    studentList: [
      { name: "Aarav Patel", initials: "AP" },
      { name: "Sneha Reddy", initials: "SR" },
      { name: "Priya Mehta", initials: "PM" },
      { name: "Vikram Singh", initials: "VS" },
      { name: "Ananya Joshi", initials: "AJ" },
      { name: "Karthik Nair", initials: "KN" },
    ],
  },
  {
    id: 2,
    name: "Python Data Science — Batch 2026-B",
    startDate: "Mar 1, 2026",
    endDate: "Sep 1, 2026",
    mentor: "Neha Gupta",
    mentorInitials: "NG",
    studentsEnrolled: 52,
    maxCapacity: 60,
    status: "Active",
    course: "Python for Data Science",
    schedule: "Tue, Thu — 6:30 PM to 9:00 PM",
    studentList: [
      { name: "Isha Singhania", initials: "IS" },
      { name: "Deepak Rao", initials: "DR" },
      { name: "Rohan Verma", initials: "RV" },
    ],
  },
  {
    id: 3,
    name: "Linux Admin Pro — Batch 2025-C",
    startDate: "Sep 15, 2025",
    endDate: "Feb 15, 2026",
    mentor: "Rohan Verma",
    mentorInitials: "RV",
    studentsEnrolled: 38,
    maxCapacity: 40,
    status: "Completed",
    course: "Linux Administration Pro",
    schedule: "Mon, Wed — 8:00 PM to 10:00 PM",
    studentList: [
      { name: "Aditya Kumar", initials: "AK" },
      { name: "Neha Gupta", initials: "NG" },
    ],
  },
  {
    id: 4,
    name: "Advanced React — Batch 2026-D",
    startDate: "May 5, 2026",
    endDate: "Nov 5, 2026",
    mentor: "Rahul Sharma",
    mentorInitials: "RS",
    studentsEnrolled: 42,
    maxCapacity: 45,
    status: "Active",
    course: "Advanced React & Next.js",
    schedule: "Sat, Sun — 10:00 AM to 1:00 PM",
    studentList: [
      { name: "Aarav Patel", initials: "AP" },
      { name: "Vikram Singh", initials: "VS" },
    ],
  },
  {
    id: 5,
    name: "DevOps Bootcamp — Batch 2026-E",
    startDate: "Oct 1, 2026",
    endDate: "Apr 1, 2027",
    mentor: "Neha Gupta",
    mentorInitials: "NG",
    studentsEnrolled: 0,
    maxCapacity: 40,
    status: "Upcoming",
    course: "DevOps Bootcamp",
    schedule: "Mon, Wed, Fri — 6:00 PM to 8:30 PM",
    studentList: [],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminBatchesPage() {
  const [expandedBatch, setExpandedBatch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: "", course: "", mentor: "", startDate: "", endDate: "", maxCapacity: "" });

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Batch Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">{batches.length} batches total</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Batch
        </Button>
      </motion.div>

      {showForm && (
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold tracking-tight">Create New Batch</CardTitle>
              <CardDescription>Fill in the details to create a new batch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Batch Name</Label>
                  <Input
                    placeholder="e.g. Full Stack MERN — Batch 2026-F"
                    value={newBatch.name}
                    onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select value={newBatch.course} onValueChange={(v) => setNewBatch({ ...newBatch, course: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">Advanced React & Next.js</SelectItem>
                      <SelectItem value="python">Python for Data Science</SelectItem>
                      <SelectItem value="mern">Full Stack MERN Bootcamp</SelectItem>
                      <SelectItem value="linux">Linux Administration Pro</SelectItem>
                      <SelectItem value="devops">DevOps Bootcamp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Mentor</Label>
                  <Select value={newBatch.mentor} onValueChange={(v) => setNewBatch({ ...newBatch, mentor: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rahul">Rahul Sharma</SelectItem>
                      <SelectItem value="neha">Neha Gupta</SelectItem>
                      <SelectItem value="rohan">Rohan Verma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Max Capacity</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 50"
                    value={newBatch.maxCapacity}
                    onChange={(e) => setNewBatch({ ...newBatch, maxCapacity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={newBatch.startDate}
                    onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={newBatch.endDate}
                    onChange={(e) => setNewBatch({ ...newBatch, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Schedule</Label>
                <Textarea placeholder="e.g. Mon, Wed, Fri — 7:00 PM to 9:00 PM" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button>Create Batch</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div className="space-y-4" variants={item}>
        {batches.map((batch) => (
          <Card key={batch.id}>
            <CardContent className="p-0">
              <div
                className="cursor-pointer p-5 transition-colors hover:bg-muted"
                onClick={() => setExpandedBatch(expandedBatch === batch.id ? null : batch.id)}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{batch.name}</h3>
                      <Badge variant={batch.status === "Active" ? "success" : batch.status === "Completed" ? "secondary" : "outline"}>
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {batch.course}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {batch.studentsEnrolled}/{batch.maxCapacity} students</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {batch.startDate} — {batch.endDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-[10px]">{batch.mentorInitials}</AvatarFallback>
                      </Avatar>
                      <span className="hidden text-sm text-muted-foreground sm:inline">{batch.mentor}</span>
                    </div>
                    {expandedBatch === batch.id ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </div>
              </div>

              {expandedBatch === batch.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border"
                >
                  <div className="space-y-4 p-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">Schedule</p>
                        <p className="text-sm font-medium text-foreground">{batch.schedule}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">Enrollment</p>
                        <p className="text-sm font-medium text-foreground">{batch.studentsEnrolled} / {batch.maxCapacity} seats filled</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">Mentor</p>
                        <p className="text-sm font-medium text-foreground">{batch.mentor}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="mb-3 text-sm font-semibold tracking-tight text-foreground">Enrolled Students</h4>
                      {batch.studentList.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {batch.studentList.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[8px]">{s.initials}</AvatarFallback>
                              </Avatar>
                              <span className="text-foreground">{s.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No students enrolled yet</p>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Edit Batch</Button>
                      {batch.status === "Active" && (
                        <Button variant="destructive" size="sm">End Batch</Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
