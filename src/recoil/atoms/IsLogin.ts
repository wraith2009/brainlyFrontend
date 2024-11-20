import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const IsLogin = atom({
  key: "IsLogin",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
