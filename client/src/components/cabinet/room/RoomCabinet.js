import React, {useEffect} from 'react';
import './RoomCabinet.css';
import {Breadcrumb, Button, Container, Row, Col, Alert} from 'bootstrap-4-react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {outUser} from "../../../redux/actions/room/roomAction";
import {
    setChat,
    setPlayer,
    setTableMessage,
    setGame,
    setCurrentRound,
    clearChat, showPoll, setAddPollArr, showMafiaPoll
} from "../../../redux/actions/game/gameAction";
import WorkTableCabinet from "./work-table/WorkTableCabinet";


const RoomCabinet = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const ws = new WebSocket('ws://localhost:8888');

    const {currentRoom} = useSelector(state => state.roomReducer);
    const {userId} = useSelector(state => state.userInfoReducer);
    const {token} = useSelector(state => state.token);
    const {player} = useSelector(state => state.gameReducer);
    const {tableMessage} = useSelector(state => state.messageReducer);

    useEffect(() => {
        const currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
        guardGame(currentRoom, userId);
        if (currentRoom.status === 'busy' && player.length === 0) {
            setTimeout(() => {
                ws.send(JSON.stringify({route: 'start-game', roomId: currentRoom._id, room: currentRoom}));
            }, 1000);
        }
    },[currentRoom, player]);

    useEffect(() => {
        ws.onmessage = res => {
            const data = JSON.parse(res.data);
            console.log(data);

            switch (data.route) {
                case 'new-message':
                    dispatch(setChat(data.round));
                    break;
                case 'game-event':
                    if (data.game !== null) {
                        const currentRoomId = localStorage.getItem('currentRoomId');
                        const currentRound = data.game.rounds.slice(-1)[0];

                        if (currentRoomId === data.roomId) {
                            if (currentRound.speaker === 1) {
                                dispatch(clearChat());
                            }

                            if (currentRound.number !== 1 && currentRound.speaker === 1) {
                                dispatch(setTableMessage('Round ' + currentRound.number));
                            }
                            if (data.game.rounds.length === 1 && data.game.rounds[0].speaker === 1) {
                                dispatch(setTableMessage('Congratulation. Game started !!!'));
                            }
                            if (currentRound.status === 'chat') {
                                dispatch(setTableMessage('All Chat !!!'));
                            }
                            if (currentRound.status === 'poll') {
                                if (data.pollEvent) {
                                    dispatch(showPoll());
                                }
                                dispatch(setTableMessage('Poll time !!!'));
                            }
                            if (currentRound.status === 'poll-add') {
                                dispatch(setAddPollArr(data.addPollArr));
                                dispatch(setTableMessage('Additional poll !!!'));
                            }
                            if (currentRound.status === 'poll-end') {
                                let diedPlayers = ' | ';
                                let message = '';
                                if (data.addPollResult) {
                                    data.killedPlayersArr.forEach((player) => {
                                        diedPlayers = diedPlayers + player.number + ' | ';
                                    });
                                    message = 'You have killed players -> ' + diedPlayers;
                                } else {
                                    message = 'Everybody live!!!';
                                }
                                dispatch(setTableMessage(message));
                            }
                            if (currentRound.status === 'mafia') {
                                dispatch(setTableMessage('Mafia Chat !!!'));
                            }
                            if (currentRound.status === 'mafia-poll') {
                                dispatch(showMafiaPoll());
                                dispatch(setTableMessage('Mafia Poll !!!'));
                            }


                            dispatch(setGame(data.game));

                            const currentPlayer = getCurrentPlayer(data.game.players, userId);

                            if (currentRound.number === 1) {
                                dispatch(setPlayer(currentPlayer));
                            }

                            dispatch(setCurrentRound(currentRound));
                        }
                    }
                    break;
            }
        }
    }, []);

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

    const getCurrentPlayer = (players, userId) => {
        for(const element of players) {
            if (element.user === userId) {
                return element;
            }
        }
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
            <div className="serve-info">
                <Container>
                    <Row>
                        <Col col="11">
                            <nav aria-label="breadcrumb">
                                <Breadcrumb>
                                    <Breadcrumb.Item><Link to="/cabinet">Cabinet</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item active aria-current="page">Room</Breadcrumb.Item>
                                </Breadcrumb>
                            </nav>
                        </Col>
                        <Col col="1">
                            <Button danger onClick={exit}>Exit</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col col="12">
                            <Alert primary> {tableMessage}</Alert>
                        </Col>
                    </Row>
                </Container>
            </div>
            <WorkTableCabinet />
        </div>
    )
}

export default RoomCabinet;