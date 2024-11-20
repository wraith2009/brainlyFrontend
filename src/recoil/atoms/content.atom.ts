import { ContentSchemaType } from "./../../config/validators/content.validator";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const ContentState = atom<ContentSchemaType[]>({
  key: "ContentState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
