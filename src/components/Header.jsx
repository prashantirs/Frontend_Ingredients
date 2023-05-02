import { useContext } from "react";
import { Context, server } from "../main";
import "./Header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const logoutHandler =  async() => {
    console.log("logout is" + isAuthenticated);
    try {
      const {data} = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(true);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav>
      <div className="app-name">Ingredients App</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <Link onClick={logoutHandler}>Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
