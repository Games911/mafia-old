import * as types from "../types/authType";
import axios from "axios";
import Base from "../helpers/Validation";


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

    return validation.errors.length;
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
        console.log(response);
        if (response.status === 201) {
            dispatch({
                type: types.AUTH_MESSAGE,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        console.log(error.response.data.message);
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

    return validation.errors.length;
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
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: types.AUTH_MESSAGE,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        console.log(error.response.data.message);
        dispatch({
            type: types.AUTH_SET_ERROR,
            errors: [error.response.data.message],
        });
    });
}