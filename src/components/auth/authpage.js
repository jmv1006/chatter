import { Link } from "react-router-dom";

const AuthPage = (props) => {
    return(
        <div>
            <h2>Welcome to Chatter.</h2>
            <button><Link to="/sign-up">Sign Up</Link></button>
            <button><Link to="/sign-in">Sign In</Link></button>
        </div>
    )
}

export default AuthPage;