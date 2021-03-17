import React from 'react';
import '../../RoomCabinet.css';
import {useSelector} from "react-redux";
import {Progress} from "bootstrap-4-react";


const PlayerPanelCabinet = (props) => {
    const {player, game, currentRound} = useSelector(state => state.gameReducer);

    const isYourNumber = () => {
        if (player && player.number === props.number && player.status !== 'kill') {
            const roleShort = (player.role === 'Mafia') ? 'M' : 'P';
            return (<div className="you-text">You - {roleShort}</div>);
        } else if (player && game && player.role === 'Mafia' && player.number !== props.number) {
            const currentPlayer = game.players.filter((player) => player.number === props.number);
            if (currentPlayer.length > 0 && currentPlayer[0].role === 'Mafia') {
                return (<div className="you-text">M</div>);
            }
        }
    }

    const getPollCount = () => {
        if (currentRound && currentRound.status === 'poll') {
            let player = game.players.filter((player) => Number(player.number) === props.number);
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

    const animate = () => {
        return (
            currentRound && currentRound.speaker === props.number && currentRound.status === 'alive' ||
            currentRound && currentRound.speaker === props.number && currentRound.status === 'poll' ||
            currentRound && currentRound.speaker === props.number && currentRound.status === 'poll-add' ||
            currentRound && currentRound.speaker === props.number && currentRound.status === 'mafia-poll'
        ) ? (
            <Progress>
                <Progress.Bar striped animated min="0" max="100" now="100" />
            </Progress>
        ) : null;
    }

    const isDied = () => {
        if (currentRound && game) {
            return(
                <div>
                    {game.players.map((value, index) => {
                        if (value.number === props.number && value.status === 'kill') {
                            return <div key={index} className="died-player">Died</div>
                        }
                    })}
                </div>
            );
        }
    }

    return (
        <div>
            {isYourNumber()}
            <div className="internal-block">
                {props.number}
            </div>
            {getPollCount()}
            {animate()}
            {isDied()}
        </div>
    )
}

export default PlayerPanelCabinet;