import React from 'react';

const Drawer = ({ message, isOpen, toggleDrawer, svg, children }) => {

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-0 cursor-pointer transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-70' : 'pointer-events-none opacity-0'}`}
        onClick={toggleDrawer}
        aria-hidden="true"
      ></div>
      <div
        id="drawer-swipe"
        className={`fixed z-50 w-full h-4/6 border-t rounded-t-lg border-gray-800 bg-gray-950 transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} bottom-0 left-0 right-0 flex flex-col`}
        tabIndex="-1"
        aria-labelledby="drawer-swipe-label"
      >
        <div className="group transition duration-200 h-14 sm:h-12 flex items-center justify-center sm:justify-start space-y-2 sm:space-y-0 p-4 cursor-pointer hover:bg-gray-800" onClick={toggleDrawer}>
          <span className="absolute w-8 h-1 -translate-x-1/2 rounded-lg top-3 left-1/2 bg-gray-700 group-hover:bg-white"></span>
          <h5 id="drawer-swipe-label" className="inline-flex items-center text-base text-gray-300 group-hover:text-white font-medium">
            {svg}
            {message}
          </h5>
        </div>
        <div className="overflow-y-auto flex-1 space-y-3 p-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
