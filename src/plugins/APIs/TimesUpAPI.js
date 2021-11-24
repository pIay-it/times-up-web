import Axios from "axios";
import { stringify } from "qs";
import Config from "../../../config";

export default {
    // eslint-disable-next-line max-lines-per-function
    install: app => {
        const axiosConfig = {
            baseURL: Config.API.timesUp.baseURL,
            timeout: 0,
            headers: { "Content-Type": "application/json" },
        };
        const { basicAuth: auth } = Config.API.timesUp;
        const axios = Axios.create(axiosConfig);

        app.config.globalProperties.$timesUpAPI = {};

        app.config.globalProperties.$timesUpAPI.getCards = queryString => axios.get(`/cards?${stringify(queryString)}`);

        app.config.globalProperties.$timesUpAPI.getCard = cardId => axios.get(`/cards/${cardId}`);

        app.config.globalProperties.$timesUpAPI.createCard = data => axios.post(`/cards`, data, { auth });

        app.config.globalProperties.$timesUpAPI.updateCard = (cardId, data) => axios.patch(`/cards/${cardId}`, data, { auth });

        app.config.globalProperties.$timesUpAPI.deleteCard = cardId => axios.delete(`/cards/${cardId}`, { auth });

        app.config.globalProperties.$timesUpAPI.getGames = queryString => axios.get(`/games?${stringify(queryString)}`, { auth });

        app.config.globalProperties.$timesUpAPI.getGame = gameId => axios.get(`/games/${gameId}`);

        app.config.globalProperties.$timesUpAPI.createGame = data => axios.post(`/games`, data);

        app.config.globalProperties.$timesUpAPI.updateGame = (gameId, data) => axios.patch(`/games/${gameId}`, data, { auth });

        app.config.globalProperties.$timesUpAPI.deleteGame = gameId => axios.delete(`/games/${gameId}`, { auth });

        app.config.globalProperties.$timesUpAPI.makeGamePlay = (gameId, play) => axios.post(`/games/${gameId}/play`, play);

        app.provide("timesUpAPI ", app.config.globalProperties.$timesUpAPI);
    },
};