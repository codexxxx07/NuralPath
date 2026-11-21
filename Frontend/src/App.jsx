import { lazy, Suspense, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Menu, Info } from "lucide-react";
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
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const LibrariesPage = lazy(() => import("./pages/Libraries/LibrariesPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const PrivacyPage = lazy(() => import("./pages/Legal/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/Legal/TermsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const DsaHomePage = lazy(() => import("./pages/Dsa/DsaHomePage"));
const DsaRoadmapPage = lazy(() => import("./pages/Dsa/DsaRoadmapPage"));
const DsaTopicPage = lazy(() => import("./pages/Dsa/DsaTopicPage"));
const DsaPracticePage = lazy(() => import("./pages/Dsa/DsaPracticePage"));
const DsaInterviewPage = lazy(() => import("./pages/Dsa/DsaInterviewPage"));
const DsaCheatSheetsPage = lazy(() => import("./pages/Dsa/DsaCheatSheetsPage"));

const VlsiHomePage = lazy(() => import("./pages/Vlsi/VlsiHomePage"));
const VlsiRoadmapPage = lazy(() => import("./pages/Vlsi/VlsiRoadmapPage"));
const VlsiTopicPage = lazy(() => import("./pages/Vlsi/VlsiTopicPage"));
const VlsiInterviewPage = lazy(() => import("./pages/Vlsi/VlsiInterviewPage"));
const VlsiCheatSheetsPage = lazy(() => import("./pages/Vlsi/VlsiCheatSheetsPage"));

const QuizzesPage = lazy(() => import("./pages/Learning/QuizzesPage"));
const DailyChallengePage = lazy(() => import("./pages/Learning/DailyChallengePage"));
const NotesPage = lazy(() => import("./pages/Learning/NotesPage"));
const BlogsPage = lazy(() => import("./pages/Learning/BlogsPage"));
const BlogPostPage = lazy(() => import("./pages/Learning/BlogPostPage"));

const PlacementPage = lazy(() => import("./pages/Career/PlacementPage"));
const MockInterviewsPage = lazy(() => import("./pages/Career/MockInterviewsPage"));
const ResumePage = lazy(() => import("./pages/Career/ResumePage"));

const CommunityPage = lazy(() => import("./pages/Community/CommunityPage"));
const DoubtsPage = lazy(() => import("./pages/Community/DoubtsPage"));

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
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="metal grid h-10 w-10 place-items-center rounded-full">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-wood)] border-t-transparent" />
        </div>
        <p className="text-xs text-muted-foreground">Opening your desk…</p>
      </div>
    </div>
  );
}

function RoleDashboardLayout({ Sidebar, label, notice, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="desk flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex h-full flex-1 flex-col overflow-hidden lg:ml-0">
        <header className="flex h-14 shrink-0 items-center border-b border-[var(--color-wood-dark)]/40 bg-[var(--color-card)] px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="icon-btn grid h-9 w-9 place-items-center rounded-lg text-muted-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-2 flex items-center gap-2 lg:ml-0">
            <span className="h-2 w-2 rounded-full bg-[var(--color-brass)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-brass)_25%,transparent)]" />
            <p className="text-sm font-medium text-foreground">{label}</p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 lg:p-8" data-lenis-prevent>
          <div className="mb-5 flex items-start gap-2 rounded-lg border border-border bg-[var(--color-paper-warm)] px-3.5 py-2.5 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{notice}</span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function MentorDashboardLayout() {
  return (
    <RoleDashboardLayout
      Sidebar={MentorSidebar}
      label="Mentor Dashboard"
      notice="This dashboard is a frontend demo — no backend is connected yet, so all students, courses, and analytics shown here are sample data."
    >
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </RoleDashboardLayout>
  );
}

function AdminDashboardLayout() {
  return (
    <RoleDashboardLayout
      Sidebar={AdminSidebar}
      label="Admin Dashboard"
      notice="This dashboard is a frontend demo — no backend is connected yet, so all users, revenue, and analytics shown here are sample data."
    >
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </RoleDashboardLayout>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/libraries" element={<LibrariesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* DSA learning environment */}
          <Route path="/dsa" element={<DsaHomePage />} />
          <Route path="/dsa/roadmap" element={<DsaRoadmapPage />} />
          <Route path="/dsa/practice" element={<DsaPracticePage />} />
          <Route path="/dsa/interview-questions" element={<DsaInterviewPage />} />
          <Route path="/dsa/cheat-sheets" element={<DsaCheatSheetsPage />} />
          <Route path="/dsa/arrays" element={<DsaTopicPage slug="arrays" />} />
          <Route path="/dsa/strings" element={<DsaTopicPage slug="strings" />} />
          <Route path="/dsa/linked-list" element={<DsaTopicPage slug="linked-list" />} />
          <Route path="/dsa/stack-queue" element={<DsaTopicPage slug="stack-queue" />} />
          <Route path="/dsa/trees" element={<DsaTopicPage slug="trees" />} />
          <Route path="/dsa/graphs" element={<DsaTopicPage slug="graphs" />} />
          <Route path="/dsa/dp" element={<DsaTopicPage slug="dp" />} />

          {/* VLSI learning environment */}
          <Route path="/vlsi" element={<VlsiHomePage />} />
          <Route path="/vlsi/roadmap" element={<VlsiRoadmapPage />} />
          <Route path="/vlsi/interview-questions" element={<VlsiInterviewPage />} />
          <Route path="/vlsi/cheat-sheets" element={<VlsiCheatSheetsPage />} />
          <Route path="/vlsi/digital-electronics" element={<VlsiTopicPage slug="digital-electronics" />} />
          <Route path="/vlsi/analog-electronics" element={<VlsiTopicPage slug="analog-electronics" />} />
          <Route path="/vlsi/cmos" element={<VlsiTopicPage slug="cmos" />} />
          <Route path="/vlsi/verilog" element={<VlsiTopicPage slug="verilog" />} />
          <Route path="/vlsi/systemverilog" element={<VlsiTopicPage slug="systemverilog" />} />
          <Route path="/vlsi/sta" element={<VlsiTopicPage slug="sta" />} />
          <Route path="/vlsi/physical-design" element={<VlsiTopicPage slug="physical-design" />} />
          <Route path="/vlsi/dft" element={<VlsiTopicPage slug="dft" />} />
          <Route path="/vlsi/verification-uvm" element={<VlsiTopicPage slug="verification-uvm" />} />

          {/* Learning */}
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/daily-challenge" element={<DailyChallengePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />

          {/* Career */}
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/mock-interviews" element={<MockInterviewsPage />} />
          <Route path="/resume" element={<ResumePage />} />

          {/* Community */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/doubts" element={<DoubtsPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* Student dashboard */}
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

        {/* Mentor dashboard */}
        <Route path="/mentor" element={<MentorDashboardLayout />}>
          <Route index element={<MentorDashboardPage />} />
          <Route path="courses" element={<MentorCoursesPage />} />
          <Route path="live-classes" element={<MentorLiveClassesPage />} />
          <Route path="submissions" element={<MentorSubmissionsPage />} />
          <Route path="students" element={<MentorStudentsPage />} />
          <Route path="analytics" element={<MentorAnalyticsPage />} />
          <Route path="pyq-management" element={<MentorPYQPage />} />
        </Route>

        {/* Admin dashboard */}
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
