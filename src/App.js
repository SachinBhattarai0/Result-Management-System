import { Route, Routes, Navigate } from "react-router-dom";
import Alert from "./components/alert/Alert";
import MarkInput from "./pages/MarkInput";
import Navbar from "./components/Navbar/SideNav";
import NotFound from "./components/notFound/NotFound";
import Protected from "./components/protected/Protected";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Mark from "./pages/Admin/Marks";
import Assignment from "./pages/Admin/Assignment";
import Class from "./pages/Admin/Class";
import Exam from "./pages/Admin/Exam";
import Subject from "./pages/Admin/Subject";
import User from "./pages/Admin/User";
import SignIn from "./pages/SignIn";
import ReportCard from "./pages/Admin/ReportCard";

function App() {
  return (
    <div className="flex font-roboto bg-gray-100 text-slate-800 max-h-screen">
      <Alert />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in/" />} />
        <Route path={"/sign-in"} element={<SignIn />} />

        {/* Teacher's routes */}
        <Route
          path="/rms"
          element={<Protected components={<Navbar />} roles={["teacher"]} />}
        >
          <Route path={"/rms/assignment"} element={<Dashboard />} />
          <Route path={"/rms/assignment/:id/"} element={<MarkInput />} />
        </Route>

        {/* Admin's routes */}
        <Route
          path="/rms/admin/"
          element={<Protected components={<Navbar />} roles={["admin"]} />}
        >
          <Route path={"/rms/admin/dashboard/"} element={<AdminDashboard />} />
          <Route path={"/rms/admin/mark/"} element={<Mark />} />
          <Route path={"/rms/admin/assignment/"} element={<Assignment />} />
          <Route path={"/rms/admin/report-card/"} element={<ReportCard />} />
          <Route path={"/rms/admin/class/"} element={<Class />} />
          <Route path={"/rms/admin/exam/"} element={<Exam />} />
          <Route path={"/rms/admin/subject/"} element={<Subject />} />
          <Route path={"/rms/admin/user/"} element={<User />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
