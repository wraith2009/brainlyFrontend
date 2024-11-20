import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { FilteredContentByTag } from "../../recoil/selectors/content.selector";
import Card from "../ui/Card";
import PopUpModal from "./popupmodal";
import apiCall from "../../api/auth.api";

interface TagPageProps {
  tag: string;
}

const TagPage: React.FC<TagPageProps> = ({ tag }) => {
  const filteredContent = useRecoilValue(FilteredContentByTag(tag));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const DeleteContentClicked = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsDeleteModalOpen(true);
  };

  const selectedCardTitle = filteredContent.find(
    (content) => content._id === selectedCardId
  )?.title;

  const handleDeleteConfirm = async () => {
    console.log("Delete card:", selectedCardId);
    if (selectedCardId) {
      console.log("Deleting content with id:", selectedCardId);
      try {
        const response = await apiCall("/delete-content", {
          contentId: selectedCardId,
        });

        console.log(response);

        if (response) {
          setIsDeleteModalOpen(false);
          setSelectedCardId(null);
        }
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{tag} Notes</h1>
      <div className="flex gap-6 flex-wrap">
        {filteredContent.map((content) => (
          <Card
            key={content._id}
            title={content.title}
            content={content.content}
            tags={content.tags || []}
            link={content.link}
            dateAdded={
              content.dateAdded
                ? new Date(content.dateAdded).toLocaleDateString()
                : ""
            }
            onDeleteClick={() =>
              content._id && DeleteContentClicked(content._id)
            }
            onUpdateClick={() => {
              // Add your update click handler logic here
            }}
          />
        ))}

        <PopUpModal
          isOpen={isDeleteModalOpen}
          title="Confirm Delete"
          content={`Are you sure you want to delete "${selectedCardTitle}"?`}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCardId(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default TagPage;
