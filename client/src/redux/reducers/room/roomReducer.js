import * as types from "../../types/room/roomType";

const initialState = {
    rooms: [],
    actualRooms: [],
    step: 0,
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
        default:
            return state;
    }
};