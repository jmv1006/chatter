import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import SearchResult from "./search-result";

const CreateChatroom = () => {
    const { userInfo, authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    const [input, setInput] = useState({input: ''});
    const [result, setResult] = useState(null);

    useEffect(() => {
        if(!user) {
            navigate('/')
        };

    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setInput({
            ...input,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/auth/users/${input.input}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
        .then(res => {
            if(!res.ok) {
                throw new Error
            }
            return res.json()
        })
        .then(res => {
            handleSearchResult(res[0])
        })
        .catch(error => console.log(error))
    };

    const handleSearchResult = (result) => {
        setResult(result)
    }

    return(
        <div>
            Create Chatroom Here
            <form onSubmit={handleSubmit}>
                <label>Enter a user id or email</label>
                <input type="text" name="input" placeholder="Enter Info Here" value={input.input} onChange={handleChange} required />
                <button type="submit">Search</button>
            </form>
            {result && <SearchResult token={token} result={result} user={user}/>}
        </div>
    )
}

export default CreateChatroom;