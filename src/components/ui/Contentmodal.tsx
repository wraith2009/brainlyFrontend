import React, { useState, useEffect } from "react";
import { X, Tag } from "lucide-react";
import { useRecoilValue } from "recoil";
import { UserIdState } from "../../recoil/atoms/auth.atom";
import { ContentSchema } from "../../config/validators/content.validator";
import apiCall from "../../api/auth.api";

const CONTENT_TYPES = ["Video", "Tweet", "Link", "Document"] as const;

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: {
    title: string;
    type: (typeof CONTENT_TYPES)[number];
    link?: string;
    tags: string[];
    content?: string;
  }) => void;
  initialData?: {
    _id: string;
    title: string;
    type: (typeof CONTENT_TYPES)[number];
    link?: string;
    tags: string[];
    content?: string;
  };
}

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [newContent, setNewContent] = useState<{
    title: string;
    type: (typeof CONTENT_TYPES)[number];
    link: string;
    tags: string[];
    content: string;
  }>({
    title: "",
    type: CONTENT_TYPES[0],
    link: "",
    tags: [] as string[],
    content: "",
  });

  const [currentTag, setCurrentTag] = useState("");
  const userId = useRecoilValue(UserIdState);
  const [suggestions, setSuggestions] = useState<string[]>(["Tag"]);
  const isUpdateMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setNewContent({
        title: initialData.title || "",
        type: initialData.type || CONTENT_TYPES[0],
        link: initialData.link || "",
        tags: initialData.tags || [],
        content: initialData.content || "",
      });
    } else {
      setNewContent({
        title: "",
        type: CONTENT_TYPES[0],
        link: "",
        tags: [],
        content: "",
      });
    }
  }, [initialData, isOpen]);

  const handleAddTag = () => {
    if (currentTag && !newContent.tags.includes(currentTag)) {
      setNewContent((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewContent((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (!newContent.title) return;

    const contentData = {
      title: newContent.title,
      type: newContent.type,
      tags: newContent.tags,
      userId,
      content: newContent.content || undefined,
      link: newContent.link || undefined,
    };

    const isValidContent = ContentSchema.safeParse(contentData);

    if (!isValidContent.success) {
      console.error(isValidContent.error);
      return;
    }

    try {
      if (isUpdateMode) {
        const response = await apiCall("/update-content", {
          ...contentData,
          contentId: initialData._id,
        });

        if (response) {
          onSubmit(newContent);
          onClose();
        }
      } else {
        const response = await apiCall("/create-content", contentData);

        if (response) {
          onSubmit(newContent);
          onClose();
        }
      }
    } catch (error) {
      console.error("Error creating content:");
    }
  };

  const fetchTags = async () => {
    const response = await apiCall("/getTags", {}, "GET");

    if (response) {
      setSuggestions(response.data.map((obj: { title: string }) => obj.title));
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center text-center mb-4">
          <h2 className="text-xl text-[#676767] font-semibold">
            {isUpdateMode ? "Update Content" : "Create New Content"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[#676767] mb-2">Title</label>
            <input
              type="text"
              value={newContent.title}
              onChange={(e) =>
                setNewContent((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full border p-2 rounded-lg"
              placeholder="15 Character limit on Title"
            />
          </div>

          <div>
            <label className="block text-[#676767] mb-2">Type</label>
            <select
              value={newContent.type}
              onChange={(e) =>
                setNewContent((prev) => ({
                  ...prev,
                  type: e.target.value as (typeof CONTENT_TYPES)[number],
                }))
              }
              className="w-full border p-2 rounded-lg"
            >
              {CONTENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#676767] mb-2">Link (Optional)</label>
            <input
              type="text"
              value={newContent.link}
              onChange={(e) =>
                setNewContent((prev) => ({
                  ...prev,
                  link: e.target.value,
                }))
              }
              className="w-full border p-2 rounded-lg"
              placeholder="Enter URL"
            />
          </div>

          <div>
            <label className="block text-[#676767] mb-2">Tags</label>
            <div className="relative flex space-x-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-grow border p-2 rounded-lg"
                placeholder="Add a tag"
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              {currentTag && (
                <ul className="absolute mt-10 mr-4 z-10 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-auto">
                  {suggestions
                    ?.filter((tag) =>
                      tag.toLowerCase().startsWith(currentTag.toLowerCase())
                    )
                    .map((tag, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setNewContent((prev) => ({
                            ...prev,
                            tags: [...prev.tags, tag],
                          }));
                          setCurrentTag("");
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {tag}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {newContent.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <Tag size={12} className="mr-2" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#676767] mb-2">
              Content (Optional)
            </label>
            <textarea
              value={newContent.content}
              onChange={(e) =>
                setNewContent((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              className="w-full border p-2 rounded"
              rows={4}
              placeholder="Enter content details"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="border p-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newContent.title}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isUpdateMode ? "Update Content" : "Create Content"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
