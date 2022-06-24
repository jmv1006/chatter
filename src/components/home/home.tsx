import { useContext, useEffect } from "react";
import AuthPage from "../auth/authpage";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/authcontext";
import ChatListContainer from "../chatlist/chatlist-container";
import Dashboard from "../ui-redo/dashboard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  return (
    <div className="homepageContainer">
      {user ? "User" : <AuthPage />}
      <Link to="/chats">Chats here</Link>
    </div>
  );
};

export default HomePage;
