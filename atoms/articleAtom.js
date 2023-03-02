import { atom } from "recoil";


export const articlesState = atom({
    key: "articleStateKey",
    default: []
});

export const selectedArticleState = atom({
    key: "selectedArticleStateKey",
    default: []
});


