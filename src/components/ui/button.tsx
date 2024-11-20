import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  bgColor = "bg-indigo-600",
  textColor = "text-white",
}) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 ${bgColor} ${textColor} rounded-md hover:brightness-110 transition duration-200`}
      onClick={onClick}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
