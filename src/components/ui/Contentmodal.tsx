import React, { useState } from "react";
import { Plus, X, Tag } from "lucide-react";

const CONTENT_TYPES = ["Video", "tweet", "Link", "Document"] as const;

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: {
    title: string;
    type: (typeof CONTENT_TYPES)[number];
    link?: string;
    tags: string[];
    content?: string;
  }) => void;
}

const CreateContentModal: React.FC<CreateContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
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

  const handleSubmitContent = () => {
    if (!newContent.title) return;

    onSubmit(newContent);

    setNewContent({
      title: "",
      type: CONTENT_TYPES[0],
      link: "",
      tags: [],
      content: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center text-center mb-4">
          <h2 className="text-xl text-[#676767]  font-semibold">
            Create New Content
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
              className="w-full border p-2 rounded-3xl"
              placeholder="Enter content title"
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
              className="w-full border p-2 rounded-3xl"
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
              className="w-full border p-2 rounded-3xl"
              placeholder="Enter URL"
            />
          </div>

          <div>
            <label className="block text-[#676767] mb-2">Tags</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-grow border p-2 rounded-3xl"
                placeholder="Add a tag"
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
            </div>
            <div className="flex flex-wrap  gap-2">
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
              className="border p-2 rounded-3xl hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitContent}
              disabled={!newContent.title}
              className="bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 disabled:opacity-50"
            >
              Create Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;
