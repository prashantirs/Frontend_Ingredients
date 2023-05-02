import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.scss";
import { createContext } from "react";
// Backend URL
export const server = "https://ingredients-app.onrender.com";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,user, setUser,loading, setLoading}}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AppWrapper />
  </React.StrictMode>
);
