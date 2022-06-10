import React from "react";
import {screen, render} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import HomePage from "../components/home/home";
import AuthContext from '../contexts/authcontext';

describe("Home Page", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()]}}>
                    <HomePage />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("renders auth page if no user is signed in", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [null, jest.fn()], authToken: [null, jest.fn()]}}>
                    <HomePage />
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText("Welcome to Chatter."))
    });


    it("renders chat list page if user is signed in", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()]}}>
                    <HomePage />
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText("Your Conversations:"))
    });

})