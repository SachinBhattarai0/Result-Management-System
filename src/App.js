import { Route, Routes, Navigate } from "react-router-dom";
import Alert from "./components/alert/Alert";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Alert />
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in/" />} />
        <Route path={"/sign-in"} element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
