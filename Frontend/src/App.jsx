import { lazy, Suspense, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import MentorSidebar from "./components/common/MentorSidebar";
import AdminSidebar from "./components/common/AdminSidebar";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));
const CoursesPage = lazy(() => import("./pages/Courses/CoursesPage"));
const CourseDetailPage = lazy(() => import("./pages/Courses/CourseDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const StudentDashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));
const MyCoursesPage = lazy(() => import("./pages/Dashboard/MyCoursesPage"));
const LiveClassesPage = lazy(() => import("./pages/Dashboard/LiveClassesPage"));
const PracticeLabPage = lazy(() => import("./pages/Dashboard/PracticeLabPage"));
const AssignmentsPage = lazy(() => import("./pages/Dashboard/AssignmentsPage"));
const ProgressPage = lazy(() => import("./pages/Dashboard/ProgressPage"));
const DoubtSolvingPage = lazy(() => import("./pages/Dashboard/DoubtSolvingPage"));
const CertificatesPage = lazy(() => import("./pages/Dashboard/CertificatesPage"));
const SkillReportPage = lazy(() => import("./pages/Dashboard/SkillReportPage"));

const MentorDashboardPage = lazy(() => import("./pages/Mentor/MentorDashboardPage"));
const MentorCoursesPage = lazy(() => import("./pages/Mentor/MentorCoursesPage"));
const MentorLiveClassesPage = lazy(() => import("./pages/Mentor/MentorLiveClassesPage"));
const MentorSubmissionsPage = lazy(() => import("./pages/Mentor/MentorSubmissionsPage"));
const MentorStudentsPage = lazy(() => import("./pages/Mentor/MentorStudentsPage"));
const MentorAnalyticsPage = lazy(() => import("./pages/Mentor/MentorAnalyticsPage"));
const MentorPYQPage = lazy(() => import("./pages/Mentor/MentorPYQPage"));

const AdminDashboardPage = lazy(() => import("./pages/Admin/AdminDashboardPage"));
const AdminUsersPage = lazy(() => import("./pages/Admin/AdminUsersPage"));
const AdminBatchesPage = lazy(() => import("./pages/Admin/AdminBatchesPage"));
const AdminMentorsPage = lazy(() => import("./pages/Admin/AdminMentorsPage"));
const AdminCoursesPage = lazy(() => import("./pages/Admin/AdminCoursesPage"));
const AdminPaymentsPage = lazy(() => import("./pages/Admin/AdminPaymentsPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/Admin/AdminAnalyticsPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function MentorDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MentorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden lg:ml-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-2 lg:ml-0">
            <p className="text-sm text-muted-foreground">Mentor Dashboard</p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden lg:ml-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-2 lg:ml-0">
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="courses" element={<MyCoursesPage />} />
          <Route path="live-classes" element={<LiveClassesPage />} />
          <Route path="practice-lab" element={<PracticeLabPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="doubts" element={<DoubtSolvingPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="skill-report" element={<SkillReportPage />} />
        </Route>

        {/* Mentor Dashboard Routes */}
        <Route path="/mentor" element={<MentorDashboardLayout />}>
          <Route index element={<MentorDashboardPage />} />
          <Route path="courses" element={<MentorCoursesPage />} />
          <Route path="live-classes" element={<MentorLiveClassesPage />} />
          <Route path="submissions" element={<MentorSubmissionsPage />} />
          <Route path="students" element={<MentorStudentsPage />} />
          <Route path="analytics" element={<MentorAnalyticsPage />} />
          <Route path="pyq-management" element={<MentorPYQPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="batches" element={<AdminBatchesPage />} />
          <Route path="mentors" element={<AdminMentorsPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
