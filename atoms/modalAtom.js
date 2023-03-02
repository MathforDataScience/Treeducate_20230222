import { atom } from "recoil";

export const modalState = atom({
    key: "modalStateKey",
    default: false,
});

export const editModalState = atom({
    key: "editModalStateKey",
    default: false,
});


