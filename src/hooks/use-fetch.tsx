import AuthContext from "../contexts/authcontext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url: string) => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = userInfo;

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  const fetchData = async (url: string) => {
    setIsLoading(true);

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status == 401) {
        logout();
        return;
      };
      
      if(res.status === 500) {
        navigate('/error')
      };

      setIsLoading(false);
      setError(true);
      return
    }

    const resJSON = await res.json();
    setResponse(resJSON);
    setIsLoading(false);
  };

  const reFetch = () => {
    fetchData(url);
  };

  const logout = async () => {
    const response = await fetch("/auth/log-out");

    if(!response.ok) {
      //Error logging out
      return
    }
    
    navigate('/')
    window.location.reload()
  };

  return { response, error, isLoading, reFetch };
};

export default useFetch;