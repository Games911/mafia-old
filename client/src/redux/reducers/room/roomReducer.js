import * as types from "../../types/room/roomType";

const initialState = {
    rooms: [],
    actualRooms: [],
    step: 0,
    apiErrorMessage: '',
    success: false,
    currentRoomId: '',
};

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ROOM_SET:
            return {
                ...state,
                rooms: action.rooms,
            };
        case types.ROOM_SET_ACTUAL:
            return {
                ...state,
                actualRooms: action.actualRooms,
            };
        case types.ROOM_SET_STEP:
            return {
                ...state,
                step: action.step,
            };
        case types.ROOM_SET_MESSAGE:
            return {
                ...state,
                apiErrorMessage: action.message,
            };
        case types.ROOM_RESET_MESSAGE:
            return {
                ...state,
                apiErrorMessage: '',
            };
        case types.ROOM_SUCCESS:
            return {
                ...state,
                success: action.success,
            };
        case types.ROOM_SET_UP_CURRENT_ID:
            return {
                ...state,
                currentRoomId: action.id,
            };
        default:
            return state;
    }
};