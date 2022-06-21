import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import MessagesContainer from "../components/chatroom/messages/messages-container";
import AuthContext from '../contexts/authcontext';

describe("Messages Container", () => {
    let scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const socketMock = {
        on: jest.fn()
    }

    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <MessagesContainer isTyping={false} scrollToBottom={scrollIntoViewMock} dummydiv={jest.fn()} socket={socketMock} messagesResponse={null} messagesReFetch={jest.fn()} messagesAreLoading={false}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });


    it("renders appropriate text if no messages are in chatroom", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <MessagesContainer isTyping={false} scrollToBottom={scrollIntoViewMock} dummydiv={jest.fn()} socket={socketMock} messagesResponse={null} messagesReFetch={jest.fn()} messagesAreLoading={false}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText("No Messages In Chatroom Yet!"))
    });

})