import cardCategories from "../constants/cardCategories.json";

export function getCardCategories() {
    return JSON.parse(JSON.stringify(cardCategories));
}