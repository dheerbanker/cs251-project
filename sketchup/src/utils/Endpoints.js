const SERVER_URL = 'http://127.0.0.1:8000';
const game_state_ep = '/';
const create_lobby_ep = '/lobby/';
const choose_username_ep = '/login/';
const get_game_state_ep = '/getgamestate/';
const refresh_game_state_ep = '/loadgame/'

export default class API {
    static get GAME_STATE(){
        return SERVER_URL + game_state_ep;
    }
    static get CREATE_LOBBY(){
        return SERVER_URL + create_lobby_ep;
    }
    static get CHOOSE_USERNAME(){
        return SERVER_URL + choose_username_ep;
    }
    static get JOIN_LOBBY(){
        return SERVER_URL + create_lobby_ep;
    }

    static get GAME_STATE(){
        return SERVER_URL + get_game_state_ep;
    }
    static get REFRESH_GAME_STATE(){
        return SERVER_URL + refresh_game_state_ep;
    }
}