import { useState, useContext } from "react";
import AuthContext from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const {userInfo, authToken} = useContext(AuthContext);

    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    const navigate = useNavigate();

    const [formInfo, setFormInfo] = useState({username: '', password: ''})

    const handleChange = (e) => {
        const value = e.target.value;

        setFormInfo({
            ...formInfo,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
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
            console.log(res)
            setUser(res.user)
            setToken(res.token)
            navigate("/")
        })
        .catch(error => console.log(error))
    };

    return(
        <div>
            <h2>Sign In Here</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Username" name="username" value={formInfo.username} onChange={handleChange} required></input>
                <input type="password" placeholder="Password" name="password" value={formInfo.password} onChange={handleChange} required></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignIn;