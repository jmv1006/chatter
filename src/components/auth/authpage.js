import { useNavigate } from "react-router-dom";
import "./auth.css";

const AuthPage = () => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  const navigateToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="authPageContainer">
      <div className="authTitle">Welcome to Chatter.</div>
      <div className="authPageDescription">A Simple Messaging App.</div>
      <div className="authBtnContainer">
        <button onClick={navigateToSignUp} className="authBtn">
          Sign Up
        </button>
        <button onClick={navigateToSignIn} className="authBtn">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
