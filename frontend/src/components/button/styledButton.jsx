import React from "react";

// Objeto que mapea colores a clases correspondientes de Tailwind CSS
const colorClasses = {
  indigo: "border-indigo-600 bg-indigo-600 hover:text-indigo-600 hover:ring-indigo-600",
  red: "border-red-500 bg-red-500 hover:text-red-500 hover:ring-red-500",
  yellow: "border-yellow-500 bg-yellow-500 hover:text-yellow-500 hover:ring-yellow-500",
  green: "border-green-500 bg-green-500 hover:text-green-500 hover:ring-green-500",
  orange: "border-orange-main bg-orange-main hover:text-orange-main hover:ring-orange-main",
  default: "border-gray-600 bg-gray-600 hover:text-gray-600 hover:ring-gray-600",
};

const StyledButton = ({
  onClick,
  color = "orange",
  paddingX = "4",
  paddingY = "2",
  width = "full",
  heightSM = "10",
  height = "9",
  textSM = "sm",
  text = "base",
  type = "button",
  children,
}) => {
  // Función que maneja el evento de clic
  const handleClick = (event) => {
    onClick && onClick(event);
  };

  // Clases dinámicas basadas en las propiedades recibidas
  const buttonClassName = `w-${width} h-${height} sm:h-${heightSM}
  text-white items-center justify-center gap-2 
  rounded-xl border transition duration-200 inline-flex
    ${colorClasses[color]} 
    px-${paddingX} py-0 sm:py-${paddingY} text-${text} sm:text-${textSM} 
    font-medium hover:bg-transparent hover:ring-1 hover:font-semibold focus:outline-none`;

  // Renderiza el botón con las clases yx el manejar de clic
  return (
    <button type={type} className={buttonClassName} onClick={handleClick}>
      {children}
    </button>
  );
};

export default StyledButton;
