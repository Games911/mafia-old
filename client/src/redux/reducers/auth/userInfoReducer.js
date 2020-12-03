import * as types from "../../types/auth/userInfoType";

const initialState = {
    userId: '',
    userEmail: '',
    userNikname: '',
};

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_INFO_SET:
            return {
                ...state,
                userId: action.userId,
                userEmail: action.userEmail,
                userNikname: action.userNikname,
            }
        case types.USER_INFO_REMOVE:
            return {
                ...state,
                userEmail: '',
                userId: '',
                userNikname: '',
            }
        default:
            return state;
    }
};