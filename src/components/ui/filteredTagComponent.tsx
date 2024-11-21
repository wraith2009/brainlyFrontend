import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { FilteredContentByTag } from "../../recoil/selectors/content.selector";
import Card from "../ui/Card";
import PopUpModal from "./popupmodal";
import apiCall from "../../api/auth.api";
import { useRecoilState } from "recoil";
import { ContentState } from "../../recoil/atoms/content.atom";
import CreateContentModal from "./Contentmodal";
import { useNavigate } from "react-router-dom";
import { IsLogin } from "../../recoil/atoms/IsLogin";

interface TagPageProps {
  tag: string;
}

interface ContentSchema {
  _id: string;
  title: string;
  content?: string;
  tags: string[];
  dateAdded: Date;
  link?: string;
  type: string;
}
const TagPage: React.FC<TagPageProps> = ({ tag }) => {
  const filteredContent = useRecoilValue(FilteredContentByTag(tag));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedCard, setEditedCard] = useState<ContentSchema | null>(null);
  const [, setGlobalContent] = useRecoilState(ContentState);
  const navigate = useNavigate();

  if (!IsLogin) {
    navigate("/");
  }

  const DeleteContentClicked = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsDeleteModalOpen(true);
  };

  const selectedCardTitle = filteredContent.find(
    (content) => content._id === selectedCardId
  )?.title;

  const handleDeleteConfirm = async () => {
    if (selectedCardId) {
      try {
        const response = await apiCall("/delete-content", {
          contentId: selectedCardId,
        });

        if (response) {
          setGlobalContent((prevContents) =>
            prevContents.filter((content) => content._id !== selectedCardId)
          );

          setIsDeleteModalOpen(false);
          setSelectedCardId(null);
        }
      } catch (error) {
        console.error("Error deleting content:");
      }
    }
  };

  const handleUpdateClick = (card: ContentSchema) => {
    setEditedCard(card);
    setIsEditModalOpen(true);
  };

  const handleUpdateContentSubmit = async (
    updatedContent: Partial<ContentSchema>
  ) => {
    if (editedCard?._id) {
      try {
        const response = await apiCall("/update-content", {
          contentId: editedCard._id,
          updates: updatedContent,
        });

        if (response) {
          setGlobalContent((prevContent) =>
            prevContent.map((content) =>
              content._id === editedCard._id
                ? {
                    ...content,
                    ...updatedContent,
                    dateAdded: new Date(),
                  }
                : content
            )
          );
        }
        setIsEditModalOpen(false);
        setEditedCard(null);
      } catch (error) {
        console.error("Error updating content:");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{tag} Notes</h1>
      <div className="flex gap-6 flex-wrap">
        {[...filteredContent]
          .sort((a, b) => {
            const dateA = a.updatedAt
              ? new Date(a.updatedAt).getTime()
              : new Date().getTime();
            const dateB = b.updatedAt
              ? new Date(b.updatedAt).getTime()
              : new Date().getTime();
            return dateB - dateA;
          })
          .map((content) => (
            <Card
              key={content._id}
              title={content.title}
              content={content.content}
              tags={content.tags || []}
              link={content.link}
              dateAdded={
                content.updatedAt ? new Date(content.updatedAt) : new Date()
              }
              onDeleteClick={() =>
                content._id && DeleteContentClicked(content._id)
              }
              onUpdateClick={() => {
                content._id && handleUpdateClick(content as ContentSchema);
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
          ButtonText="Confirm Delete"
        />

        {isEditModalOpen && editedCard && (
          <CreateContentModal
            isOpen={true}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditedCard(null);
            }}
            onSubmit={handleUpdateContentSubmit}
            initialData={{
              _id: editedCard._id || "",
              title: editedCard.title,
              content: editedCard.content || "",
              tags: editedCard.tags || [],
              link: editedCard.link || "",
              type: editedCard.type as "Tweet" | "Video" | "Link" | "Document",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TagPage;
