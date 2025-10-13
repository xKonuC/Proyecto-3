import React from 'react';

const ScreenWrapper = ({ children }) => (
    <main className="min-h-screen mt-14 p-10 bg-white space-y-2 md:space-y-4 shadow-md rounded-lg">
        {children}
    </main>
);

export default ScreenWrapper;
