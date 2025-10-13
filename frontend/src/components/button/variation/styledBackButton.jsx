import React from 'react';
import PropTypes from 'prop-types';

// Objeto que mapea colores a clases correspondientes de Tailwind CSS
const colorClasses = {
  indigo: 'text-indigo-600',
  red: 'text-red-500',
  yellow: 'text-yellow-400',
  orange: 'text-orange-500',
  default: 'text-gray-600',
};

const colorClassesSpan = {
  indigo: 'bg-indigo-600',
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  orange: 'bg-orange-500',
  default: 'bg-gray-600',
}

const StyledBackButton = ({
  onClick,
  color = 'orange',
  width = '',
  heightSM = '10',
  height = '9',
  textSM = 'sm',
  text = 'base',
  type = 'button',
  children,
}) => {
  // Función que maneja el evento de clic
  const handleClick = (event) => {
    onClick && onClick(event);
  };
  // Clases dinámicas basadas en las propiedades recibidas
  const buttonClassName = `relative inline-block group w-${width} h-${height} sm:h-${heightSM} 
  items-center justify-center gap-1 sm:gap-2 rounded-xl border transition duration-150 
    ${colorClasses[color]} text-${text} sm:text-${textSM} font-medium 
    bg-transparent focus:outline-none focus:ring`;

  const buttonClassNameSpan = `absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5
  ${colorClassesSpan[color]}  group-hover:translate-y-0 group-hover:translate-x-0`

  // Renderiza el botón con las clases yx el manejar de clic
  return (
    <button type={type} className={buttonClassName} onClick={handleClick}>
      <span
        className={buttonClassNameSpan}
      ></span>
      <span className="relative block px-8 py-2 font-bold text-lg bg-transparent border border-current">
        {children}
      </span>
    </button>
  );
};

// Propiedades esperadas y sus tipos
StyledBackButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['indigo', 'red', 'yellow', 'orange', 'default']),
  paddingX: PropTypes.string,
  paddingY: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default StyledBackButton;
