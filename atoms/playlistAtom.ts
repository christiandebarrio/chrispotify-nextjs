import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1EIVtoYONzahWN",
});

export const playlistState = atom<
  undefined | SpotifyApi.PlaylistObjectSimplified
>({
  key: "playlistState",
  default: undefined,
});
