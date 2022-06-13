import React from "react";
import {screen, render} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import ChatList from "../components/chatlist/chatlist";
import AuthContext from '../contexts/authcontext';

describe("Chat List Page", () => {

    const mockedChat = {
        Id: "sadssadasd"
    }
    
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <ChatList chats={[]} isLoading={true}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("renders appropriate text when user has no chats", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <ChatList chats={[]} isLoading={false}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText('Click "Create Chatroom" To Begin A Chat!'))
    });

    it("renders appropriate text when chats are loading", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()], authToken: [{}, jest.fn()], notificationHandler: [false, jest.fn()]}}>
                    <ChatList chats={[]} isLoading={true}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText('Loading Chats...'))
    });
})