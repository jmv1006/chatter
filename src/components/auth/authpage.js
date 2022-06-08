import { Link } from "react-router-dom";
import './auth.css';

const AuthPage = (props) => {
    return(
        <div className="authPageContainer">
            <div className="authTitle">Welcome to Chatter.</div>
            <div className="authPageDescription">
                A Simple Messaging App.
            </div>
            <div className="authBtnContainer">
                <Link to="/sign-up" className="authBtnLink"><button>Sign Up</button></Link>
                <Link to="/sign-in" className="authBtnLink"><button>Sign In</button></Link>
            </div>
        </div>
    )
}

export default AuthPage;