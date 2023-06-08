import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Hompage from "./pages/Homepage";
import { Loader } from "@mantine/core";
import Menupage from "./pages/Menupage";
import TableDelete from "./pages/TableDelete";
import LandingPage from "./pages/Landingpage";
import userService from "./services/user.service";
import VerificationSuccsess from "./pages/VerificationSuccsess";
import ChangePassword from "./pages/ChangePassword";
import ForgetPasswort from "./pages/ForgetPasswort";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [loading, setIsloading] = useState(true);
  let isLoggedIn: boolean;
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // Do not run the redirection if the path is "/verifySuccess"
    if (
      location.pathname === "/verifySuccess" ||
      location.pathname === "/resetPassword"
    ) {
      setIsloading(false);
      return;
    }

    setIsloading(true);
    userService
      .getCurrentUser()
      .then(() => {
        isLoggedIn = true;
        setIsloading(false);
        navlogin();
      })
      .catch(() => {
        isLoggedIn = false;
        setIsloading(false);
        navlogin();
      });
  }, []);

  const navlogin = () => {
    if (!isLoggedIn) {
      navigate("/landingpage");
    } else {
      navigate("/");
    }
  };
  if (loading) return <Loader color="lime" size="xl" variant="bars" mt={400} />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Hompage />} />
        <Route path="landingpage" element={<LandingPage />} />
        <Route path="menu" element={<Menupage />} />
        <Route path="delete" element={<TableDelete />} />
        <Route path="verifySuccess" element={<VerificationSuccsess />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="forgetpassword" element={<ForgetPasswort />} />
        <Route path="resetPassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
export default App;
