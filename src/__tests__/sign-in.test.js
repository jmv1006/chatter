import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../components/auth/sign-in";
import AuthContext from '../contexts/authcontext';

describe("Sign In Page", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <SignIn />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("calls handle submit function on button press", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <SignIn />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const button = screen.getByRole("button", {name: "Sign In"})
        userEvent.click(button)
        expect(screen.getByText("Signing In..."))
    });

    it("")

})