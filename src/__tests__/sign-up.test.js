import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../components/auth/sign-up";
import AuthContext from '../contexts/authcontext';

describe("Sign Up Page", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()]}}>
                    <SignUp />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("calls handle submit function on button press", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()]}}>
                    <SignUp />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const button = screen.getByRole("button", {name: "Sign Up"})
        userEvent.click(button)
        expect(screen.getByText("Signing Up..."))
    });

})