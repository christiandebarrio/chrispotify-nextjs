import { atom } from "recoil";

export const currentTrackIdState = atom<undefined | string>({
  key: "currentTrackIdState",
  default: undefined,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
