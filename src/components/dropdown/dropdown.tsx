import { useNavigate } from "react-router-dom";
import "./dropdown.css";

type dropDownProps = {
  toggleDropDown: () => void,
  logout: () => void,
  user: {id: string, displayname: string, username: string}
}

const DropDown = ({ toggleDropDown, logout, user} : dropDownProps) => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/sign-in");
    toggleDropDown();
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
    toggleDropDown();
  };

  const navigateToMyInfo = () => {
    navigate(`/user/${user.id}`);
    toggleDropDown();
  };

  return (
    <div className="dropDownContainer">
      <div className="interactionContainer">
        {user && (
          <div className="dropDownAction" onClick={logout}>
            Sign Out
          </div>
        )}
        {!user && (
          <div className="dropDownAction" onClick={navigateToSignIn}>
            Sign In
          </div>
        )}
        {!user && (
          <div className="dropDownAction" onClick={navigateToSignUp}>
            Sign Up
          </div>
        )}
        {user && (
          <div className="dropDownAction" onClick={navigateToMyInfo}>
            My Information
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;