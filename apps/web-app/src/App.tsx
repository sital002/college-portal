import { Route, Routes } from "react-router";
import RootLayout from "./rootLayout";
import Dashboard from "./pages/dashboard";
import TeacherAddPage from "./pages/teacher/add-teacer";
import TeacherViewPage from "./pages/teacher/manage-teacher";
import StudentViewPage from "./pages/student/student-view";
import StudentAddPage from "./pages/student/student-add";
import CourseAddPage from "./pages/course/add-course";
import CourseViewPage from "./pages/course/manage-course";
import NoticePublishPage from "./pages/notice/notice-publish";
import NoticeViewPage from "./pages/notice/manage-notice";
import AdminLogin from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="teacher/add" element={<TeacherAddPage />} />
        <Route path="teacher/manage" element={<TeacherViewPage />} />
        <Route path="student/manage" element={<StudentViewPage />} />
        <Route path="student/add" element={<StudentAddPage />} />
        <Route path="course/add" element={<CourseAddPage />} />
        <Route path="course/manage" element={<CourseViewPage />} />
        <Route path="notice/publish" element={<NoticePublishPage />} />
        <Route path="notice/manage" element={<NoticeViewPage />} />
      </Route>
        <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
