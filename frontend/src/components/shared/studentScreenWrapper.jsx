import React from 'react';

const StudentScreenWrapper = ({ children }) => (
    <main className="min-h-screen p-10 bg-white space-y-2 md:space-y-4 shadow-md rounded-lg">
        {children}
    </main>
);

export default StudentScreenWrapper;
