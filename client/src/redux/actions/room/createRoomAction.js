import {errorsResult, isRequire, maxLength, minLength, startValidation} from "../../helpers/Validation";
import * as types from "../../types/room/createRoomType";
import axios from "axios";
import {setToken} from "../auth/tokenAction";
import {setUserInfo} from "../auth/userInfoAction";


export const nameValidate = (value) =>async dispatch=>{
    const field = 'name';

    startValidation(field);
    isRequire(value, field);
    minLength(value, field, 2);
    maxLength(value, field, 20);

    dispatch({
        type: types.CREATE_ROOM_SET_NAME_ERROR,
        errors: errorsResult[field],
    });
    dispatch({
        type: types.CREATE_ROOM_CHANGED_NAME_STATE,
        changed: true,
    });
};

export const createRoom = (name, userId) =>async dispatch=>{
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('userId', userId);

    axios({
        method: 'post',
        url: 'http://localhost:9999/room',
        data: params
    }).then((response) => {
        if (response.status === 201) {
            dispatch({
                type: types.CREATE_ROOM_API_SUCCESS,
                message: response.data.message,
            });
        }
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: types.CREATE_ROOM_API_ERROR,
            message: error.response.data.message,
        });
    });
}