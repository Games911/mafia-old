import * as types from "../../types/auth/authType";
import axios from "axios";
import {setToken} from "./tokenAction";
import {setUserInfo} from "./userInfoAction";
import {errorsResult, isEmail, isRequire, maxLength, minLength, startValidation} from "../../helpers/Validation";


export const emailValidate = (value) =>async dispatch=>{
    const field = 'email';

    startValidation(field);
    isRequire(value, field);
    isEmail(value, field);

    dispatch({
        type: types.AUTH_SET_EMAIL_ERROR,
        errors: errorsResult[field],
    });
    dispatch({
        type: types.AUTH_CHANGED_EMAIL_STATE,
        changed: true,
    });
};

export const niknameValidate = (value) =>async dispatch=>{
    const field = 'nikname';

    startValidation(field);
    isRequire(value, field);
    minLength(value, field, 2);
    maxLength(value, field, 20);

    dispatch({
        type: types.AUTH_SET_NIKNAME_ERROR,
        errors: errorsResult[field],
    });
    dispatch({
        type: types.AUTH_CHANGED_NIKNAME_STATE,
        changed: true,
    });
};

export const passwordValidate = (value) =>async dispatch=>{
    const field = 'password';

    startValidation(field);
    isRequire(value, field);
    minLength(value, field, 2);
    maxLength(value, field, 20);

    dispatch({
        type: types.AUTH_SET_PASSWORD_ERROR,
        errors: errorsResult[field],
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