import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage/HomePage";
import AboutPage from "@/components/AboutPage/AboutPage";
import GameLobbyPage from "@/components/GameLobbyPage/GameLobbyPage";
import GamePage from "@/components/GamePage/GamePage";
import CardsManagerPage from "@/components/CardsManagerPage/CardsManagerPage";
import NotFoundPage from "@/components/NotFoundPage/NotFoundPage";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    }, {
        path: "/about",
        name: "About",
        component: AboutPage,
    }, {
        path: "/game-lobby",
        name: "GameLobby",
        component: GameLobbyPage,
    }, {
        path: "/game/:id",
        name: "Game",
        component: GamePage,
    }, {
        path: "/cards-manager",
        name: "CardsManager",
        component: CardsManagerPage,
    }, {
        path: "/404",
        name: "NotFound",
        component: NotFoundPage,
    }, {
        path: "/:catchAll(.*)",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(""),
    routes,
});

export default router;