import { ContentSchemaType } from "./../../config/validators/content.validator";
import { atom } from "recoil";
export const ContentState = atom<ContentSchemaType[]>({
  key: "ContentState",
  default: [],
});
