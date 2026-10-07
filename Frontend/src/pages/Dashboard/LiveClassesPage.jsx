import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Video } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

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

export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredClasses = liveClasses.filter((cls) => {
    if (activeTab === "upcoming") return cls.status === "upcoming";
    if (activeTab === "past") return cls.status === "completed";
    return true;
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Live Classes</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Join live sessions and watch recordings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap gap-x-6 gap-y-2">
          <TabsTrigger value="upcoming">
            Upcoming ({liveClasses.filter((c) => c.status === "upcoming").length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({liveClasses.filter((c) => c.status === "completed").length})
          </TabsTrigger>
          <TabsTrigger value="all">All ({liveClasses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div>
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex flex-col gap-3 border-b border-border py-5 sm:flex-row sm:items-start sm:gap-8"
              >
                <div className="w-full shrink-0 sm:w-36">
                  <p className="text-xs text-muted-foreground">{cls.date}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{cls.time}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{cls.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {cls.course} · {cls.mentor}
                      </p>
                    </div>
                    <Badge
                      variant={cls.status === "upcoming" ? "outline" : "secondary"}
                      className="shrink-0"
                    >
                      {cls.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{cls.attendees} attendees</p>
                </div>
                <div className="shrink-0">
                  {cls.status === "upcoming" ? (
                    <Button size="sm">Join Class</Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="h-3.5 w-3.5" />
                      Watch Recording
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {filteredClasses.length === 0 && (
              <div className="py-16 text-center">
                <Video className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-4 text-sm font-medium text-foreground">No classes to display</p>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                  Sessions for this view will appear here once they are scheduled.
                </p>
                <Button variant="outline" asChild className="mt-5">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
