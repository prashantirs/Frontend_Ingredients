import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import ToDoItem from "../components/ToDoItem";
import Loader from "../components/Loader";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated,loading, setLoading } = useContext(Context);

  const updateHandler =  async(id) => {
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials: true,
      });
      setRefresh((prev)=>( !prev))
      toast.success(data.message);
    } catch (error) {
       toast.error(error.response.data.message);
    }
  };
  
  const deleteHandler =  async(id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials: true,
        });
        setRefresh((prev)=>( !prev))
        toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

   const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setRefresh((prev)=>{return !prev})
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/all`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.tasks);
        setTasks(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  
  return (
    <>
      <div className="login-form">
        <h1 style={{ fontFamily: "cursive", marginTop: "30px" }}>Tasks</h1>
        <div className="card">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      </div>
      <div className="listed-task">
        {tasks.map((task) => {
          return (
          <ToDoItem key={task._id} id = {task._id} title={task.title} description={task.description} isCompleted={task.isCompleted}
           updateHandler={updateHandler} deleteHandler={deleteHandler}
           />
          );
        })}
      </div>
    </>
  );
};

export default Home;
