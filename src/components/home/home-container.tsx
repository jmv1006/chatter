import { useContext, useEffect } from "react";
import AuthPage from "../auth/authpage";
import AuthContext from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";

const HomePageContainer = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  useEffect(() => {
    if(user) {
      navigate('/chats')
    }
  }, [])

  return (
    <div className="homepageContainer">
      {!user && <AuthPage />}
    </div>
  );
};

export default HomePageContainer;
