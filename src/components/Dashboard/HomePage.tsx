import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Share2, Plus } from "lucide-react";
import CreateContentModal from "../ui/Contentmodal";
import { useRecoilValue } from "recoil";
import { UserIdState } from "../../recoil/atoms/auth.atom";
import apiCall from "../../api/auth.api";

interface ContentSchema {
  id: string;
  title: string;
  content?: string;
  tags: string[];
  dateAdded: string;
  link?: string;
  type: string;
}
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState<ContentSchema[]>([
    {
      id: "1",
      title: "Project Ideas",
      content:
        "Future Projects\n- Build a personal knowledge base\n- Create a habit tracker\n- Design a minimalist todo app",
      tags: ["productivity", "ideas"],
      dateAdded: "10/03/2024",
      link: "#",
      type: "note",
    },
    {
      id: "2",
      title: "How to Build a Second Brain",
      content: "",
      tags: ["productivity", "learning"],
      dateAdded: "09/03/2024",
      link: "#",
      type: "note",
    },
    {
      id: "3",
      title: "Productivity Tip",
      content:
        "The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.",
      tags: ["productivity", "learning"],
      dateAdded: "08/03/2024",
      link: "#",
      type: "note",
    },
  ]);

  const UserId = useRecoilValue(UserIdState);

  const fetchUserContent = async () => {
    try {
      const response = await apiCall("/get-content", { userId: UserId });
      console.log("response on homepage", response);
      setContents(response.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserContent();
  }, []);
  const handleSubmitContent = (newContent: any) => {
    setContents((prev) => [
      {
        ...newContent,
        dateAdded: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
        {contents.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            content={card.content}
            tags={card.tags}
            dateAdded={card.dateAdded}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
