import * as typesToken from "../../types/auth/tokenType";

export const setToken = (token) =>async dispatch=>{
    if (token) {
        localStorage.setItem('jwt_token', token);
        dispatch({
            type: typesToken.TOKEN_SET,
            token: token,
        });
    }
}

export const getToken = () =>async dispatch=>{
    let token = localStorage.getItem('jwt_token');
    dispatch({
        type: typesToken.TOKEN_SET,
        token: token,
    });
    return token;
}

export const removeToken = () =>async dispatch=>{
    localStorage.removeItem('jwt_token');
    dispatch({
        type: typesToken.TOKEN_REMOVE,
    });
}