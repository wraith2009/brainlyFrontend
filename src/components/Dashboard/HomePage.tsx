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
import CardGridShimmer from "../shimmer/shimmer";

export interface ContentSchema {
  _id: string;
  title: string;
  content?: string;
  tags: string[];
  updatedAt: Date;
  link?: string;
  type: string;
}

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [sharableLink, setSharableLink] = useState<string | null>(null);
  const [globalContent, setGlobalContent] = useRecoilState(ContentState);
  const UserId = useRecoilValue(UserIdState);
  const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<ContentSchema | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ShowButton, setShowButton] = useState<boolean>(true);

  const fetchUserContent = async () => {
    try {
      const response = await apiCall("/get-content", { userId: UserId });
      setGlobalContent(response.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserContent();
  }, []);

  if (isLoading) {
    return <CardGridShimmer />;
  }

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

  const handleClickOnShareModal = () => {
    setIsShareModalOpen(true);
  };

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

          setDeleteModalOpen(false);
          setSelectedCardId(null);
        }
      } catch (error) {
        console.error("Error deleting content:");
      }
    }
  };

  const handleShareContent = async () => {
    try {
      const response = await apiCall("/create-link", {
        userId: UserId,
      });

      if (response.token) {
        const generatedLink = `https://brainly-frontend-sable.vercel.app/sharable-link/${response.token}`;
        setSharableLink(generatedLink);
      }
    } catch (error) {
      console.error("error generating link");
    }
  };

  const handleCopyLink = () => {
    if (sharableLink) {
      navigator.clipboard
        .writeText(sharableLink)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy link: ", error);
        });
    }
  };

  const handleUpdateClick = (card: ContentSchema) => {
    setUpdateData(card);
    setIsModalUpdate(true);
  };

  const handleUpdateContentSubmit = async (
    updatedContent: Partial<ContentSchema>
  ) => {
    if (updateData?._id) {
      try {
        const response = await apiCall("/update-content", {
          contentId: updateData._id,
          updates: updatedContent,
        });

        if (response) {
          setGlobalContent((prevContent) =>
            prevContent.map((content) =>
              content._id === updateData._id
                ? {
                    ...content,
                    ...updatedContent,
                    dateAdded: new Date(),
                  }
                : content
            )
          );
        }
        setIsModalUpdate(false);
        setUpdateData(null);
      } catch (error) {
        console.error("Error updating content:");
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
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
            onClick={handleClickOnShareModal}
          >
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
        {[...globalContent]
          .sort((a, b) => {
            const dateA = a.updatedAt
              ? new Date(a.updatedAt).getTime()
              : new Date().getTime();
            const dateB = b.updatedAt
              ? new Date(b.updatedAt).getTime()
              : new Date().getTime();
            return dateB - dateA;
          })
          .map((card) => (
            <Card
              key={card._id}
              title={card.title}
              content={card.content}
              tags={card.tags || []}
              link={card.link}
              dateAdded={card.updatedAt ? new Date(card.updatedAt) : new Date()}
              ShowButton={ShowButton}
              setShowButton={setShowButton}
              onDeleteClick={() => card._id && handleDeleteClick(card._id)}
              onUpdateClick={() =>
                card._id && handleUpdateClick(card as ContentSchema)
              }
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
        ButtonText="Confirm Delete"
      />

      {isShareModalOpen && (
        <PopUpModal
          isOpen={isShareModalOpen}
          title="Share Content"
          content="Are you sure you want to share Your Second Brain?"
          onClose={() => setIsShareModalOpen(false)}
          onConfirm={handleShareContent}
          ButtonText="Yes, Share !"
        />
      )}

      {sharableLink && (
        <PopUpModal
          isOpen={!!sharableLink}
          title="Sharable Link Ready"
          content="Your sharable link is now available!"
          onClose={() => setSharableLink(null)}
          onConfirm={handleCopyLink}
          ButtonText="Copy Link"
        />
      )}

      {isModalUpdate && updateData && (
        <CreateContentModal
          isOpen={true}
          onClose={() => {
            setIsModalUpdate(false);
            setUpdateData(null);
          }}
          onSubmit={handleUpdateContentSubmit}
          initialData={{
            _id: updateData._id || "",
            title: updateData.title,
            content: updateData.content || "",
            tags: updateData.tags || [],
            link: updateData.link,
            type: updateData.type as "Tweet" | "Video" | "Link" | "Document",
          }}
        />
      )}
    </div>
  );
};

export default App;
