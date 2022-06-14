import AuthContext from "../contexts/authcontext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = userInfo;

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(url) {
            fetchData(url)
        }
    }, [url])

    const fetchData = (url) => {
        setIsLoading(true)
        fetch(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
        .then((res) => {
            if (!res.ok) {
            throw new Error(res.status);
            }
            return res.json();
        })
        .then(res => {
            setIsLoading(false)
            setResponse(res)
        })
        .catch((error) => {
            if(error.message == '401') {
                logout()
                window.location.reload()
            }
            setIsLoading(false)
            setError(true)
        });
    }

    const reFetch = () => {
        fetchData(url)
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

    return { response, error, isLoading, reFetch}

}

export default useFetch