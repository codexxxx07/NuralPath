import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Star,
  Users,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  X,
  Award,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminMentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mentor Management</h1>
          <p className="text-muted-foreground mt-1">{mentors.length} mentors on platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Mentor
        </Button>
      </motion.div>

      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={item}>
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedMentor(mentor)}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-sm font-medium">{mentor.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{mentor.email}</p>
                  <Badge variant={mentor.status === "Active" ? "success" : mentor.status === "On Leave" ? "secondary" : "destructive"} className="mt-1">
                    {mentor.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-foreground">{mentor.rating}</span>
                    <span className="text-muted-foreground">({mentor.totalReviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium text-foreground">{mentor.studentsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Courses</span>
                  <span className="font-medium text-foreground">{mentor.coursesAssigned.length}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-medium text-foreground">{mentor.completionRate}%</span>
                  </div>
                  <Progress value={mentor.completionRate} className="h-1.5" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-[10px]">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedMentor(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Mentor Details</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedMentor(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-medium">{selectedMentor.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{selectedMentor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedMentor.bio}</p>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedMentor.studentsCount}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedMentor.rating}</p>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedMentor.completionRate}%</p>
                <p className="text-xs text-muted-foreground">Completion</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedMentor.avgResponseTime}</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-3 mb-4">
              <h4 className="font-medium text-foreground text-sm">Assigned Courses</h4>
              {selectedMentor.coursesAssigned.map((course) => (
                <div key={course} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{course}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-foreground text-sm">Contact</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{selectedMentor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{selectedMentor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {selectedMentor.joinDate}</span>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="flex gap-2">
              <Button className="flex-1">Edit Mentor</Button>
              <Button variant="outline" className="flex-1">Remove</Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
