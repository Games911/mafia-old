import React, {useEffect} from 'react';
import './HomeCabinet.css';
import {Card} from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import {addUser, getRooms} from "../../../redux/actions/room/roomAction";
import { Button } from 'bootstrap-4-react';
import * as types from "../../../redux/types/room/roomType";
import {Link, useHistory} from "react-router-dom";

const HomeCabinet = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const roomsOnPage = 20;
    const {rooms, actualRooms, step, apiErrorMessage, success, currentRoomId} = useSelector(state => state.roomReducer);
    const {userId} = useSelector(state => state.userInfoReducer);

    useEffect(() => {
        dispatch({
            type: types.ROOM_SUCCESS,
            success: false,
        });
        if (success) {
            history.push('/cabinet/room/' + currentRoomId);
        }
        dispatch({
            type: types.ROOM_RESET_MESSAGE,
            message: '',
        });
        dispatch(getRooms(roomsOnPage));
    },[success, currentRoomId]);

    const moreRooms = () => {
        dispatch({
            type: types.ROOM_SET_ACTUAL,
            actualRooms: rooms.slice(0, step + roomsOnPage),
        });
        dispatch({
            type: types.ROOM_SET_STEP,
            step: step + roomsOnPage,
        });
    };

    const addUserToRoom = (roomId) => {
        dispatch(addUser(roomId, userId));
    };

    return (
        <div className="rooms-list">

            <h1>Home Cabinet</h1>

            {apiErrorMessage ? (
                <div className="alert alert-danger" role="alert">
                    <p>{apiErrorMessage}</p>
                </div>
            ): null}

            <Link to="/cabinet/create-room" className="link-create-room">Create room</Link>

            {actualRooms && actualRooms.length > 0 ? (
                <div className="rooms-list-block">
                    {actualRooms.map(item => (
                        <a className={(item.status === 'free') ? 'room-link-active' : 'room-link-none'} onClick={() => addUserToRoom(item._id)} key={item._id}>
                            <Card text="center">
                                <Card.Header>{item.status}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                </Card.Body>
                                <Card.Footer text="muted">{item.players.length} users</Card.Footer>
                            </Card>
                        </a>
                    ))}
                </div>
            ) : null}
            { actualRooms.length !== rooms.length ? (<Button primary onClick={moreRooms}>Show more</Button>) : null}
        </div>
    )
}

export default HomeCabinet;