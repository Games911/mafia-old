import React from 'react';
import '../RoomCabinet.css';
import {Form, Button, Progress} from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import * as typesMessage from "../../../../redux/types/game/messageType";
import CenterPanelCabinet from "./center-panel/CenterPanelCabinet";


const WorkTableCabinet = () => {
    const dispatch = useDispatch();
    const ws = new WebSocket('ws://localhost:8888');

    const {player, game, currentRound} = useSelector(state => state.gameReducer);
    const {textMessage} = useSelector(state => state.messageReducer);


    const isYourNumber = (number) => {
        if (player && player.number === number && player.status !== 'kill') {
            const roleShort = (player.role === 'Mafia') ? 'M' : 'P';
            return (<div className="you-text">You - {roleShort}</div>);
        } else if (player && game && player.role === 'Mafia' && player.number !== number) {
            const currentPlayer = game.players.filter((player) => player.number === number);
            if (currentPlayer.length > 0 && currentPlayer[0].role === 'Mafia') {
                return (<div className="you-text">M</div>);
            }
        }
    }

    const animate = (number) => {
        return (
            currentRound && currentRound.speaker === number && currentRound.status === 'alive' ||
            currentRound && currentRound.speaker === number && currentRound.status === 'poll' ||
            currentRound && currentRound.speaker === number && currentRound.status === 'poll-add' ||
            currentRound && currentRound.speaker === number && currentRound.status === 'mafia-poll'
        ) ? (
            <Progress>
                <Progress.Bar striped animated min="0" max="100" now="100" />
            </Progress>
        ) : null;
    }

    const blockSendBtn = () => {
        return (!(currentRound && (currentRound.speaker === player.number || currentRound.status === 'chat' ||
            (currentRound.status === 'mafia' && player.role === 'Mafia')))
        );
    }

    const onChangeMessage = (event) => {
        dispatch({type: typesMessage.MESSAGE_CHANGE_TEXT_MESSAGE, text: event.target.value});
    };

    const sendMessage = () => {
        ws.send(JSON.stringify({route: 'send-message', game: game, roundId: currentRound._id, playerId: player._id, textMessage: player.number + ' - ' + textMessage}));
    }

    const getPollCount = (number) => {
        if (currentRound && currentRound.status === 'poll') {
            let player = game.players.filter((player) => Number(player.number) === Number(number));
            player = (player.length > 0) ? player[0] : [];
            if (player.poll > 0) {
                return (
                    <div className="poll-count">
                        {player.poll}
                    </div>
                )
            }
        }
    }

    const isDied = (number) => {
        if (currentRound && game) {
            return(
                <div>
                    {game.players.map((value, index) => {
                        if (value.number === number && value.status === 'kill') {
                            return <div key={index} className="died-player">Died</div>
                        }
                    })}
                </div>
            );

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
                    {getPollCount(1)}
                    {animate(1)}
                    {isDied(1)}
                </div>
                <div className="center-area">
                    <div className="center-area-top">
                        <div className="center-area-top-left">
                            {isYourNumber(2)}
                            {animate(2)}
                            <div className="internal-block">
                                2
                            </div>
                            {getPollCount(2)}
                            {isDied(2)}
                        </div>
                        <div className="center-area-top-right">
                            {isYourNumber(3)}
                            {animate(3)}
                            <div className="internal-block">
                                3
                            </div>
                            {getPollCount(3)}
                            {isDied(3)}
                        </div>
                    </div>
                    <CenterPanelCabinet />
                    <div className="center-area-bottom">
                        <div className="center-area-bottom-left">
                            {isYourNumber(6)}
                            <div className="internal-block">
                                6
                            </div>
                            {getPollCount(6)}
                            {isDied(6)}
                        </div>
                        <div className="center-area-bottom-right">
                            {isYourNumber(5)}
                            <div className="internal-block">
                                5
                            </div>
                            {getPollCount(5)}
                            {isDied(5)}
                        </div>
                    </div>
                </div>
                <div className="fourth-player">
                    {isYourNumber(4)}
                    <div className="internal-block">
                        4
                    </div>
                    {getPollCount(4)}
                    {isDied(4)}
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