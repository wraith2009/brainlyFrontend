import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import apiCall from "../../api/auth.api";

interface Data {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: Date;
  link?: string;
}

const SharedPageComponent: React.FC = () => {
  const resetToken = window.location.href.split("/")[4];
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiCall("/content", {
        token: resetToken,
      });
      setData(response.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:");
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resetToken]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="text-[#676767] py-6 text-center">
        <h1 className="text-4xl font-bold mb-2">100xBrainly 🧠</h1>
        <p className="text-sm italic">Collective Wisdom, Shared Responsibly</p>
      </div>

      <div className="p-4 text-center text-red-600 font-semibold">
        <p>⚠️ Respect the Trust: This is Someone's Personal Brain Space ⚠️</p>
        <p className="text-sm mt-2">
          Unauthorized sharing, copying, or misuse is strictly prohibited
        </p>
      </div>

      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-48 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((card: Data) => (
            <Card
              key={card._id}
              title={card.title}
              content={card.content}
              tags={card.tags}
              dateAdded={card.updatedAt}
              link={card.link}
              onDeleteClick={() => {}}
              onUpdateClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedPageComponent;
