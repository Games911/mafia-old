import * as types from "../../types/game/gameType";
import * as typesMessage from "../../types/game/messageType";

export const setPlayer = (currentPlayer) =>async dispatch=>{
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    dispatch({
        type: types.GAME_SET_PLAYER,
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
        type: types.GAME_SET_CHAT_ALL,
        chat: round.messages,
    });
}
export const clearChat = () =>async dispatch=>{
    dispatch({
        type: types.GAME_SET_CHAT_ALL,
        chat: [],
    });
}

export const setGame = (game) =>async dispatch=>{
    dispatch({
        type: types.GAME_SET_GAME,
        game: game,
    });
}

export const showPoll = () =>async dispatch=>{
    dispatch({
        type: types.GAME_SET_SHOW_POLL,
        showPoll: true,
    });
}

export const setAddPollArr = (addPollArr) =>async dispatch=>{
    dispatch({
        type: types.GAME_SET_ADD_POLL_ARR,
        addPollArr: addPollArr,
    });
}

export const showMafiaPoll = () =>async dispatch=>{
    dispatch({
        type: types.GAME_SET_SHOW_MAFIA_POLL,
        showMafiaPoll: true,
    });
}

export const setTableMessage = (message) =>async dispatch=> {
    dispatch({
        type: typesMessage.MESSAGE_SET_TABLE_MESSAGE,
        text: message,
    });
}