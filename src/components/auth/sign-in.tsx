import { useState, useContext, useEffect } from "react";
import AuthContext from "../../contexts/authcontext";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

type formInfoTypes = {
  username: string,
  password: string
};

const SignIn = () => {
  const { userInfo } = useContext(AuthContext);

  const [user, setUser] = userInfo;

  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState<formInfoTypes >({ username: "", password: "" });
  const [error, setError] = useState<boolean >(false);
  const [serverError, setServerError] = useState<boolean >(false)
  const [isLoading, setIsLoading] = useState<boolean >(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;

    setFormInfo({
      ...formInfo,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    const response = await fetch("/auth/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formInfo.username,
        password: formInfo.password,
      }),
    });

    if(!response.ok) {
      if(response.status === 500) {
        setServerError(true)
        setIsLoading(false)
        return
      }
      setError(true)
      setIsLoading(false)
      return
    };

    const responseJSON = await response.json();
    setUser(responseJSON.user);
    setIsLoading(false);
    navigate('/')
  };

  return (
    <div className="signUpPageContainer">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signInForm">
        <input
          type="email"
          placeholder="Username (E-mail)"
          name="username"
          value={formInfo.username}
          onChange={handleChange}
          className="signInInput"
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formInfo.password}
          onChange={handleChange}
          className="signInInput"
          required
        ></input>
        <button type="submit" className="authBtn">
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div>Don't Have An Account? <Link to="/sign-up">Sign Up Here.</Link></div>
      {error && <div className="formError">Incorrect Username or Password</div>}
      {serverError && <div className="formError">Error Connecting To Server</div>}
    </div>
  );
};

export default SignIn;
