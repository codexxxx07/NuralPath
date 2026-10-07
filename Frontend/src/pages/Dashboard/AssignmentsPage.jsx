import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

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

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredAssignments = assignments.filter((a) => {
    if (activeTab === "pending") return a.status === "pending";
    if (activeTab === "submitted") return a.status === "submitted";
    if (activeTab === "graded") return a.status === "graded";
    return true;
  });

  const statusConfig = {
    pending: { label: "Pending" },
    submitted: { label: "Submitted" },
    graded: { label: "Graded" },
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Assignments</h1>
        <p className="mt-1 text-sm text-muted-foreground">Complete assignments and track your submissions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap gap-x-6 gap-y-2">
          <TabsTrigger value="pending">
            Pending ({assignments.filter((a) => a.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted ({assignments.filter((a) => a.status === "submitted").length})
          </TabsTrigger>
          <TabsTrigger value="graded">
            Graded ({assignments.filter((a) => a.status === "graded").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div>
            {filteredAssignments.map((assignment) => {
              const config = statusConfig[assignment.status];
              return (
                <div
                  key={assignment.id}
                  className="flex flex-col gap-3 border-b border-border py-5 sm:flex-row sm:items-start sm:gap-8"
                >
                  <div className="w-28 shrink-0">
                    <p className="text-xs text-muted-foreground">Due</p>
                    <p className="mt-0.5 text-xs font-medium text-foreground">{assignment.dueDate}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{assignment.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{assignment.course}</p>
                      </div>
                      <Badge
                        variant={
                          assignment.status === "graded"
                            ? "success"
                            : assignment.status === "submitted"
                            ? "secondary"
                            : "outline"
                        }
                        className="shrink-0"
                      >
                        {config.label}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                      {assignment.submittedDate && (
                        <span>Submitted {assignment.submittedDate}</span>
                      )}
                      <span>{assignment.xp} XP</span>
                      {assignment.grade && (
                        <span className="font-medium text-foreground">
                          Grade {assignment.grade}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {assignment.status === "pending" && (
                      <Button size="sm">Submit</Button>
                    )}
                    {assignment.status === "graded" && (
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredAssignments.length === 0 && (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No assignments to display
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
