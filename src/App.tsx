import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Hompage from "./pages/Homepage";
import { Loader } from "@mantine/core";
import Menupage from "./pages/Menupage";
import TableDelete from "./pages/TableDelete";
import LandingPage from "./pages/Landingpage";
import userService from "./services/user.service";

function App() {
  const [loading, setIsloading] = useState(true);
  let isLoggedIn: boolean;
  const navigate = useNavigate();

  useEffect(() => {
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
      </Routes>
    </>
  );
}
export default App;
