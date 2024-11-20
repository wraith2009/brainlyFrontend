import { selectorFamily } from "recoil";
import { ContentState } from "../atoms/content.atom";

export const FilteredContentByTag = selectorFamily({
  key: "FilteredContentByTag",
  get:
    (tag: string) =>
    ({ get }) => {
      const allContent = get(ContentState);
      const filteredContent = allContent.filter((content) =>
        content?.type.includes(tag)
      );
      return filteredContent;
    },
});
