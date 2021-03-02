import * as types from "../../types/game/messageType";

const initialState = {
    textMessage: '',
    tableMessage: 'Congratulation !!!',
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MESSAGE_CHANGE_TEXT_MESSAGE:
            return {
                ...state,
                textMessage: action.text,
            };
        case types.MESSAGE_SET_TABLE_MESSAGE:
            return {
                ...state,
                tableMessage: action.text,
            };
        default:
            return state;
    }
};