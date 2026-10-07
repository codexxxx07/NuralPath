import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
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
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Assignments</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Complete assignments and track your submissions</p>
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
          {filteredAssignments.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-sm font-medium text-foreground">No assignments to display</p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                Assignments for this view will appear here as they are released.
              </p>
              <Button variant="outline" asChild className="mt-5">
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="py-3 pr-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Assignment
                    </th>
                    <th scope="col" className="py-3 pr-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Due
                    </th>
                    <th scope="col" className="py-3 pr-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th scope="col" className="py-3 pr-6 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      XP
                    </th>
                    <th scope="col" className="py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => {
                    const config = statusConfig[assignment.status];
                    return (
                      <tr
                        key={assignment.id}
                        className="table-row border-b border-border align-top"
                      >
                        <td className="py-4 pr-6">
                          <p className="text-sm font-medium text-foreground">{assignment.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{assignment.course}</p>
                          <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                            {assignment.description}
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            {assignment.submittedDate && (
                              <span>Submitted {assignment.submittedDate}</span>
                            )}
                            {assignment.grade && (
                              <span className="font-medium text-foreground">
                                Grade {assignment.grade}%
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pr-6">
                          <span className="font-mono text-xs text-muted-foreground">
                            {assignment.dueDate}
                          </span>
                        </td>
                        <td className="py-4 pr-6">
                          <Badge
                            variant={
                              assignment.status === "graded"
                                ? "success"
                                : assignment.status === "submitted"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {config.label}
                          </Badge>
                        </td>
                        <td className="py-4 pr-6 text-right font-mono text-xs tabular-nums text-muted-foreground">
                          {assignment.xp}
                        </td>
                        <td className="py-4 text-right">
                          {assignment.status === "pending" && (
                            <Button size="sm">Submit</Button>
                          )}
                          {assignment.status === "graded" && (
                            <Button variant="outline" size="sm">
                              View Feedback
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
