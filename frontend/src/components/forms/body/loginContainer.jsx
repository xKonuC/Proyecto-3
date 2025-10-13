import React from 'react';
import StyledButton from '../../button/styledButton'
import SocialButton from '../../crud/handleAuth/socialButton/socialButton';

const LoginContainer = ({
  isAdminAccess,
  showAlert,
  handleSubmit,
  children,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex-col items-center justify-center"
    >
      <SocialButton isAdminAccess={isAdminAccess} showAlert={showAlert} />
      <div className="gap-2">
        <div className="flex w-full items-center">
          <hr className="h-0.5 w-full rounded bg-gray-500" />
          <span className="mx-2 mb-2 text-xl font-semibold text-gray-400">o</span>
          <hr className="h-0.5 w-full rounded bg-gray-500" />
        </div>
      </div>
      <div className="space-y-2">{children}</div>

        <StyledButton
          onClick={handleSubmit}
          type="submit"
          heightSM='11'
          height='10'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Iniciar Sesión
        </StyledButton>
    </form>
  );
};

export default LoginContainer;
