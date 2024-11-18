import React from "react";
import { FileText, Share2, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  content: any;
  tags: string[];
  dateAdded: string;
}

const Card: React.FC<CardProps> = ({ title, content, tags, dateAdded }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="flex gap-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Trash2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
    {content}
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
// const Card: React.FC<CardProps> = ({ title, content, tags, dateAdded }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-80 relative">
//       <div className="flex justify-between items-start">
//         <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//         <div className="flex space-x-2">
//           <button>
//             <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//           </button>
//           <button>
//             <Share className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//           </button>
//           <button>
//             <File className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//           </button>
//         </div>
//       </div>
//       <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
//         {content}
//       </p>
//       <div className="mt-3 flex flex-wrap gap-2">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>
//       <p className="mt-4 text-xs text-gray-500">Added on {dateAdded}</p>
//     </div>
//   );
// };

export default Card;
