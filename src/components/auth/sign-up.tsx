import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type IFormInfo = {
  username: string,
  password: string,
  confirmedpassword: string,
  displayname: string
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState<IFormInfo >({
    username: "",
    password: "",
    confirmedpassword: "",
    displayname: "",
  });

  const [error, setError] = useState<boolean >(false);
  const [serverError, setServerError] = useState<boolean >(false);
  const [buttonText, setButtonText] = useState<string >("Sign Up");

  const handleChange = (e: any) => {
    const value = e.target.value;

    setFormInfo({
      ...formInfo,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    setButtonText("Signing Up...");
    e.preventDefault();

    const response = await fetch("/auth/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });

    if(!response.ok) {
      if(response.status === 500) {
        //server error  
        setServerError(true)
        setButtonText("Sign Up")
        return
      }
      setError(true)
      setButtonText("Sign Up")
    };

    setButtonText("Successful");
    setTimeout(() => {
      navigate('/sign-in')
    }, 1500)
  };

  return (
    <div className="signUpPageContainer">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="inputContainer">
          <label htmlFor="username">Username (E-mail)</label>
          <input
            type="email"
            name="username"
            value={formInfo.username}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">Required</div>
        </div>
        <div className="inputContainer">
          <label htmlFor="displayname">Display Name</label>
          <input
            type="text"
            name="displayname"
            value={formInfo.displayname}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">Required</div>
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formInfo.password}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">
            Must Be At Least 3 Characters Long
          </div>
        </div>
        <div className="inputContainer">
          <label htmlFor="confirmedpassword">Confirm Password</label>
          <input
            type="password"
            name="confirmedpassword"
            value={formInfo.confirmedpassword}
            onChange={handleChange}
            className="signUpInput"
            required
          ></input>
          <div className="inputSecondaryInfo">Must Match Password</div>
        </div>
        {error ? (
          <div className="formError">
            Error Signing Up: Please Ensure All Requirements Are Met
          </div>
        ) : null}
        <button type="submit" className="signUpBtn">
          {buttonText}
        </button>
        <div>Already Have An Account? <Link to="/sign-in">Sign In Here.</Link></div>
        {serverError && <div className="formError">Error Connecting To Server</div>}
      </form>
    </div>
  );
};

export default SignUp;
