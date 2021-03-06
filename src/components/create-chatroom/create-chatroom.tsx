import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authcontext";
import SearchResult from "./search-result";
import "./create-chatroom.css";

interface ISearchResult {
  displayname: string,
  id: string,
  username: string
};

const CreateChatroom = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user] = userInfo;

  const [input, setInput] = useState({ input: "" });
  const [result, setResult] = useState<ISearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    setError(error => false);
    setIsLoading(isLoading => true);
    e.preventDefault();

    const response = await fetch(`/auth/users/${input.input}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
 
    if(!response.ok) {
      if(response.status === 500) {
        navigate('/error')
        return
      }
      setError(error => true)
      setIsLoading(isLoading => false)
    };

    const resJSON = await response.json();
    setIsLoading(false);
    handleSearchResult(resJSON);
  };

  const handleSearchResult = (result: ISearchResult) => {
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
      {error ? "User Not Found" : null}
      <div className="searchResultContainer">
        {result && <SearchResult result={result} user={user} />}
      </div>
    </div>
  );
};

export default CreateChatroom;
