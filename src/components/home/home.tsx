import { useContext, useEffect } from "react";
import AuthPage from "../auth/authpage";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/authcontext";
import ChatListContainer from "../chatlist/chatlist-container";
import Dashboard from "../dashboard/dashboard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  return (
    <div className="homepageContainer">
      {user ? "Main Page Here" : <AuthPage />}
      {user && <Link to="/chats">Chats here</Link>}
    </div>
  );
};

export default HomePage;
