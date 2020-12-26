import React, {useEffect} from 'react';
import './RoomCabinet.css';
import {Collapse, Card, Form, Breadcrumb, Button, Container, Row, Col} from 'bootstrap-4-react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {outUser} from "../../../redux/actions/room/roomAction";
import * as types from "../../../redux/types/room/roomType";


const RoomCabinet = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const ws = new WebSocket('ws://localhost:9999');

    const {start, currentRoom} = useSelector(state => state.roomReducer);
    const {userId} = useSelector(state => state.userInfoReducer);
    const {token} = useSelector(state => state.token);

    useEffect(() => {
        const currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
        guardGame(currentRoom, userId)

        if (currentRoom !== null && currentRoom.status === 'busy') {
            setTimeout(() => {
                ws.send(JSON.stringify({route: 'start-game', roomId: currentRoom._id}));
            }, 1000);
        }

        ws.onmessage = res => {
            const data = JSON.parse(res.data);
            if (data.route === 'start-game-event') {
                const currentRoomId = localStorage.getItem('currentRoomId');
                if (currentRoomId === data.roomId) {
                    dispatch({
                        type: types.ROOM_START,
                        start: true,
                    });
                }
            }
        }
    },[currentRoom]);

    const exit = () => {
        const roomId = getRoomParam();
        dispatch(outUser(roomId, userId, token));
        history.push('/cabinet');
    };

    const getRoomParam = () => {
        const currentLocation = window.location.pathname;
        const locationArr = currentLocation.split('/');
        return locationArr.slice(-1)[0];
    };

    const checkStart = () => {
        return (start) ? (<h1>Amazing</h1>) : '';
    }
    
    const guardGame = (currentRoom, userId) => {
        if (currentRoom !== null) {
            const users = currentRoom.users.filter(element => String(element._id) === String(userId));
            if (users.length < 1) {
                history.push('/cabinet/');
            }
        } else {
            history.push('/cabinet/');
        }
    };

    return (
        <div className="rooms-cabinet">
            <div>{checkStart()}</div>
            <div className="serve-info">
                <nav aria-label="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/cabinet">Cabinet</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active aria-current="page">Room</Breadcrumb.Item>
                    </Breadcrumb>
                </nav>

                <Container>
                    <Row>
                        <Col col="11">
                            <div id="accordionExample">
                                <Card>
                                    <Card.Header mb="0">
                                        <Collapse.Button link target="#collapseOne" id="headingOne" aria-expanded="true">
                                            Read regulations
                                        </Collapse.Button>
                                    </Card.Header>
                                    <Collapse id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <Card.Body>
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </Card.Body>
                                    </Collapse>
                                </Card>
                            </div>
                        </Col>
                        <Col col="sm">
                            <Button danger onClick={exit}>Exit</Button>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div className="work-block">
                <div className="first-player">
                    <div>
                        1
                    </div>
                </div>
                <div className="center-area">
                    <div className="center-area-top">
                        <div className="center-area-top-left">
                            <div>
                                2
                            </div>
                        </div>
                        <div className="center-area-top-right">
                            <div>
                                3
                            </div>
                        </div>
                    </div>
                    <div className="center-area-center">
                        <div className="main-chat">

                        </div>
                    </div>
                    <div className="center-area-bottom">
                        <div className="center-area-bottom-left">
                            <div>
                                6
                            </div>
                        </div>
                        <div className="center-area-bottom-right">
                            <div>
                                5
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fourth-player">
                    <div>
                        4
                    </div>
                </div>
            </div>
            <div className="input-block">
                <Form.Input type="text" id="text" placeholder="Enter text" />
            </div>
        </div>
    )
}

export default RoomCabinet;