import { atom } from "recoil";

export const UserIdState = atom<string | null>({
  key: "UserIdState",
  default: null,
});
