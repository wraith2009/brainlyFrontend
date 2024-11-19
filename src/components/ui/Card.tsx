import React, { useState } from "react";
import { FileText, Share2, Trash2, Link as LinkIcon } from "lucide-react";

interface CardProps {
  title: string;
  content: any;
  tags: string[];
  dateAdded: string;
  link?: string;
  onDeleteClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  tags,
  dateAdded,
  link,
  onDeleteClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderContent = () => {
    if (typeof content === "string") {
      if (!isExpanded && content.length > 150) {
        return (
          <div>
            <p className="text-gray-600">
              {content.slice(0, 150)}...
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
              >
                See more
              </button>
            </p>
          </div>
        );
      }
      return <p className="text-gray-600">{content}</p>;
    }

    if (Array.isArray(content)) {
      const displayContent = isExpanded ? content : content.slice(0, 3);
      return (
        <div>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {displayContent.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {content.length > 3 && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 hover:text-blue-700 mt-2 font-medium"
            >
              See more
            </button>
          )}
        </div>
      );
    }

    return content;
  };

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm w-80 ${
        isExpanded ? "min-h-[384px]" : "h-96"
      } flex flex-col`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-lg truncate max-w-[200px]">
            {title}
          </h3>
        </div>
        <div className="flex gap-2">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <LinkIcon className="w-4 h-4 text-gray-600" />
            </a>
          )}
          <button className="p-1 hover:bg-gray-100 rounded">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className="p-1 hover:bg-gray-100 rounded"
            onClick={onDeleteClick}
          >
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto">{renderContent()}</div>

      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="text-blue-600 hover:text-blue-700 mt-2 font-medium"
        >
          See less
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-blue-600 text-sm">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">Added on {dateAdded}</div>
    </div>
  );
};

export default Card;
