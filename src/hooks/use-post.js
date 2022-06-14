import AuthContext from "../contexts/authcontext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usePost = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = userInfo;

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const postData = (url, body) => {
        setIsLoading(true)
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(res => {
            setResponse(res)
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            setError(true)
        })
    }

    const logout = () => {
        fetch("/auth/log-out")
        .then((res) => {
            res.json();
        })
        .then((res) => {
            setUser(null);
        });
    };

    return { postData, response, error, isLoading }

}

export default usePost