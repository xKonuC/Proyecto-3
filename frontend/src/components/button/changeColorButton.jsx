import React, { useState } from "react";

const colorClasses = {
    indigo: "indigo-600",
    red: "red-500",
    yellow: "yellow-500",
    green: "green-500",
    orange: "orange-main",
    default: "gray-600",
  };

const ChangeColorButton = ({
    onClick,
    initialColor = "green",
    finalColor = "red",
    paddingX = "4",
    paddingY = "2",
    width = "full",
    heightSM = "10",
    height = "8",
    textSM = "sm",
    text = "base",
    type = "button",
    children,
}) => {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    const handleClick = (event) => {
        toggleActive();
        onClick && onClick(event);
    };

    const initColorClass = `bg-${initialColor}-500 hover:bg-gradient-to-r from-${initialColor}-500 to-${finalColor}-500`;
    const finalColorClass = `bg-${finalColor}-500 hover:bg-gradient-to-l from-${finalColor}-500 to-${initialColor}-500`;

    const buttonClassName = `w-${width} h-${height} sm:h-${heightSM} 
        font-medium text-white inline-flex items-center justify-center gap-1 sm:gap-2 
        rounded-xl border transition duration-150 hover:border-none
        px-${paddingX} py-0 sm:py-${paddingY} text-${text} sm:text-${textSM}
        ${isActive ? 'border-red-500 bg-red-500 hover:bg-gradient-to-r from-red-500 to-green-500' : 'border-green-500 bg-green-500 hover:bg-gradient-to-r from-green-500 to-red-500'}`;

    return (
        <button type={type} className={buttonClassName} onClick={handleClick}>
            {children}
        </button>
    );
};

export default ChangeColorButton;
