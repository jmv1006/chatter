import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const [formInfo, setFormInfo] = useState({username: '', password: '', confirmedpassword: '', displayname: ''})

    const handleChange = (e) => {
        const value = e.target.value;

        setFormInfo({
            ...formInfo,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/auth/sign-up', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formInfo)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error
            }
            return res.json()
        })
        .then(res => {
            console.log(res)
            navigate("/sign-in")
        })
        .catch(error => console.log(error))
    };

    return(
        <div>
            <h2>Sign Up Here</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Username" name="username" value={formInfo.username} onChange={handleChange} required></input>
                <input type="text" placeholder="Display Name" name="displayname" value={formInfo.displayname} onChange={handleChange} required></input>
                <input type="password" placeholder="Password" name="password" value={formInfo.password} onChange={handleChange} required></input>
                <input type="password" placeholder="Confirm Password" name="confirmedpassword" value={formInfo.confirmedpassword} onChange={handleChange} required></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;