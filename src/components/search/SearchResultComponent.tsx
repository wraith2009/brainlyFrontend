import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { useSearchParams, Link } from "react-router-dom";
import { ContentState } from "../../recoil/atoms/content.atom";
import Card from "../ui/Card";
import { ArrowLeft } from "lucide-react";

const SearchResultComponent = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const contentData = useRecoilValue(ContentState);
  const [ShowButton, setShowButton] = useState<boolean>(false);

  const searchResult = useMemo(() => {
    if (!query) return [];
    const lowercaseQuery = query.toLowerCase();
    return contentData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.content?.toLowerCase().includes(lowercaseQuery)
    );
  }, [query, contentData]);

  if (searchResult.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700">
            No results found for "{query}"
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or creating a new content item
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Link
            to="/Home"
            className="mr-4 text-gray-700 hover:text-blue-600 transition-colors flex items-center"
          >
            <ArrowLeft size={24} className="mr-2" />
          </Link>
          <h2 className="text-xl text-[#676767] font-bold ">
            Search Results for <span className="text-blue-500">"{query}"</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResult.map((card) => (
            <Card
              key={card._id}
              title={card.title}
              content={card.content}
              tags={card.tags || []}
              link={card.link}
              dateAdded={card.updatedAt ? new Date(card.updatedAt) : new Date()}
              ShowButton={ShowButton}
              setShowButton={setShowButton}
              onDeleteClick={() => {}}
              onUpdateClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultComponent;
