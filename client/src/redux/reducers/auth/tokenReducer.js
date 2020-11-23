import * as types from "../../types/auth/tokenType";

const initialState = {
    token: '',
};

export const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOKEN_SET:
            console.log(action.token);
            return {
                ...state,
                token: action.token,
            }
        case types.TOKEN_REMOVE:
            return {
                ...state,
                token: '',
            }
        default:
            return state;
    }
};