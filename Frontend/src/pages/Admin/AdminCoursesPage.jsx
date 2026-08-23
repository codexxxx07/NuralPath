import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Users,
  IndianRupee,
  Edit,
  Eye,
  Archive,
  CheckCircle2,
  XCircle,
  BookOpen,
  BarChart3,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

const courses = [
  {
    id: 1,
    title: "Advanced React & Next.js",
    instructor: "Rahul Sharma",
    students: 186,
    status: "Published",
    revenue: "₹3,72,000",
    price: "₹19,999",
    rating: 4.7,
    modules: 24,
    duration: "12 weeks",
    description: "Master advanced React patterns, Next.js App Router, server components, and production deployment strategies.",
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Neha Gupta",
    students: 234,
    status: "Published",
    revenue: "₹4,68,000",
    price: "₹19,999",
    rating: 4.8,
    modules: 28,
    duration: "14 weeks",
    description: "Comprehensive data science course covering Python, Pandas, NumPy, Matplotlib, Scikit-learn, and real-world projects.",
  },
  {
    id: 3,
    title: "Full Stack MERN Bootcamp",
    instructor: "Rahul Sharma",
    students: 198,
    status: "Published",
    revenue: "₹4,95,000",
    price: "₹24,999",
    rating: 4.6,
    modules: 32,
    duration: "16 weeks",
    description: "End-to-end web development with MongoDB, Express, React, and Node.js. Build 5+ production-ready applications.",
  },
  {
    id: 4,
    title: "Linux Administration Pro",
    instructor: "Rohan Verma",
    students: 142,
    status: "Published",
    revenue: "₹2,13,000",
    price: "₹14,999",
    rating: 4.9,
    modules: 20,
    duration: "10 weeks",
    description: "Master Linux system administration, networking, security, shell scripting, and cloud server management.",
  },
  {
    id: 5,
    title: "DevOps Bootcamp",
    instructor: "Neha Gupta",
    students: 87,
    status: "Draft",
    revenue: "₹0",
    price: "₹22,999",
    rating: 0,
    modules: 18,
    duration: "9 weeks",
    description: "Learn CI/CD, Docker, Kubernetes, Terraform, and cloud infrastructure management from scratch.",
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    instructor: "Rohan Verma",
    students: 0,
    status: "Draft",
    revenue: "₹0",
    price: "₹17,999",
    rating: 0,
    modules: 16,
    duration: "8 weeks",
    description: "Introduction to ethical hacking, network security, cryptography, and incident response procedures.",
  },
  {
    id: 7,
    title: "Machine Learning with Python",
    instructor: "Neha Gupta",
    students: 56,
    status: "Archived",
    revenue: "₹1,12,000",
    price: "₹19,999",
    rating: 4.5,
    modules: 22,
    duration: "11 weeks",
    description: "Covers ML algorithms, model evaluation, feature engineering, and deployment of ML models.",
  },
  {
    id: 8,
    title: "UI/UX Design Masterclass",
    instructor: "Rahul Sharma",
    students: 0,
    status: "Draft",
    revenue: "₹0",
    price: "₹12,999",
    rating: 0,
    modules: 14,
    duration: "7 weeks",
    description: "Design thinking, wireframing, prototyping with Figma, and building design systems.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AdminCoursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-1">{courses.length} courses on platform</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </motion.div>

      {showForm && (
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Create New Course</CardTitle>
                  <CardDescription>Set up a new course on the platform</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course Title</Label>
                  <Input placeholder="e.g. Advanced TypeScript Patterns" />
                </div>
                <div className="space-y-2">
                  <Label>Instructor</Label>
                  <Input placeholder="e.g. Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" placeholder="e.g. 19999" />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input placeholder="e.g. 10 weeks" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Course description..." rows={3} />
              </div>
              <div className="flex items-center gap-3">
                <Switch id="publish" />
                <Label htmlFor="publish">Publish immediately</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button>Create Course</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div className="space-y-3" variants={item}>
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <Badge variant={course.status === "Published" ? "success" : course.status === "Draft" ? "secondary" : "outline"}>
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.modules} modules</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.students} students</span>
                    {course.rating > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span> {course.rating}
                      </span>
                    )}
                    <span>Instructor: {course.instructor}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{course.price}</p>
                    <p className="text-xs text-muted-foreground">{course.revenue} total</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSelectedCourse(course)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked={course.status === "Published"} />
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {course.status === "Published" ? "Live" : "Hidden"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedCourse(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Course Details</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedCourse(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-foreground text-lg mb-1">{selectedCourse.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedCourse.students}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedCourse.revenue}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedCourse.modules}</p>
                <p className="text-xs text-muted-foreground">Modules</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-bold text-foreground">{selectedCourse.duration}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium text-foreground">{selectedCourse.instructor}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium text-foreground">{selectedCourse.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={selectedCourse.status === "Published" ? "success" : selectedCourse.status === "Draft" ? "secondary" : "outline"}>
                  {selectedCourse.status}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">Edit Course</Button>
              <Button variant="outline" className="flex-1">
                {selectedCourse.status === "Published" ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
