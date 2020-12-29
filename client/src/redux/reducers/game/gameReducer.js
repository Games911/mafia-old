import * as types from "../../types/game/gameType";

const initialState = {
    player: [],
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GAME_SET_PLAYER:
            return {
                ...state,
                player: action.player,
            };
        default:
            return state;
    }
};