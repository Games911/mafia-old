import React, {useEffect} from 'react';
import './RoomCabinet.css';
import {Collapse, Card, Form, Breadcrumb, Button, Container, Row, Col, Progress} from 'bootstrap-4-react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {outUser} from "../../../redux/actions/room/roomAction";
import * as typesGame from "../../../redux/types/game/gameType";
import * as typesMessage from "../../../redux/types/game/messageType";
import {setPlayer} from "../../../redux/actions/game/gameAction";


const RoomCabinet = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const ws = new WebSocket('ws://localhost:8888');

    const {currentRoom} = useSelector(state => state.roomReducer);
    const {userId} = useSelector(state => state.userInfoReducer);
    const {token} = useSelector(state => state.token);
    const {player, game, currentRound, chat} = useSelector(state => state.gameReducer);
    const {messageText} = useSelector(state => state.messageReducer);

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
            if (data.route === 'new-message') {
                dispatch({
                    type: typesGame.GAME_SET_CHAT_ALL,
                    chat: data.round.messages,
                });
            }
            if (data.route === 'start-game-event') {
                if (data.game !== null) {
                    const currentRoomId = localStorage.getItem('currentRoomId');
                    if (currentRoomId === data.roomId) {
                        if (data.game.rounds.length === 1 && data.game.rounds[0].speaker === 1) {
                            greetMessage();
                        }
                        dispatch({
                            type: typesGame.GAME_SET_GAME,
                            game: data.game,
                        });

                        const currentRound = data.game.rounds.slice(-1)[0];
                        const currentPlayer = getCurrentPlayer(data.game.players, userId);

                        if (currentRound.number === 1) {
                            dispatch(setPlayer(currentPlayer));
                            dispatch({
                                type: typesGame.GAME_SET_PLAYER,
                                player: currentPlayer,
                            });
                        }

                        dispatch({
                            type: typesGame.GAME_SET_CURRENT_ROUND,
                            round: currentRound,
                        });

                        if (currentRound.status === 'chat') {
                            console.log('Chat');
                            chatProcess(data.game, currentPlayer, currentRound);
                        } else if (currentRound.status === 'mafia') {
                            console.log('Mafia');
                            mafiaProcess(data.game, currentPlayer, currentRound);
                        } else if (currentRound.status === 'alive') {
                            console.log('Alive');
                            gameProcess(data.game, currentPlayer, currentRound);
                        }
                    }
                }
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

    const greetMessage = () => {
        if (chat.length === 0) {
            dispatch({
                type: typesGame.GAME_SET_CHAT_MESSAGE,
                message: {_id: 9999, text: 'Congratulation. Game started !!!', type: 'system'},
            });
        }
    }

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

    const isYourNumber = (number) => {
        return (player && player.number === number) ? (<div className="you-text">You</div>) : null;
    }

    const animate = (number) => {
        return (currentRound && currentRound.speaker === number) ? (
            <Progress>
                <Progress.Bar striped animated min="0" max="100" now="100" />
            </Progress>
        ) : null;
    }

    const blockSendBtn = () => {
        return (!(currentRound && (currentRound.speaker === player.number || currentRound.status === 'chat')));
    }

    const onChangeMessage = (event) => {
        dispatch({type: typesMessage.MESSAGE_CHANGE_TEXT, text: event.target.value});
    };

    const sendMessage = () => {
        ws.send(JSON.stringify({route: 'send-message', game: game, roundId: currentRound._id, playerId: player._id, messageText: messageText}));
    }

    const gameProcess = (game, player, currentRound) => {
        if (currentRound.speaker === player.number) {
            console.log('You are playing !!!');
            setTimeout(() => {
                const currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
                ws.send(JSON.stringify({route: 'game-next', game: game, roundId: currentRound._id, roomId: currentRoom._id}));
            }, 25000);
        }
    }

    const chatProcess = (game, player, currentRound) => {
        if (currentRound.speaker === player.number) {
            setTimeout(() => {
                const currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
                ws.send(JSON.stringify({route: 'game-next', game: game, roundId: currentRound._id, roomId: currentRoom._id}));
            }, 15000);
        }
    }

    const mafiaProcess = (game, player, currentRound) => {
        if (currentRound.speaker === player.number) {
            setTimeout(() => {
                const currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
                ws.send(JSON.stringify({route: 'game-next', game: game, roundId: currentRound._id, roomId: currentRoom._id}));
            }, 15000);
        }
    }

    return (
        <div className="rooms-cabinet">
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
                    {isYourNumber(1)}
                    <div>
                        1
                    </div>
                    {animate(1)}
                </div>
                <div className="center-area">
                    <div className="center-area-top">
                        <div className="center-area-top-left">
                            {isYourNumber(2)}
                            {animate(2)}
                            <div>
                                2
                            </div>
                        </div>
                        <div className="center-area-top-right">
                            {isYourNumber(3)}
                            <div>
                                3
                            </div>
                        </div>
                    </div>
                    <div className="center-area-center">
                        <div className="main-chat">
                            {chat && chat.length > 0 ? (
                                <div>
                                    {chat.map(item => (
                                        <p key={item._id} className={item.type === 'system' ? 'chat-system' : ''}>{item.text}</p>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="center-area-bottom">
                        <div className="center-area-bottom-left">
                            {isYourNumber(6)}
                            <div>
                                6
                            </div>
                        </div>
                        <div className="center-area-bottom-right">
                            {isYourNumber(5)}
                            <div>
                                5
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fourth-player">
                    {isYourNumber(4)}
                    <div>
                        4
                    </div>
                </div>
            </div>
            <div className="input-block">
                <Form.Input type="text" id="text" placeholder="Enter text"
                            value={messageText}
                            onChange={onChangeMessage}
                />
                <Button primary disabled={blockSendBtn()} onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}

export default RoomCabinet;