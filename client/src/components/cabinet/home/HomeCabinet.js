import React, {useEffect} from 'react';
import './HomeCabinet.css';
import {Card} from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import {getRooms} from "../../../redux/actions/room/roomAction";
import { Button } from 'bootstrap-4-react';
import * as types from "../../../redux/types/room/roomType";

const HomeCabinet = () => {
    const dispatch = useDispatch();
    const roomsOnPage = 20;

    const {
        rooms, actualRooms, step
    } = useSelector(state => state.roomReducer);

    useEffect(() => {
        dispatch(getRooms(roomsOnPage));
    },[]);

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

    return (
        <div className="rooms-list">
            <h1>Home Cabinet</h1>
            {actualRooms && actualRooms.length > 0 ? (
                <div>
                    {actualRooms.map(item => (
                        <a href="#" key={item._id}>
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