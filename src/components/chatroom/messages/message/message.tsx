import { useContext } from "react";
import AuthContext from "../../../../contexts/authcontext";
import "./message.css";

interface IMessage {
  Text: string,
  Id: string, 
  Time: string,
  UserId: string
};

type MessageProps = {
  message: IMessage
};

const Message = ({ message }: MessageProps) => {
  const { userInfo } = useContext(AuthContext);

  const [user] = userInfo;

  const handleMessage = () => {
    if (message.UserId === user.id) {
      return (
        <div className="userMessage">
          <div className="userText">{message.Text}</div>
        </div>
      );
    }
    return (
      <div className="otherMessage">
        <div className="otherText">{message.Text}</div>
      </div>
    );
  };

  return handleMessage();
};

export default Message;