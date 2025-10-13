import React from 'react';
import '../../style/tailwind.css'

const defaultIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 opacity-"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
    </svg>
);

const InputField = ({ label, id, type, icon = defaultIcon }) => {
    return (
        <div class="outline relative border-2 focus-within:border-blue-500">
            <input type="text" name="username" placeholder=" " class="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
            <label for="username" class="absolute top-0 text-lg bg-white p-4 -z-1 duration-300 origin-0">Username</label>
        </div>

    );
};

export default InputField;
