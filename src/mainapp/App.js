import { useState, useEffect } from "react";
import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import "./app.css";
import AuthContext from "../contexts/authcontext";


function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log(user)
  });
  
  return (
    <div className="appContainer">
      <Header />
      <AuthContext.Provider value={{ userInfo: [user, setUser], authToken: [token, setToken] }}>
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
