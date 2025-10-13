import React, { useState } from 'react';

const Navbar = ({ primaryButtons, secondaryButtons = [] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-950 border-b border-gray-600 fixed w-full z-20 top-0 start-0 pl-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-end md:justify-between mx-auto pl-6 pr-4 py-3">
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button onClick={toggleMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-orange-main hover:text-white focus:ring-orange-main" aria-controls="navbar-sticky" aria-expanded={isMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7 fill-current dark:text-gray-100">
                            <rect width="352" height="32" x="80" y="96"></rect>
                            <rect width="352" height="32" x="80" y="240"></rect>
                            <rect width="352" height="32" x="80" y="384"></rect>
                        </svg>
                    </button>
                </div>
                <div className={`${isMenuOpen ? 'flex w-full' : 'hidden'} md:flex md:w-full md:order-1`} id="navbar-sticky">
                    <div className="font-medium flex-col md:flex-row md:flex justify-start md:justify-between w-full p-4 md:p-0 mt-4 border rounded-lg md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
                        <div className="space-x-0 md:flex md:space-x-2">
                            {primaryButtons.map(({ id, label, onClick, svg }) => (
                                <button
                                    key={id}
                                    type="button"
                                    className="flex items-center justify-start w-full sm:w-auto gap-2 text-white hover:bg-orange-main sm:hover:bg-transparent sm:hover:text-orange-main sm:hover:font-bold focus:outline-none font-medium rounded-lg text-sm px-2 py-1"
                                    onClick={onClick}
                                >
                                    {svg}
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div className="space-x-0 md:flex md:space-x-2">
                            {secondaryButtons.map(({ id, label, onClick, svg }) => (
                                <button
                                    key={id}
                                    type="button"
                                    className="flex items-center justify-start w-full sm:w-auto gap-2 text-white hover:bg-orange-main sm:hover:bg-transparent sm:hover:text-orange-main sm:hover:font-bold focus:outline-none font-medium rounded-lg text-sm px-2 py-1"
                                    onClick={onClick}
                                >
                                    {svg}
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
