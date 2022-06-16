import { Link } from "react-router-dom";

const SessionExpired = () => {
  return (
    <div>
      Session Expired. Please <Link to="/sign-in">Sign In</Link>.
    </div>
  );
};
export default SessionExpired;
