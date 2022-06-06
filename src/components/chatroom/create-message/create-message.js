import { useState } from "react";

const CreateMessage = (props) => {

    const [message, setMessage] = useState({text: ""})

    const handleChange =(e) => {
        const value = e.target.value;

        setMessage({
            ...message,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        props.emitMessage(message.text)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Message Here..." name="text" value={message.text} onChange={handleChange} required />
                <button type="submit">Send</button>
            </form>
            {message.text}
        </div>
    )
}

export default CreateMessage;