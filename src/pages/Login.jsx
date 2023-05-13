import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated,loading, setLoading } = useContext(Context);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="login-form">
        <h1 style={{ fontFamily: "cursive", marginTop: "30px" }}>Login</h1>
        <div className="card">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button type="submit" disabled={loading}>Login</button>
          </form>
        </div>
        <h5> Or</h5>
        <Link to={"/register"}>Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
