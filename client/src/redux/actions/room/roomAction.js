import axios from "axios";
import * as types from "../../types/room/roomType";


export const getRooms = (roomsOnPage) =>async dispatch=>{
    axios({
        method: 'get',
        url: 'http://localhost:9999/room'
    }).then((response) => {
        const rooms = response.data.rooms;
        if (response.status === 200) {
            dispatch({
                type: types.ROOM_SET,
                rooms: rooms,
            });
            dispatch({
                type: types.ROOM_SET_ACTUAL,
                actualRooms: rooms.slice(0, roomsOnPage),
            });
            dispatch({
                type: types.ROOM_SET_STEP,
                step: roomsOnPage,
            });
        }
    }).catch((error) => {
        console.log(error.response.data.message);
    });
}

export const addUser = (roomId, userId) =>async dispatch=>{
    const params = new URLSearchParams();
    params.append('userId', userId);

    dispatch({
        type: types.ROOM_SET_UP_CURRENT_ID,
        id: roomId,
    });

    axios({
        method: 'post',
        url: 'http://localhost:9999/room/' + roomId + '/add-user',
        data: params
    }).then((response) => {
        if (response.status === 200) {
            dispatch({
                type: types.ROOM_SUCCESS,
                success: true,
            });
        }
    }).catch((error) => {
        dispatch({
            type: types.ROOM_SET_MESSAGE,
            message: error.response.data.message,
        });
    });
};

export const outUser = (roomId, userId) =>async dispatch=>{
    axios({
        method: 'get',
        url: 'http://localhost:9999/room/' + roomId + '/out/' + userId
    }).then((response) => {

    }).catch((error) => {
        console.log(error.response);
    });
};

