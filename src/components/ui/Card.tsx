import React, { useState } from "react";
import { FileText, Trash2, Link as LinkIcon, Pencil } from "lucide-react";

interface CardProps {
  title: string;
  content: any;
  tags: string[];
  dateAdded: Date;
  link?: string;
  ShowButton?: boolean;
  setShowButton?: (isOpen: boolean) => void;
  onDeleteClick: () => void;
  onUpdateClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  tags,
  dateAdded,
  link,
  ShowButton,
  setShowButton,
  onDeleteClick,
  onUpdateClick,
}) => {
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const renderTitle = () => {
    if (!isTitleExpanded && title.length > 30) {
      return (
        <div className="flex items-center">
          <h3 className="font-semibold text-lg truncate">
            {title.slice(0, 30)}...
            <button
              onClick={() => setIsTitleExpanded(true)}
              className="text-blue-600 hover:text-blue-700 ml-1 font-medium text-sm"
            >
              More
            </button>
          </h3>
        </div>
      );
    }
    return (
      <div className="flex items-center">
        <h3 className="font-semibold text-lg">
          {title}
          {isTitleExpanded && (
            <button
              onClick={() => setIsTitleExpanded(false)}
              className="text-blue-600 hover:text-blue-700 ml-1 font-medium text-sm"
            >
              Less
            </button>
          )}
        </h3>
      </div>
    );
  };

  const renderContent = () => {
    if (typeof content === "string") {
      if (!isContentExpanded && content.length > 150) {
        return (
          <div>
            <p className="text-gray-600">
              {content.slice(0, 150)}...
              <button
                onClick={() => setIsContentExpanded(true)}
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
      const displayContent = isContentExpanded ? content : content.slice(0, 3);
      return (
        <div>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {displayContent.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {content.length > 3 && !isContentExpanded && (
            <button
              onClick={() => setIsContentExpanded(true)}
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
        isContentExpanded ? "min-h-[384px]" : "h-96"
      } flex flex-col`}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-grow">{renderTitle()}</div>
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
          {ShowButton && (
            <>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={onUpdateClick}
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={onDeleteClick}
              >
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-grow overflow-auto">{renderContent()}</div>

      {isContentExpanded && (
        <button
          onClick={() => setIsContentExpanded(false)}
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

      <div className="mt-4 text-sm text-gray-500">
        Added on {new Date(dateAdded).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Card;
