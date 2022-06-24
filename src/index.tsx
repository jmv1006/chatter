import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./mainapp/App";
import SignIn from "./components/auth/sign-in";
import HomePage from "./components/home/home";
import Chatroom from "./components/chatroom/chatroom";
import SignUp from "./components/auth/sign-up";
import CreateChatroom from "./components/create-chatroom/create-chatroom";
import NotFound from "./components/errors/not-found";
import ServerError from "./components/errors/server-error";
import UserInfo from "./components/user-info/user-info-page";
import Dashboard from "./components/ui-redo/dashboard";
import Conversation from "./components/ui-redo/room/conversation";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<Dashboard />}>
            <Route path="/chats/:chatId" element={<Conversation />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/chat/:chatId" element={<Chatroom />} />
        <Route path="/chat/create" element={<CreateChatroom />} />
        <Route path="/user/:userId" element={<UserInfo />} />
        <Route path="/error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
