import * as types from "../types/authType";

const initialState = {
    email: '',
    nikname: '',
    password: '',
    errors: [],
    message: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_CHANGE_EMAIL:
            return {
                ...state,
                email: action.email
            };
        case types.AUTH_CHANGE_NIKNAME:
            return {
                ...state,
                nikname: action.nikname
            };
        case types.AUTH_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case types.AUTH_SET_ERROR:
            return {
                ...state,
                errors: action.errors
            };
        case types.AUTH_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        case types.AUTH_RESET_FORM:
            return {
                ...state,
                email: '',
                nikname: '',
                password: '',
                message: '',
                errors: []
            };
        default:
            return state;
    }
};