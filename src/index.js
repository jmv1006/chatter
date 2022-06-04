import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./mainapp/App";
import SignIn from "./components/auth/sign-in";
import HomePage from "./components/home/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
