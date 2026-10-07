import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

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
    <div className="max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Courses</h1>
          <p className="mt-1 text-sm text-muted-foreground">{courses.length} courses · {courses.filter((c) => c.status === "Published").length} published</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>Create New Course</Button>
      </div>

      {showForm && (
        <section>
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Create New Course</h2>
            <p className="mt-1 text-xs text-muted-foreground">Fill in the details to create a new course</p>
          </div>
          <div className="card-depth mt-5 p-5 sm:p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Courses
        </h2>
        <div className="card-depth">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className={`flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-start sm:gap-8 sm:px-5 ${idx !== courses.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{course.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{course.description}</p>
                  </div>
                  <Badge variant={course.status === "Published" ? "success" : "secondary"} className="shrink-0">
                    {course.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {course.category} · {course.difficulty} · {course.students} students · {course.modules} modules · {course.lessons} lessons
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline">Preview</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
