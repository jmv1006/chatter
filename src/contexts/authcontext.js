import { createContext } from 'react';

/*
interface IUser {
    displayname: string,
    id: string,
    username: string
};


interface IChatInfo {
    Id: string, 
    Member1: string, 
    Member1Name: string,
    Member2: string,
    Member2Name: string
};
  
interface INotification {
    message: string,
    user: IUser,
    chatInfo: IChatInfo
};

interface IAuthContext {
    userInfo: string,
    notificationHandler: string
}
*/
  
const AuthContext = createContext();

export default AuthContext;