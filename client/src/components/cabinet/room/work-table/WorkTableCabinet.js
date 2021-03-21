import React from 'react';
import '../RoomCabinet.css';
import {Form, Button} from 'bootstrap-4-react';
import {useDispatch, useSelector} from "react-redux";
import * as typesMessage from "../../../../redux/types/game/messageType";
import CenterPanelCabinet from "./center-panel/CenterPanelCabinet";
import PlayerPanelCabinet from "./player-panel/PlayerPanelCabinet";


const WorkTableCabinet = (props) => {
    const dispatch = useDispatch();
    const {player, game, currentRound} = useSelector(state => state.gameReducer);
    const {textMessage} = useSelector(state => state.messageReducer);

    const blockSendBtn = () => {
        return (!(currentRound && (currentRound.speaker === player.number || currentRound.status === 'chat' ||
            (currentRound.status === 'mafia' && player.role === 'Mafia')))
        );
    }

    const onChangeMessage = (event) => {
        dispatch({type: typesMessage.MESSAGE_CHANGE_TEXT_MESSAGE, text: event.target.value});
    };

    const sendMessage = () => {
        props.socket.emit("send-message", {game: game, roundId: currentRound._id, playerId: player._id, textMessage: player.number + ' - ' + textMessage});
    }

    return (
        <div>
            <div className="work-block">
                <div className="first-player">
                    <PlayerPanelCabinet number={1}/>
                </div>
                <div className="center-area">
                    <div className="center-area-top">
                        <div className="center-area-top-left">
                            <PlayerPanelCabinet number={2}/>
                        </div>
                        <div className="center-area-top-right">
                            <PlayerPanelCabinet number={3}/>
                        </div>
                    </div>
                    <CenterPanelCabinet socket={props.socket} />
                    <div className="center-area-bottom">
                        <div className="center-area-bottom-left">
                            <PlayerPanelCabinet number={6}/>
                        </div>
                        <div className="center-area-bottom-right">
                            <PlayerPanelCabinet number={5}/>
                        </div>
                    </div>
                </div>
                <div className="fourth-player">
                    <PlayerPanelCabinet number={4}/>
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