import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const Header = ({toggleDropDown}) => {
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
        onClick={toggleDropDown}
        className="gripLines"
      />
    </div>
  );
};

export default Header;
