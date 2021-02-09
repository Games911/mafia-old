import * as types from "../../types/game/gameType";
import * as typesGame from "../../types/game/gameType";

export const setPlayer = (currentPlayer) =>async dispatch=>{
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    dispatch({
        type: typesGame.GAME_SET_PLAYER,
        player: currentPlayer,
    });
}

export const setCurrentRound = (currentRound) =>async dispatch=>{
    dispatch({
        type: types.GAME_SET_CURRENT_ROUND,
        round: currentRound,
    });
}

export const setChat = (round) =>async dispatch=>{
    dispatch({
        type: typesGame.GAME_SET_CHAT_ALL,
        chat: round.messages,
    });
}
export const clearChat = () =>async dispatch=>{
    dispatch({
        type: typesGame.GAME_SET_CHAT_ALL,
        chat: [],
    });
}

export const setGame = (game) =>async dispatch=>{
    dispatch({
        type: typesGame.GAME_SET_GAME,
        game: game,
    });
}

export const setMessage = (key, message) =>async dispatch=> {
    dispatch({
        type: typesGame.GAME_SET_CHAT_MESSAGE,
        message: {_id: key, text: message, type: 'system'},
    });
}