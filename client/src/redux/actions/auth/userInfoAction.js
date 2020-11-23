import * as typesUserInfo from "../../types/auth/userInfoType";
import jwt_decode from "jwt-decode";

export const setUserInfo = (token) =>async dispatch=>{
    if (token) {
        const decoded = jwt_decode(token);
        localStorage.setItem('userInfoId', decoded.id);
        localStorage.setItem('userInfoEmail', decoded.email);
        localStorage.setItem('userInfoNikname', decoded.nikname);
        dispatch({
            type: typesUserInfo.USER_INFO_SET,
            userId: decoded.id,
            userEmail: decoded.email,
            userNikname: decoded.nikname,
        });
    }
}

export const getUserNikname = () =>async dispatch=>{
    let nikname = localStorage.getItem('userInfoNikname');
    dispatch({
        type: typesUserInfo.USER_INFO_SET,
        userNikname: nikname,
    });
}

export const clearUserData = () =>async dispatch=>{
    localStorage.removeItem('userInfoId');
    localStorage.removeItem('userInfoEmail');
    localStorage.removeItem('userInfoNikname');
    dispatch({
        type: typesUserInfo.USER_INFO_REMOVE,
    });
}