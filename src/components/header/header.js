import { useNavigate } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div className="header">
      <div onClick={navigateHome} className="headerTitle">
        Chatter
      </div>
      <FontAwesomeIcon
        icon={faGripLines}
        onClick={props.toggleDropDown}
        className="gripLines"
      />
    </div>
  );
};

export default Header;
