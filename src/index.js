import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import App from "./mainapp/App";
import SignIn from "./components/auth/sign-in";
import HomePage from "./components/home/home";
import Chatroom from "./components/chatroom/chatroom";
import SignUp from "./components/auth/sign-up";
import CreateChatroom from "./components/create-chatroom/create-chatroom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/chat/:chatId" element={<Chatroom key={window.location.pathname}/>} />
        <Route path="/chat/create" element={<CreateChatroom />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
