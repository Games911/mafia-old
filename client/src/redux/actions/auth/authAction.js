import * as types from "../../types/auth/authType";
import axios from "axios";
import {setToken} from "./tokenAction";
import {setUserInfo} from "./userInfoAction";


export const emailValidate = (value) =>async dispatch=>{
    const field = 'email';
    const errorsEmail = [];

    if (value === "" || !value) {
        errorsEmail.push(`The field ${field} shouldn't be empty.`);
    }

    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
        errorsEmail.push(`The field ${field} isn't valid email address.`);
    }

    dispatch({
        type: types.AUTH_SET_EMAIL_ERROR,
        errors: errorsEmail,
    });
    dispatch({
        type: types.AUTH_CHANGED_EMAIL_STATE,
        changed: true,
    });
};

export const niknameValidate = (value) =>async dispatch=>{
    const field = 'nikname';
    const errorsNikname = [];

    if (value === "" || !value) {
        errorsNikname.push(`The field ${field} shouldn't be empty.`);
    }
    if (value.length < 2) {
        errorsNikname.push(`The field ${field} shouldn't consist less then ${2} characters.`);
    }
    if (value.length > 20) {
        errorsNikname.push(`The field ${field} shouldn't consist more then ${20} characters.`);
    }

    dispatch({
        type: types.AUTH_SET_NIKNAME_ERROR,
        errors: errorsNikname,
    });
    dispatch({
        type: types.AUTH_CHANGED_NIKNAME_STATE,
        changed: true,
    });
};

export const passwordValidate = (value) =>async dispatch=>{
    const field = 'password';
    const errorsPassword = [];

    if (value === "" || !value) {
        errorsPassword.push(`The field ${field} shouldn't be empty.`);
    }
    if (value.length < 2) {
        errorsPassword.push(`The field ${field} shouldn't consist less then ${2} characters.`);
    }
    if (value.length > 20) {
        errorsPassword.push(`The field ${field} shouldn't consist more then ${20} characters.`);
    }

    dispatch({
        type: types.AUTH_SET_PASSWORD_ERROR,
        errors: errorsPassword,
    });
    dispatch({
        type: types.AUTH_CHANGED_PASSWORD_STATE,
        changed: true,
    });
};

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
                type: types.AUTH_API_SUCCESS,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        dispatch({
            type: types.AUTH_API_ERROR,
            errors: error.response.data.message,
        });
    });
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
                type: types.AUTH_API_SUCCESS,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        dispatch({
            type: types.AUTH_API_ERROR,
            message: error.response.data.message,
        });
    });
}