import { Route, Routes, Navigate } from "react-router-dom";
import Alert from "./components/alert/Alert";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/notFound/NotFound";
import Protected from "./components/protected/Protected";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="flex">
      <Alert />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in/" />} />
        <Route path={"/sign-in"} element={<SignIn />} />

        {/* Teacher's routes */}
        <Route
          path="/rms"
          element={<Protected components={<Navbar />} roles={["teacher"]} />}
        >
          <Route path={"/rms/dashboard"} element={<Dashboard />} />
        </Route>

        {/* Admin's routes */}
        <Route
          path="/rms/admin/"
          element={<Protected components={<Navbar />} roles={["admin"]} />}
        >
          <Route
            path={"/rms/admin/dashboard"}
            element={<h2>This isadmin dashboard</h2>}
          />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
