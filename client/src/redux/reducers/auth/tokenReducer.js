import * as types from "../../types/auth/tokenType";

const initialState = {
    token: null,
};

export const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOKEN_SET:
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