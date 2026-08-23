import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Users, Play, CheckCircle2, Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { cn } from "../../lib/utils";

const liveClasses = [
  {
    id: 1,
    title: "Linux Process Management & Job Control",
    mentor: "Rahul Sharma",
    date: "Mon, Aug 25",
    time: "10:00 AM - 11:30 AM",
    status: "upcoming",
    course: "Linux Fundamentals",
    attendees: 42,
  },
  {
    id: 2,
    title: "Shell Scripting: Loops & Functions",
    mentor: "Priya Mehta",
    date: "Tue, Aug 26",
    time: "2:00 PM - 3:30 PM",
    status: "upcoming",
    course: "Shell Scripting Mastery",
    attendees: 35,
  },
  {
    id: 3,
    title: "C Pointers & Dynamic Memory",
    mentor: "Amit Verma",
    date: "Wed, Aug 27",
    time: "11:00 AM - 12:30 PM",
    status: "upcoming",
    course: "C Programming Deep Dive",
    attendees: 38,
  },
  {
    id: 4,
    title: "Linux File System Deep Dive",
    mentor: "Rahul Sharma",
    date: "Fri, Aug 22",
    time: "10:00 AM - 11:30 AM",
    status: "completed",
    course: "Linux Fundamentals",
    attendees: 45,
    recordingUrl: "#",
  },
  {
    id: 5,
    title: "Shell Scripting: Variables & I/O",
    mentor: "Priya Mehta",
    date: "Wed, Aug 20",
    time: "2:00 PM - 3:30 PM",
    status: "completed",
    course: "Shell Scripting Mastery",
    attendees: 40,
    recordingUrl: "#",
  },
  {
    id: 6,
    title: "C Arrays & Strings Workshop",
    mentor: "Amit Verma",
    date: "Mon, Aug 18",
    time: "11:00 AM - 12:30 PM",
    status: "completed",
    course: "C Programming Deep Dive",
    attendees: 43,
    recordingUrl: "#",
  },
  {
    id: 7,
    title: "Git Branching Strategies",
    mentor: "Neha Gupta",
    date: "Thu, Aug 28",
    time: "3:00 PM - 4:00 PM",
    status: "upcoming",
    course: "Open Source Contribution",
    attendees: 28,
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

export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredClasses = liveClasses.filter((cls) => {
    if (activeTab === "upcoming") return cls.status === "upcoming";
    if (activeTab === "past") return cls.status === "completed";
    return true;
  });

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-foreground">Live Classes</h1>
        <p className="text-muted-foreground mt-1">Join live sessions and watch recordings</p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="upcoming">
              <Radio className="h-4 w-4 mr-2" />
              Upcoming ({liveClasses.filter((c) => c.status === "upcoming").length})
            </TabsTrigger>
            <TabsTrigger value="past">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Past ({liveClasses.filter((c) => c.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({liveClasses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredClasses.map((cls) => (
                <Card key={cls.id} className={cn(
                  "transition-colors",
                  cls.status === "upcoming" && "border-l-4 border-l-primary"
                )}>
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{cls.title}</h3>
                            <p className="text-sm text-muted-foreground">{cls.course} · {cls.mentor}</p>
                          </div>
                          <Badge variant={cls.status === "upcoming" ? "default" : "secondary"}>
                            {cls.status === "upcoming" ? "Upcoming" : "Completed"}
                          </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {cls.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {cls.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {cls.attendees} attendees
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {cls.status === "upcoming" ? (
                          <Button size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Join Class
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Watch Recording
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredClasses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No classes to display</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
