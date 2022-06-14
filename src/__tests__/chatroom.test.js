import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Chatroom from "../components/chatroom/chatroom";
import AuthContext from '../contexts/authcontext';

describe("Chatroom Page", () => {
    let scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <Chatroom />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("renders sending on send button click", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <Chatroom />
                </AuthContext.Provider>
            </BrowserRouter>
        );
        const button = screen.getByRole("button", { name: "Send"})
        userEvent.click(button)
        expect(screen.getByText("Sending..."))
    });

})