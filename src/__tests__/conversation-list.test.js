import React from "react";
import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ConversationList from "../components/dashboard/list/conversationlist";
import AuthContext from '../contexts/authcontext';

describe("Conversation List Component", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <ConversationList chats={[]}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );
    });

    it("renders appropriate text when user has no conversations", () => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ userInfo: [{}, jest.fn()]}}>
                    <ConversationList chats={[]}/>
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect(screen.getByText('Click Create Conversation To Start A Chat.'))
    });

})