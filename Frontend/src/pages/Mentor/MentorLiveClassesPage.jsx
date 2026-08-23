import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  PlayCircle,
  Plus,
  ExternalLink,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { cn } from "../../lib/utils";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MentorLiveClassesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClass, setNewClass] = useState({
    topic: "",
    course: "",
    date: "",
    time: "",
    description: "",
  });

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Live Classes</h1>
        <p className="text-muted-foreground mt-1">Manage your scheduled and past live sessions</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="scheduled">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="scheduled">
            <div className="space-y-3">
              {scheduledClasses.map((cls) => (
                <Card key={cls.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{cls.topic}</h3>
                          <Badge variant="outline">{cls.course}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {cls.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {cls.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {cls.students} expected
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          Link
                        </Button>
                        <Button size="sm">
                          <Play className="h-3.5 w-3.5 mr-1" />
                          Start Class
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="space-y-3">
              {pastClasses.map((cls) => (
                <Card key={cls.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{cls.topic}</h3>
                          <Badge variant="outline">{cls.course}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {cls.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {cls.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            {cls.attendance}/{cls.totalStudents} attended
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <PlayCircle className="h-3.5 w-3.5 mr-1" />
                        Recording
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create New Live Class</CardTitle>
                <CardDescription>Schedule a new live session for your students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
