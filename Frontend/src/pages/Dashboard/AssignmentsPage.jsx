import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, AlertCircle, Send, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { cn } from "../../lib/utils";

const assignments = [
  {
    id: 1,
    title: "Linux File Permissions Lab",
    description: "Set up proper file permissions for a multi-user directory structure using chmod, chown, and ACLs.",
    dueDate: "Aug 26, 2026",
    status: "pending",
    course: "Linux Fundamentals",
    xp: 100,
  },
  {
    id: 2,
    title: "Shell Script: System Monitor",
    description: "Write a bash script that monitors CPU usage, memory, and disk space, logging alerts when thresholds are exceeded.",
    dueDate: "Aug 28, 2026",
    status: "pending",
    course: "Shell Scripting Mastery",
    xp: 150,
  },
  {
    id: 3,
    title: "C Dynamic Memory Assignment",
    description: "Implement a dynamic array library in C using malloc, realloc, and free with proper error handling.",
    dueDate: "Aug 25, 2026",
    status: "pending",
    course: "C Programming Deep Dive",
    xp: 120,
  },
  {
    id: 4,
    title: "Linux Process Management",
    description: "Create a report analyzing system processes, their states, and resource usage patterns.",
    dueDate: "Aug 20, 2026",
    status: "submitted",
    course: "Linux Fundamentals",
    submittedDate: "Aug 19, 2026",
    xp: 100,
  },
  {
    id: 5,
    title: "Shell Scripting: File Backup",
    description: "Write a script to automate incremental backups with timestamping and compression.",
    dueDate: "Aug 18, 2026",
    status: "submitted",
    course: "Shell Scripting Mastery",
    submittedDate: "Aug 17, 2026",
    xp: 100,
  },
  {
    id: 6,
    title: "Linux Navigation Quiz",
    description: "Practical assessment on file navigation, directory structure, and basic commands.",
    dueDate: "Aug 15, 2026",
    status: "graded",
    grade: 92,
    course: "Linux Fundamentals",
    submittedDate: "Aug 14, 2026",
    xp: 100,
  },
  {
    id: 7,
    title: "C Pointers Exercise",
    description: "Demonstrate pointer arithmetic, function pointers, and pointer-to-pointer concepts.",
    dueDate: "Aug 12, 2026",
    status: "graded",
    grade: 88,
    course: "C Programming Deep Dive",
    submittedDate: "Aug 11, 2026",
    xp: 120,
  },
  {
    id: 8,
    title: "Shell Variables & I/O",
    description: "Complete exercises on variable scope, input/output redirection, and piping.",
    dueDate: "Aug 10, 2026",
    status: "graded",
    grade: 95,
    course: "Shell Scripting Mastery",
    submittedDate: "Aug 9, 2026",
    xp: 100,
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

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredAssignments = assignments.filter((a) => {
    if (activeTab === "pending") return a.status === "pending";
    if (activeTab === "submitted") return a.status === "submitted";
    if (activeTab === "graded") return a.status === "graded";
    return true;
  });

  const statusConfig = {
    pending: { color: "bg-orange-500/10 text-orange-500", icon: Clock, label: "Pending" },
    submitted: { color: "bg-blue-500/10 text-blue-500", icon: Send, label: "Submitted" },
    graded: { color: "bg-emerald-500/10 text-emerald-500", icon: CheckCircle2, label: "Graded" },
  };

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground mt-1">Complete assignments and track your submissions</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending">
              <Clock className="h-4 w-4 mr-2" />
              Pending ({assignments.filter((a) => a.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              <Send className="h-4 w-4 mr-2" />
              Submitted ({assignments.filter((a) => a.status === "submitted").length})
            </TabsTrigger>
            <TabsTrigger value="graded">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Graded ({assignments.filter((a) => a.status === "graded").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => {
                const config = statusConfig[assignment.status];
                const Icon = config.icon;
                return (
                  <Card key={assignment.id}>
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className={cn("p-3 rounded-lg flex-shrink-0", config.color)}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{assignment.course}</p>
                            </div>
                            <Badge variant={assignment.status === "graded" ? "success" : assignment.status === "submitted" ? "secondary" : "outline"}>
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{assignment.description}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {assignment.dueDate}
                            </div>
                            {assignment.submittedDate && (
                              <span>Submitted: {assignment.submittedDate}</span>
                            )}
                            <span>{assignment.xp} XP</span>
                            {assignment.grade && (
                              <span className="font-semibold text-emerald-500">
                                Grade: {assignment.grade}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {assignment.status === "pending" && (
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          )}
                          {assignment.status === "graded" && (
                            <Button variant="outline" size="sm">
                              View Feedback
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {filteredAssignments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No assignments to display</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
