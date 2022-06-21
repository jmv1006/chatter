import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Info from "../components/user-info/info";
import EditUserInfo from "../components/user-info/edit-user-info/edit-user-info";
import AuthContext from '../contexts/authcontext';

describe("User Info Page", () => { 

    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <Info />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("renders link to chat between users if it exists", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <Info chat={{}}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
        screen.getByText("Go To Chat")
    });

    it("renders create chatroom button if user does not have a chat with current user and is not current user", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <Info chat={null} isLoading={false} chatIsLoading={false} isCurrentUser={false} buttonText={"Create Chatroom"}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText("Create Chatroom"))
    });
    
});

describe("Edit User Info Page", () => {

    const mockedUser = {
        Id: "1245"
    };

    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <EditUserInfo user={mockedUser} toggleIsEditing={jest.fn()} />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("calls save and exit on button press", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <EditUserInfo user={mockedUser} toggleIsEditing={jest.fn()} />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        const button = screen.getByText("Save & Exit")
        userEvent.click(button)
        expect(screen.getByText("Saving..."))
    });
});