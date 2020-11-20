import * as types from "../types/authType";

const initialState = {
    email: 'Test',
    nikname: '',
    password: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_SIGNUP:
            return {
                ...state,
                email:action.email,
            }
        default:
            return state;
    }
};