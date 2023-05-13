import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import Loader from "./components/Loader";

// FRONTEND_URL = http://localhost:5173    https://frontend-ingredients.vercel.app 

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated, loading, setLoading } =
    useContext(Context);

  useEffect(() => {
    axios
      .get(`${server}/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
