import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Filter, Play } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const courses = [
  {
    id: 1,
    name: "Linux Fundamentals",
    instructor: "Rahul Sharma",
    progress: 72,
    nextLesson: "File Permissions & chmod",
    lastAccessed: "2 hours ago",
    totalLessons: 24,
    completedLessons: 17,
    duration: "8 weeks",
    level: "Beginner",
    tags: ["Linux", "System Admin"],
  },
  {
    id: 2,
    name: "Shell Scripting Mastery",
    instructor: "Priya Mehta",
    progress: 45,
    nextLesson: "Loops & Conditionals",
    lastAccessed: "Yesterday",
    totalLessons: 20,
    completedLessons: 9,
    duration: "6 weeks",
    level: "Intermediate",
    tags: ["Shell", "Automation"],
  },
  {
    id: 3,
    name: "C Programming Deep Dive",
    instructor: "Amit Verma",
    progress: 88,
    nextLesson: "Memory Management",
    lastAccessed: "5 hours ago",
    totalLessons: 30,
    completedLessons: 26,
    duration: "10 weeks",
    level: "Intermediate",
    tags: ["C", "Systems"],
  },
  {
    id: 4,
    name: "Open Source Contribution",
    instructor: "Neha Gupta",
    progress: 30,
    nextLesson: "Finding Your First Issue",
    lastAccessed: "3 days ago",
    totalLessons: 16,
    completedLessons: 5,
    duration: "4 weeks",
    level: "Beginner",
    tags: ["Git", "Open Source"],
  },
];

const filters = ["All Courses", "In Progress", "Completed", "Not Started"];
const sortOptions = ["Last Accessed", "Progress", "Name"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MyCoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All Courses");
  const [activeSort, setActiveSort] = useState("Last Accessed");

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "In Progress") return course.progress > 0 && course.progress < 100;
    if (activeFilter === "Completed") return course.progress === 100;
    if (activeFilter === "Not Started") return course.progress === 0;
    return true;
  });

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Courses</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your enrolled courses and progress</p>
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" variants={item}>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                activeFilter === filter
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="text-sm bg-background border border-border rounded-md px-2 py-1.5 text-foreground"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div className="grid gap-4" variants={item}>
        {filteredCourses.map((course) => (
          <Card key={course.id} className="transition-colors hover:border-primary/40">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground flex-shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <p className="text-sm font-medium text-foreground">{course.progress}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Lessons</p>
                      <p className="text-sm font-medium text-foreground">{course.completedLessons}/{course.totalLessons}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Accessed</p>
                      <p className="text-sm font-medium text-foreground">{course.lastAccessed}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Play className="h-3.5 w-3.5 text-primary mr-1.5" />
                      Next: {course.nextLesson}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard/courses">
                        Continue <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
