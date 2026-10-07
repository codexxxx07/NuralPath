import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

const scheduledClasses = [
  { id: 1, date: "Mon, Aug 25", time: "10:00 AM - 11:30 AM", topic: "Linux Kernel Internals", course: "Linux Fundamentals", students: 42, meetingUrl: "#" },
  { id: 2, date: "Tue, Aug 26", time: "2:00 PM - 3:30 PM", topic: "Advanced Shell Functions", course: "Shell Scripting Mastery", students: 38, meetingUrl: "#" },
  { id: 3, date: "Thu, Aug 28", time: "11:00 AM - 12:30 PM", topic: "C Memory Allocators", course: "C Programming Deep Dive", students: 35, meetingUrl: "#" },
  { id: 4, date: "Fri, Aug 29", time: "4:00 PM - 5:00 PM", topic: "Q&A Session", course: "Linux Fundamentals", students: 28, meetingUrl: "#" },
];

const pastClasses = [
  { id: 1, date: "Thu, Aug 21", time: "10:00 AM", topic: "Linux File Permissions Deep Dive", course: "Linux Fundamentals", attendance: 40, totalStudents: 42, recordingUrl: "#", duration: "1h 25m" },
  { id: 2, date: "Wed, Aug 20", time: "2:00 PM", topic: "Shell Scripting Arrays & Maps", course: "Shell Scripting Mastery", attendance: 35, totalStudents: 38, recordingUrl: "#", duration: "1h 30m" },
  { id: 3, date: "Mon, Aug 18", time: "11:00 AM", topic: "C Structs & Unions Workshop", course: "C Programming Deep Dive", attendance: 43, totalStudents: 45, recordingUrl: "#", duration: "1h 20m" },
];

export default function MentorLiveClassesPage() {
  const [, setShowCreateForm] = useState(false);
  const [newClass, setNewClass] = useState({
    topic: "",
    course: "",
    date: "",
    time: "",
    description: "",
  });

  return (
    <div className="max-w-6xl space-y-10">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Live Classes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your scheduled and past live sessions</p>
      </div>

      <Tabs defaultValue="scheduled">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          <div className="card-depth">
            {scheduledClasses.map((cls, idx) => (
              <div
                key={cls.id}
                className={`flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-start sm:gap-8 sm:px-5 ${idx !== scheduledClasses.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="w-24 shrink-0">
                  <p className="text-xs text-muted-foreground">{cls.date.split(",")[0]}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{cls.date.split(",")[1]?.trim()}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{cls.topic}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {cls.course} · {cls.time} · {cls.students} expected
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline">Link</Button>
                  <Button size="sm">Start Class</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="card-depth">
            {pastClasses.map((cls, idx) => (
              <div
                key={cls.id}
                className={`flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-start sm:gap-8 sm:px-5 ${idx !== pastClasses.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="w-24 shrink-0">
                  <p className="text-xs text-muted-foreground">{cls.date.split(",")[0]}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{cls.date.split(",")[1]?.trim()}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{cls.topic}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {cls.course} · {cls.time} · {cls.duration} · {cls.attendance}/{cls.totalStudents} attended
                  </p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">Recording</Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <section>
            <div className="border-b border-border pb-3">
              <h2 className="text-base font-semibold tracking-tight text-foreground">Create New Live Class</h2>
              <p className="mt-1 text-xs text-muted-foreground">Schedule a new live session for your students</p>
            </div>
            <div className="card-depth mt-5 p-5 sm:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Input
                      placeholder="e.g., Linux Process Scheduling"
                      value={newClass.topic}
                      onChange={(e) => setNewClass({ ...newClass, topic: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Select value={newClass.course} onValueChange={(val) => setNewClass({ ...newClass, course: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linux">Linux Fundamentals</SelectItem>
                        <SelectItem value="shell">Shell Scripting Mastery</SelectItem>
                        <SelectItem value="c">C Programming Deep Dive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Brief description of what will be covered..."
                    rows={3}
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                  <Button>Schedule Class</Button>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
