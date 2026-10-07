import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Progress } from "../../components/ui/progress";
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
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Courses</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your enrolled courses and progress</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "-mb-px border-b-2 pb-2 text-sm transition-colors",
                activeFilter === filter
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <select
          value={activeSort}
          onChange={(e) => setActiveSort(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col gap-4 border-b border-border py-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{course.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                by {course.instructor} · Next: {course.nextLesson}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                <span>{course.duration}</span>
                <span>Last accessed {course.lastAccessed}</span>
                <span>{course.tags.join(" · ")}</span>
              </div>
            </div>
            <div className="flex w-full items-center gap-4 sm:w-56">
              <Progress value={course.progress} className="flex-1" />
              <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
                {course.progress}%
              </span>
            </div>
            <Link
              to="/dashboard/courses"
              className="flex shrink-0 items-center gap-1 text-sm text-primary transition-colors hover:underline"
            >
              Continue
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
