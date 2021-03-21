import React from 'react';
import '../../RoomCabinet.css';
import {Button} from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import * as typesGame from "../../../../../redux/types/game/gameType";


const CenterPanelCabinet = (props) => {
    const dispatch = useDispatch();
    const {player, game, currentRound, chat, showPoll, showAddPoll, addPollArr, showMafiaPoll} = useSelector(state => state.gameReducer);

    const sendPoll = (playerId) => {
        const currentRoomId = localStorage.getItem('currentRoomId');
        dispatch({type: typesGame.GAME_SET_SHOW_POLL, showPoll: false});
        props.socket.emit("user-poll", {game: game, roundId: currentRound._id, roomId: currentRoomId, playerId: playerId});
    }

    const sendAddPoll = (addPollArr, value) => {
        const currentRoomId = localStorage.getItem('currentRoomId');
        dispatch({type: typesGame.GAME_SET_SHOW_ADD_POLL, showAddPoll: false});
        props.socket.emit("user-add-poll", {game: game, roundId: currentRound._id, roomId: currentRoomId, value: value});
    }

    const sendMafiaPoll = (playerId) => {
        const currentRoomId = localStorage.getItem('currentRoomId');
        dispatch({type: typesGame.GAME_SET_SHOW_MAFIA_POLL, showMafiaPoll: false});
        props.socket.emit("mafia-add-poll", {game: game, roundId: currentRound._id, roomId: currentRoomId, playerId: playerId});
    }

    const generatePollBlock = () => {
        if (currentRound && currentRound.status === 'poll' && currentRound.speaker === player.number && showPoll) {
            return (
                <div className="poll-block">
                    <h4>Please choose person who should leave game</h4>
                    <div className="poll-block-internal">
                        {game.players.map((value, index) => {
                            if (value.number !== player.number && value.status !== 'kill') {
                                return <div key={index} className="poll-block-item" onClick={() => sendPoll(value._id)}>{value.number}</div>
                            }
                        })}
                    </div>
                </div>
            )
        }
    }

    const confirmChoise = () => {
        if (currentRound && currentRound.status === 'poll-add' && currentRound.speaker === player.number && showAddPoll) {
            return (
                <div className="confirm-block">
                    <h4>What should we do with?</h4>
                    <div className="confirm-block-internal">
                        {addPollArr.map((value, index) => {
                            if (value.status !== 'kill') {
                                return <div key={index} className="confirm-block-item">{value.number}</div>
                            }
                        })}
                    </div>
                    <div className="confirm-block-action">
                        <Button primary onClick={() => sendAddPoll(addPollArr, 0)}>Alive</Button>
                        <Button danger onClick={() => sendAddPoll(addPollArr, 1)}>Kill all</Button>
                    </div>
                </div>
            )
        }
    }

    const mafiaPollBlock = () => {
        if (currentRound && currentRound.status === 'mafia-poll' && currentRound.speaker === player.number && showMafiaPoll && player.role === 'Mafia') {
            return (
                <div className="poll-block">
                    <h4>Please choose person who should leave game</h4>
                    <div className="poll-block-internal">
                        {game.players.map((value, index) => {
                            if (value.role !== 'Mafia' && value.status !== 'kill') {
                                return <div key={index} className="poll-block-item" onClick={() => sendMafiaPoll(value._id)}>{value.number}</div>
                            }
                        })}
                    </div>
                </div>
            )
        }
    }

    const showCenterPanel = () => {
        if (currentRound && (currentRound.status !== 'mafia' || (currentRound.status === 'mafia' && player.role === 'Mafia'))) {
            return (
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
                    {mafiaPollBlock()}
                </div>
            );
        }
    }

    return (
        <div className="center-area-center">
            {showCenterPanel()}
        </div>
    )
}

export default CenterPanelCabinet;