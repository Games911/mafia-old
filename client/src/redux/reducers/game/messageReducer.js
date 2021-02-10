import * as types from "../../types/game/messageType";

const initialState = {
    messageText: '',
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MESSAGE_CHANGE_TEXT:
            return {
                ...state,
                messageText: action.text,
            };
        default:
            return state;
    }
};