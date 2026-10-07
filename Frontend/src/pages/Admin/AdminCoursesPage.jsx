import { useState } from "react";
import { Plus, Edit, Eye, X } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";

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

export default function AdminCoursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Course Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">{courses.length} courses on platform</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      {showForm && (
        <section className="overflow-hidden rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">Create New Course</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Set up a new course on the platform</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button>Create Course</Button>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="border-b border-border pb-3 text-base font-semibold tracking-tight text-foreground">
          All Courses
        </h2>
        <div>
          {courses.map((course) => (
            <div key={course.id} className="border-b border-border py-5 transition-colors hover:bg-muted/40">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">{course.title}</h3>
                    <Badge variant={course.status === "Published" ? "success" : course.status === "Draft" ? "secondary" : "outline"}>
                      {course.status}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{course.description}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {course.modules} modules · {course.students} students
                    {course.rating > 0 && <> · ★ {course.rating}</>} · Instructor: {course.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{course.price}</p>
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
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {course.status === "Published" ? "Live" : "Hidden"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedCourse(null)}>
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-foreground">Course Details</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedCourse(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-5">
              <h3 className="mb-1 text-lg font-semibold text-foreground">{selectedCourse.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-2 border-t border-border">
              <div className="border-b border-border py-4 pr-4">
                <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedCourse.students}</p>
                <p className="mt-1 text-xs text-muted-foreground">Students</p>
              </div>
              <div className="border-b border-border py-4 pl-4">
                <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedCourse.revenue}</p>
                <p className="mt-1 text-xs text-muted-foreground">Revenue</p>
              </div>
              <div className="border-b border-border py-4 pr-4">
                <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedCourse.modules}</p>
                <p className="mt-1 text-xs text-muted-foreground">Modules</p>
              </div>
              <div className="border-b border-border py-4 pl-4">
                <p className="text-2xl font-semibold tracking-tight text-foreground">{selectedCourse.duration}</p>
                <p className="mt-1 text-xs text-muted-foreground">Duration</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium text-foreground">{selectedCourse.instructor}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium text-foreground">{selectedCourse.price}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={selectedCourse.status === "Published" ? "success" : selectedCourse.status === "Draft" ? "secondary" : "outline"}>
                  {selectedCourse.status}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex gap-2">
              <Button className="flex-1">Edit Course</Button>
              <Button variant="outline" className="flex-1">
                {selectedCourse.status === "Published" ? "Unpublish" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
