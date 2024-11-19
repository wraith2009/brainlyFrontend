import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserIdState = atom<string | null>({
  key: "UserIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
