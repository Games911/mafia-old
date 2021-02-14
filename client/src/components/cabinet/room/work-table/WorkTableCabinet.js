import React from 'react';
import '../RoomCabinet.css';
import {Form, Button, Progress} from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import * as typesMessage from "../../../../redux/types/game/messageType";


const WorkTableCabinet = () => {
    const dispatch = useDispatch();
    const ws = new WebSocket('ws://localhost:8888');

    const {player, game, currentRound, chat} = useSelector(state => state.gameReducer);
    const {textMessage} = useSelector(state => state.messageReducer);


    const isYourNumber = (number) => {
        return (player && player.number === number) ? (<div className="you-text">You</div>) : null;
    }

    const animate = (number) => {
        return (
            currentRound && currentRound.speaker === number && currentRound.status === 'alive' ||
            currentRound && currentRound.speaker === number && currentRound.status === 'poll'
        ) ? (
            <Progress>
                <Progress.Bar striped animated min="0" max="100" now="100" />
            </Progress>
        ) : null;
    }

    const blockSendBtn = () => {
        return (!(currentRound && (currentRound.speaker === player.number || currentRound.status === 'chat')));
    }

    const onChangeMessage = (event) => {
        dispatch({type: typesMessage.MESSAGE_CHANGE_TEXT_MESSAGE, text: event.target.value});
    };

    const sendMessage = () => {
        ws.send(JSON.stringify({route: 'send-message', game: game, roundId: currentRound._id, playerId: player._id, textMessage: textMessage}));
    }

    const generatePollBlock = () => {
        if (currentRound && currentRound.status === 'poll' && currentRound.speaker === player.number) {
            return (
                <div className="poll-block">
                    <h4>Please choose person who should leave game</h4>
                    <div className="poll-block-internal">
                        {game.players.map((value, index) => {
                            return <div key={index} className="poll-block-item">{value.number}</div>
                        })}
                    </div>
                </div>
            )
        }
    }

    const confirmChoise = () => {
        const elements = [1,2,3,4,5,6];
        const show = false;
        if (show) {
            return (
                <div className="confirm-block">
                    <h4>What should we do with?</h4>
                    <div className="confirm-block-internal">
                        {elements.map((value, index) => {
                            return <div key={index + 1} className="confirm-block-item">{index + 1}</div>
                        })}
                    </div>
                    <div className="confirm-block-action">
                        <Button primary>Alive</Button>
                        <Button danger>Remove</Button>
                    </div>
                </div>
            )
        }
    }

    const getPollCount = () => {
        const show = false;
        if (show) {
            return (
                <div className="poll-count">
                    2
                </div>
            )
        }
    }

    return (
        <div>
            <div className="work-block">
                <div className="first-player">
                    {isYourNumber(1)}
                    <div className="internal-block">
                        1
                    </div>
                    {getPollCount()}
                    {animate(1)}
                </div>
                <div className="center-area">
                    <div className="center-area-top">
                        <div className="center-area-top-left">
                            {isYourNumber(2)}
                            {animate(2)}
                            <div className="internal-block">
                                2
                            </div>
                            {getPollCount()}
                        </div>
                        <div className="center-area-top-right">
                            {isYourNumber(3)}
                            <div className="internal-block">
                                3
                            </div>
                            {getPollCount()}
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
                            {generatePollBlock()}
                            {confirmChoise()}
                        </div>
                    </div>
                    <div className="center-area-bottom">
                        <div className="center-area-bottom-left">
                            {isYourNumber(6)}
                            <div className="internal-block">
                                6
                            </div>
                            {getPollCount()}
                        </div>
                        <div className="center-area-bottom-right">
                            {isYourNumber(5)}
                            <div className="internal-block">
                                5
                            </div>
                            {getPollCount()}
                        </div>
                    </div>
                </div>
                <div className="fourth-player">
                    {isYourNumber(4)}
                    <div className="internal-block">
                        4
                    </div>
                    {getPollCount()}
                </div>
            </div>
            <div className="input-block">
                <Form.Input type="text" id="text" placeholder="Enter text"
                            value={textMessage}
                            onChange={onChangeMessage}
                />
                <Button primary disabled={blockSendBtn()} onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}

export default WorkTableCabinet;