import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";

const mentors = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@nuralpath.com",
    phone: "+91 98765 43210",
    initials: "RS",
    coursesAssigned: ["Advanced React & Next.js", "Full Stack MERN Bootcamp"],
    studentsCount: 90,
    rating: 4.8,
    totalReviews: 124,
    status: "Active",
    joinDate: "Dec 10, 2025",
    bio: "Senior full-stack developer with 8+ years of experience in React, Node.js, and modern web technologies.",
    expertise: ["React", "Node.js", "TypeScript", "MongoDB"],
    completionRate: 82,
    avgResponseTime: "1.2 hrs",
  },
  {
    id: 2,
    name: "Neha Gupta",
    email: "neha.gupta@nuralpath.com",
    phone: "+91 87654 32109",
    initials: "NG",
    coursesAssigned: ["Python for Data Science", "DevOps Bootcamp"],
    studentsCount: 112,
    rating: 4.7,
    totalReviews: 98,
    status: "Active",
    joinDate: "Nov 5, 2025",
    bio: "Data science specialist and DevOps enthusiast. Previously worked at a leading fintech company.",
    expertise: ["Python", "TensorFlow", "AWS", "Docker"],
    completionRate: 78,
    avgResponseTime: "0.8 hrs",
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan.verma@nuralpath.com",
    phone: "+91 76543 21098",
    initials: "RV",
    coursesAssigned: ["Linux Administration Pro"],
    studentsCount: 56,
    rating: 4.9,
    totalReviews: 76,
    status: "Active",
    joinDate: "Jan 20, 2026",
    bio: "Linux systems architect and open-source contributor. Certified AWS and GCP professional.",
    expertise: ["Linux", "Shell Scripting", "AWS", "Kubernetes"],
    completionRate: 88,
    avgResponseTime: "0.5 hrs",
  },
  {
    id: 4,
    name: "Anjali Deshmukh",
    email: "anjali.d@nuralpath.com",
    phone: "+91 65432 10987",
    initials: "AD",
    coursesAssigned: ["Advanced React & Next.js"],
    studentsCount: 42,
    rating: 4.6,
    totalReviews: 52,
    status: "Active",
    joinDate: "Mar 15, 2026",
    bio: "Frontend architect specializing in React ecosystems and performance optimization.",
    expertise: ["React", "Next.js", "Tailwind CSS", "GraphQL"],
    completionRate: 75,
    avgResponseTime: "1.5 hrs",
  },
  {
    id: 5,
    name: "Suresh Iyer",
    email: "suresh.iyer@nuralpath.com",
    phone: "+91 54321 09876",
    initials: "SI",
    coursesAssigned: ["Full Stack MERN Bootcamp"],
    studentsCount: 38,
    rating: 4.5,
    totalReviews: 41,
    status: "On Leave",
    joinDate: "Feb 8, 2026",
    bio: "Backend engineer with a focus on scalable APIs and microservices architecture.",
    expertise: ["Node.js", "Express", "PostgreSQL", "Redis"],
    completionRate: 70,
    avgResponseTime: "2.0 hrs",
  },
  {
    id: 6,
    name: "Meera Kulkarni",
    email: "meera.k@nuralpath.com",
    phone: "+91 43210 98765",
    initials: "MK",
    coursesAssigned: ["Python for Data Science"],
    studentsCount: 45,
    rating: 4.8,
    totalReviews: 63,
    status: "Active",
    joinDate: "Apr 22, 2026",
    bio: "Machine learning researcher turned educator. Passionate about making AI accessible to everyone.",
    expertise: ["Python", "PyTorch", "Scikit-learn", "Pandas"],
    completionRate: 85,
    avgResponseTime: "0.7 hrs",
  },
];

export default function AdminMentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Mentor Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">{mentors.length} mentors on platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Mentor
        </Button>
      </div>

      <section>
        <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          All Mentors
        </h2>
        <div className="mt-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="cursor-pointer border-t border-border py-5 transition-colors duration-200 hover:bg-accent/60"
              onClick={() => setSelectedMentor(mentor)}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs font-medium">{mentor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{mentor.name}</p>
                      <Badge variant={mentor.status === "Active" ? "success" : mentor.status === "On Leave" ? "secondary" : "outline"}>
                        {mentor.status}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{mentor.email}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{mentor.expertise.join(" · ")}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="mt-0.5 text-sm font-medium tabular-nums text-foreground">
                      ★ {mentor.rating} <span className="font-normal text-muted-foreground">({mentor.totalReviews})</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="mt-0.5 text-sm font-medium tabular-nums text-foreground">{mentor.studentsCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Courses</p>
                    <p className="mt-0.5 text-sm font-medium tabular-nums text-foreground">{mentor.coursesAssigned.length}</p>
                  </div>
                  <div className="w-40">
                    <div className="flex items-baseline justify-between">
                      <p className="text-xs text-muted-foreground">Completion</p>
                      <p className="text-xs font-medium tabular-nums text-foreground">{mentor.completionRate}%</p>
                    </div>
                    <Progress value={mentor.completionRate} className="mt-2 h-1.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/50 p-4" onClick={() => setSelectedMentor(null)}>
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-pop animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-foreground">Mentor Details</h2>
              <button type="button" className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground" aria-label="Close dialog" title="Close" onClick={() => setSelectedMentor(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-medium">{selectedMentor.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground">{selectedMentor.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{selectedMentor.bio}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-border">
              <div className="border-b border-border py-4 pr-4">
                <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{selectedMentor.studentsCount}</p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">Students</p>
              </div>
              <div className="border-b border-border py-4 pl-4">
                <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{selectedMentor.rating}</p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">Avg Rating</p>
              </div>
              <div className="border-b border-border py-4 pr-4">
                <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{selectedMentor.completionRate}%</p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">Completion</p>
              </div>
              <div className="border-b border-border py-4 pl-4">
                <p className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{selectedMentor.avgResponseTime}</p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">Avg Response</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="border-b border-border pb-3 text-sm font-semibold tracking-tight text-foreground">
                Assigned Courses
              </h4>
              <div>
                {selectedMentor.coursesAssigned.map((course) => (
                  <p key={course} className="border-b border-border py-3 text-sm text-foreground">
                    {course}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="border-b border-border pb-3 text-sm font-semibold tracking-tight text-foreground">
                Contact
              </h4>
              <div>
                <p className="border-b border-border py-3 text-sm text-muted-foreground">{selectedMentor.email}</p>
                <p className="border-b border-border py-3 text-sm text-muted-foreground">{selectedMentor.phone}</p>
                <p className="border-b border-border py-3 text-sm text-muted-foreground">Joined {selectedMentor.joinDate}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex gap-2">
              <Button className="flex-1">Edit Mentor</Button>
              <Button variant="outline" className="flex-1">Remove</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
