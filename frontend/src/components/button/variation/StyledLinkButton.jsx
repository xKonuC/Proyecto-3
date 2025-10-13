import React from 'react';
import { Link } from 'react-router-dom';
import StyledButton from '../styledButton';
import { FaRegEye } from 'react-icons/fa';

const StyledLinkButton = ({ url, children }) => {
  return (
    <Link to={`${import.meta.env.VITE_VIEW_FILE}/${url}`} target="_blank" rel="noopener noreferrer">
      <StyledButton>
        <FaRegEye size={20} />
        {children}
      </StyledButton>
    </Link>
  );
};

export default StyledLinkButton;
