import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Share2, Plus } from "lucide-react";
import CreateContentModal from "../ui/Contentmodal";
import { useRecoilValue } from "recoil";
import { UserIdState } from "../../recoil/atoms/auth.atom";
import apiCall from "../../api/auth.api";
import PopUpModal from "../ui/popupmodal";
import { ContentState } from "../../recoil/atoms/content.atom";
import { useRecoilState } from "recoil";

export interface ContentSchema {
  _id: string;
  title: string;
  content?: string;
  tags: string[];
  dateAdded: string;
  link?: string;
  type: string;
}

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const [globalContent, setGlobalContent] = useRecoilState(ContentState);
  const UserId = useRecoilValue(UserIdState);

  const fetchUserContent = async () => {
    try {
      const response = await apiCall("/get-content", { userId: UserId });
      setGlobalContent(response.content);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("using recoil state", globalContent);
  useEffect(() => {
    fetchUserContent();
  }, []);

  const handleSubmitContent = (newContent: any) => {
    setGlobalContent((prev) => [
      {
        ...newContent,
        dateAdded: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);
  };

  const handleDeleteClick = (cardId: string) => {
    setSelectedCardId(cardId);
    setDeleteModalOpen(true);
  };

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
          setGlobalContent((prevContents) =>
            prevContents.filter((content) => content._id !== selectedCardId)
          );

          setDeleteModalOpen(false);
          setSelectedCardId(null);
        }
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    }
  };

  const selectedCardTitle = globalContent.find(
    (content) => content._id === selectedCardId
  )?.title;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Brain
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Add Content
          </button>
        </div>
      </header>

      <CreateContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitContent}
      />

      <div className="flex gap-6 flex-wrap">
        {globalContent.map((card) => (
          <Card
            key={card._id}
            title={card.title}
            content={card.content}
            tags={card.tags || []}
            link={card.link}
            dateAdded={
              card.dateAdded
                ? new Date(card.dateAdded).toLocaleDateString()
                : ""
            }
            onDeleteClick={() => card._id && handleDeleteClick(card._id)}
          />
        ))}
      </div>

      <PopUpModal
        isOpen={isDeleteModalOpen}
        title="Confirm Delete"
        content={`Are you sure you want to delete "${selectedCardTitle}"?`}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCardId(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default App;
