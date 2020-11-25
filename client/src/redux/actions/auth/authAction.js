import * as types from "../../types/auth/authType";
import axios from "axios";
import Base from "../../helpers/Validation";
import {setToken} from "./tokenAction";
import {setUserInfo} from "./userInfoAction";


// Signup
export const signupValidate = (email, nikname, password) =>async dispatch=>{
    let validation = new Base();
    validation.isRequire('email', email);
    validation.email('email', email);

    validation.isRequire('nikname', nikname);
    validation.minString('nikname', nikname, 2);
    validation.maxString('nikname', nikname, 20);

    validation.isRequire('password', password);
    validation.minString('password', password, 2);
    validation.maxString('password', password, 20);

    dispatch({
        type: types.AUTH_SET_ERROR,
        errors: validation.errors,
    });

    return validation.errors['valid'];
}

export const signup = (email, nikname, password) =>async dispatch=>{
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('nikname', nikname);
    params.append('password', password);

    axios({
        method: 'post',
        url: 'http://localhost:9999/auth/signup',
        data: params
    }).then((response) => {
        if (response.status === 201) {
            dispatch(setToken(response.data.token));
            dispatch(setUserInfo(response.data.token));
            dispatch({
                type: types.AUTH_MESSAGE,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        dispatch({
            type: types.AUTH_SET_ERROR,
            errors: [error.response.data.message],
        });
    });
}


// Signin
export const signinValidate = (nikname, password) =>async dispatch=>{
    let validation = new Base();

    validation.isRequire('nikname', nikname);
    validation.minString('nikname', nikname, 2);
    validation.maxString('nikname', nikname, 20);

    validation.isRequire('password', password);
    validation.minString('password', password, 2);
    validation.maxString('password', password, 20);

    dispatch({
        type: types.AUTH_SET_ERROR,
        errors: validation.errors,
    });

    return validation.errors['valid'];
}

export const signin = (nikname, password) =>async dispatch=>{
    const params = new URLSearchParams();
    params.append('nikname', nikname);
    params.append('password', password);

    axios({
        method: 'post',
        url: 'http://localhost:9999/auth/signin',
        data: params
    }).then((response) => {
        if (response.status === 200) {
            dispatch(setToken(response.data.token));
            dispatch(setUserInfo(response.data.token));
            dispatch({
                type: types.AUTH_MESSAGE,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        dispatch({
            type: types.AUTH_SET_ERROR,
            errors: [error.response.data.message],
        });
    });
}