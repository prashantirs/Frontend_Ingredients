import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);


  const submitHandler = async(e) => {
    setLoading(true);
    e.preventDefault();
    try {
        const {data} = await axios.post(`${server}/new`,{name,email,password},{
            headers: {
                   "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        setLoading(false);
        setIsAuthenticated(true);
        toast.success(data.message);
    } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
    } 
  }

  if(isAuthenticated){
    return <Navigate to="/" />
    }

  return (
    <>
      <div className="login-form">
        <h1 style={{fontFamily:"cursive",marginTop:"30px"}}>Register</h1>
         <div className="card">
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                {/* <button type="submit">Register</button> */}
                <button type="submit" disabled={loading}>{loading ? <Loader/>:"Register"}</button>
            </form>
         </div>
         <h5> Or</h5>
         <Link to={"/login"} className="link-tag">Log In</Link>
      </div>
    </>
  );
};

export default Register;
