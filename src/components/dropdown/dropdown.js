import { useNavigate } from "react-router-dom";
import "./dropdown.css";

const DropDown = (props) => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/sign-in");
    props.toggleDropDown();
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
    props.toggleDropDown();
  };

  const navigateToMyInfo = () => {
    navigate(`/user/${props.user.id}`);
    props.toggleDropDown();
  };

  return (
    <div className="dropDownContainer">
      <div className="interactionContainer">
        {props.user && (
          <div className="dropDownAction" onClick={props.logout}>
            Sign Out
          </div>
        )}
        {!props.user && (
          <div className="dropDownAction" onClick={navigateToSignIn}>
            Sign In
          </div>
        )}
        {!props.user && (
          <div className="dropDownAction" onClick={navigateToSignUp}>
            Sign Up
          </div>
        )}
        {props.user && (
          <div className="dropDownAction" onClick={navigateToMyInfo}>
            My Information
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;

/*

*/
