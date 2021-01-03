import * as types from "../../types/game/gameType";

export const setPlayer = (players, userId) =>async dispatch=>{
    const player = await getCurrentPlayer(players, userId);

    localStorage.setItem('currentPlayer', JSON.stringify(player));

    dispatch({
        type: types.GAME_SET_PLAYER,
        player: player,
    });
}

const getCurrentPlayer = async (players, userId) => {
    for(const element of players) {
        if (element.user === userId) {
            return element;
        }
    }
}