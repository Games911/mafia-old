import * as types from "../../types/game/gameType";

export const setPlayer = (currentPlayer) =>async dispatch=>{
    localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
}

export const setCurrentRound = (rounds) =>async dispatch=>{
    const currentRound = rounds.slice(-1)[0];
    dispatch({
        type: types.GAME_SET_CURRENT_ROUND,
        round: currentRound,
    });
}