import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./mainapp/App";
import SignIn from "./components/auth/sign-in";
import HomePage from "./components/home/home";
import Chatroom from "./components/chatroom/chatroom";
import SignUp from "./components/auth/sign-up";
import CreateChatroom from "./components/create-chatroom/create-chatroom";
import NotFound from "./components/404/not-found";
import SessionExpired from "./components/session-expired/session-expired";
import UserInfo from "./components/user-info/user-info-page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/chat/:chatId" element={<Chatroom />} />
        <Route path="/chat/create" element={<CreateChatroom />} />
        <Route path="/session-expired" element={<SessionExpired />} />
        <Route path="/user/:userId" element={<UserInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
