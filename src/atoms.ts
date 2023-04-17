import { atom } from "recoil";

export const previewState = atom({
  key: "previewState",
  default: false,
});

export const hoverState = atom({
  key: "hoverState",
  default: { hover: false, hoverId: "", hoverSliderIndex: 0, position: "" },
});

export const pathState = atom({
  key: "pathState",
  default: "",
});

export const scorllState = atom({
  key: "scrollState",
  default: 0,
});

export const myListMoviesState = atom<number[]>({
  key: "myListMoviesState",
  default: [],
});
