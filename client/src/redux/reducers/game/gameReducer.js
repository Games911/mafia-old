import * as types from "../../types/game/gameType";

const initialState = {
    player: [],
    game: null,
    currentRound: null,
    chat: [],
    showPoll: true,
    showAddPoll: true,
    addPollArr: [],
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GAME_SET_PLAYER:
            return {
                ...state,
                player: action.player,
            };
        case types.GAME_SET_GAME:
            return {
                ...state,
                game: action.game,
            };
        case types.GAME_SET_CURRENT_ROUND:
            return {
                ...state,
                currentRound: action.round,
            };
        case types.GAME_SET_CHAT_MESSAGE:
            return {
                ...state,
                chat: [...state.chat, action.message]
            };
        case types.GAME_SET_CHAT_ALL:
            return {
                ...state,
                chat: action.chat
            };
        case types.GAME_SET_SHOW_POLL:
            return {
                ...state,
                showPoll: action.showPoll
            };
        case types.GAME_SET_ADD_POLL_ARR:
            return {
                ...state,
                addPollArr: action.addPollArr
            };
        case types.GAME_SET_SHOW_ADD_POLL:
            return {
                ...state,
                showAddPoll: action.showAddPoll
            };
        default:
            return state;
    }
};