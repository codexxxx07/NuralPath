import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  Users,
  Edit3,
  Eye,
  Clock,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { cn } from "../../lib/utils";

const initialCourses = [
  {
    id: 1,
    title: "Linux Fundamentals",
    description: "Master Linux from scratch including commands, file system, and process management.",
    category: "Operating Systems",
    difficulty: "Beginner",
    students: 52,
    status: "Published",
    modules: 12,
    lessons: 48,
  },
  {
    id: 2,
    title: "Shell Scripting Mastery",
    description: "Advanced shell scripting with Bash, automation, and real-world projects.",
    category: "Programming",
    difficulty: "Intermediate",
    students: 38,
    status: "Published",
    modules: 10,
    lessons: 40,
  },
  {
    id: 3,
    title: "C Programming Deep Dive",
    description: "Complete C programming from basics to memory management and data structures.",
    category: "Programming",
    difficulty: "Intermediate",
    students: 45,
    status: "Published",
    modules: 14,
    lessons: 56,
  },
  {
    id: 4,
    title: "Git & Open Source",
    description: "Version control with Git and contributing to open source projects.",
    category: "DevOps",
    difficulty: "Beginner",
    students: 0,
    status: "Draft",
    modules: 6,
    lessons: 24,
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

export default function MentorCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
  });

  const handleCreate = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.category || !newCourse.difficulty) return;
    const course = {
      id: courses.length + 1,
      ...newCourse,
      students: 0,
      status: "Draft",
      modules: 0,
      lessons: 0,
    };
    setCourses([...courses, course]);
    setNewCourse({ title: "", description: "", category: "", difficulty: "" });
    setShowForm(false);
  };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-1">{courses.length} courses · {courses.filter((c) => c.status === "Published").length} published</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Course</CardTitle>
              <CardDescription>Fill in the details to create a new course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course Title</Label>
                  <Input
                    placeholder="e.g., Docker Essentials"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newCourse.category} onValueChange={(val) => setNewCourse({ ...newCourse, category: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe what students will learn in this course..."
                  rows={3}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={newCourse.difficulty} onValueChange={(val) => setNewCourse({ ...newCourse, difficulty: val })}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button onClick={handleCreate}>Create Course</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={item}>
        {courses.map((course) => (
          <Card key={course.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                </div>
                <Badge variant={course.status === "Published" ? "success" : "secondary"}>
                  {course.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {course.students} students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {course.modules} modules
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {course.lessons} lessons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{course.category}</Badge>
                <Badge variant="outline" className="text-xs">{course.difficulty}</Badge>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
