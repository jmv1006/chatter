import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateChatroom from "../components/create-chatroom/create-chatroom";
import AuthContext from '../contexts/authcontext';

describe("Create Chatroom Page", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <CreateChatroom />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("calls handle submit function on button press", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <CreateChatroom />
                </AuthContext.Provider>
            </BrowserRouter>
        );
        const button = screen.getByRole("button", {name: "Search"})
        userEvent.click(button)
        expect(screen.getByText("Searching..."))
    });

})