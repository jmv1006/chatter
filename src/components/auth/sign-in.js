import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import './auth.css';

const SignIn = () => {
    const {userInfo, authToken} = useContext(AuthContext);

    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    const navigate = useNavigate();

    const [formInfo, setFormInfo] = useState({username: '', password: ''})
    const [error, setError] = useState(false);

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;

        setFormInfo({
            ...formInfo,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        setError(false)
        e.preventDefault()
        fetch('/auth/sign-in', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: formInfo.username, password: formInfo.password})
        })
        .then(res => {
            if(!res.ok) {
                throw new Error
            }
            return res.json()
        })
        .then(res => {
            setUser(res.user)
            setToken(res.token)
            navigate("/")
        })
        .catch(error => {
            setError(true)
        })
    };

    return(
        <div className="signUpPageContainer">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="signInForm">
                <input type="email" placeholder="Username" name="username" value={formInfo.username} onChange={handleChange} className="signInInput" required></input>
                <input type="password" placeholder="Password" name="password" value={formInfo.password} onChange={handleChange} className="signInInput" required></input>
                <button type="submit" className="authBtn">Sign In</button>
            </form>
            {error ? <div className="formError">Invalid Username or Password</div> : null}
        </div>
    )
}

export default SignIn;