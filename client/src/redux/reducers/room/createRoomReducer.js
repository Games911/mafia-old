import * as types from "../../types/room/createRoomType";

const initialState = {
    name: '',
    errorsName: [],
    changedName: false,
    apiErrorMessage: '',
};

export const createRoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ROOM_CHANGE_NAME:
            return {
                ...state,
                name: action.name
            };
        case types.CREATE_ROOM_SET_NAME_ERROR:
            return {
                ...state,
                errorsName: action.errors
            };
        case types.CREATE_ROOM_CHANGED_NAME_STATE:
            return {
                ...state,
                changedName: action.changed
            };
        case types.CREATE_ROOM_API_ERROR:
            return {
                ...state,
                apiErrorMessage: action.message
            };
        case types.CREATE_ROOM_RESET_FORM:
            return {
                ...state,
                name: '',
                errorsName: [],
                changedName: false,
                apiErrorMessage: '',
            };
        default:
            return state;
    }
};