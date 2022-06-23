import { useContext, useEffect } from "react";
import AuthPage from "../auth/authpage";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/authcontext";
import ChatListContainer from "../chatlist/chatlist-container";
import Dashboard from "../ui-redo/dashboard";

const HomePage = () => {
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  return (
    <div className="homepageContainer">
      {user ? <Dashboard /> : <AuthPage />}
    </div>
  );
};

export default HomePage;
