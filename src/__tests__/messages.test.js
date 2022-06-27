import React from "react";
import {screen, render} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import MessagesContainer from "../components/dashboard/conversation/messages/container-messages";
import AuthContext from '../contexts/authcontext';

const messageMock = {
    Text: "Test Message",
    Id: "1245",
    Time: "10",
    UserId: "test1234",
    Chatroom: "12345"
}

const messagesAndAmountMock = {
    messages: [],
    amount: 0
}

describe("Messages Component", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <MessagesContainer messagesAndAmount={messagesAndAmountMock}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("renders appropriate text when conversation has no messages", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <MessagesContainer messagesAndAmount={messagesAndAmountMock}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText('No Messages!'))
    });

    it("renders appropriate text when conversation has at least one message", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <MessagesContainer messagesAndAmount={{messages: [messageMock], messagesAmount: 1}}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
        expect(screen.getByText(messageMock.Text))
    });

})