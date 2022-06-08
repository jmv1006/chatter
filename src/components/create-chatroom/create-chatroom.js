import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import SearchResult from "./search-result";
import "./create-chatroom.css";

const CreateChatroom = () => {
  const { userInfo, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user] = userInfo;
  const [token] = authToken;

  const [input, setInput] = useState({ input: "" });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    setError(false);
    setIsLoading(true);
    e.preventDefault();
    fetch(`/auth/users/${input.input}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        handleSearchResult(res[0]);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  };

  const handleSearchResult = (result) => {
    setResult(result);
  };

  return (
    <div className="createChatroomContainer">
      <div className="createChatroomTitle">Create Chatroom Here</div>
      <form onSubmit={handleSubmit} className="createChatroomForm">
        <label className="createChatroomFormLabel">
          Enter a User-Id or E-mail Address
        </label>
        <input
          type="text"
          className="createChatroomInput"
          name="input"
          value={input.input}
          onChange={handleChange}
          required
        />
        <button type="submit" className="createChatroomSearchBtn">
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {error ? "Could Not Find User" : null}
      <div className="searchResultContainer">
        {result && <SearchResult token={token} result={result} user={user} />}
      </div>
    </div>
  );
};

export default CreateChatroom;
