import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../img/uta.png';
import { deniedSession } from '../../utils/sessionHelpers';

const DrawerContent = ({ isDrawerVisible, handleDrawerToggle, navigationUser, navigation, closeSession }) => {
  const [isPersonalAreaVisible, setPersonalAreaVisible] = useState(true);
  const [isAdminAreaVisible, setAdminAreaVisible] = useState(true);

  // Nuevo estado para gestionar el estado del dropdown para cada elemento
  const [dropdownStates, setDropdownStates] = useState({});

  // Función para manejar el estado del dropdown de cada elemento
  const handleDropdownToggle = (itemId) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [itemId]: !prevStates[itemId],
    }));
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-0 cursor-pointer transition-opacity duration-500 ease-in-out ${isDrawerVisible ? 'opacity-70' : 'pointer-events-none opacity-0'}`}
        onClick={handleDrawerToggle}
        aria-hidden="true"
      ></div>
      <aside
        id="drawer-navigation"
        className={`fixed top-0 left-0 rounded-r-3xl z-50 w-3/5 md:w-3/12 pt-4 pb-2.5 px-4 transition-transform duration-300 ${isDrawerVisible ? 'translate-x-0' : '-translate-x-full'
          } bg-gray-950 flex flex-col justify-between`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
        style={{ height: '100vh' }}
      >
        <div className="pl-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo de la Uta" className="mr-2 w-7 h-10" />
            <h5 id="drawer-navigation-label" className="text-sm md:text-base font-bold uppercase text-white">
              Universidad de Tarapacá
            </h5>
          </div>
          <button
            type="button"
            onClick={handleDrawerToggle}
            aria-controls="drawer-navigation"
            className="t group flex items-center justify-center rounded-lg px-3 py-2 hover:bg-orange-main hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7 fill-current dark:text-gray-100">
              <rect width="352" height="32" x="80" y="96"></rect>
              <rect width="352" height="32" x="80" y="240"></rect>
              <rect width="352" height="32" x="80" y="384"></rect>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <span className="my-2 border-t border-white"></span>

        <div className="overflow-y-auto">
          <div className="space-y-1 py-2">
            <h3
              onClick={() => setPersonalAreaVisible(!isPersonalAreaVisible)}
              className="text-sm md:text-base font-bold pl-2 pr-3 text-white cursor-pointer flex justify-between items-center"
            >
              Área Personal
              <span className={`ml-1 transition-transform duration-300 transform ${isPersonalAreaVisible ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              </span>
            </h3>
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isPersonalAreaVisible ? 'max-h-screen' : 'max-h-0'}`}>
              {isPersonalAreaVisible && (
                <>
                  {navigationUser.map((item) => (
                    <Link
                      key={item.id}
                      to={item.url}
                      onClick={() => {
                        handleDrawerToggle();
                      }}
                      className="t group space-x-4 flex items-center justify-start rounded-lg px-3 py-1 text-orange-main hover:bg-orange-main hover:text-white"
                    >
                      {item.icon}
                      <span
                        className="text-sm md:text-base font-semibold text-white"
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
          {navigation.length > 0 && (
            <div className="space-y-1 border-t border-white py-4">
              <h3
                onClick={() => setAdminAreaVisible(!isAdminAreaVisible)}
                className="text-sm md:text-base font-bold pl-2 pr-3 pb-2 text-white cursor-pointer flex justify-between items-center"
              >
                Administración Universitaria
                <span className={`ml-1 transition-transform duration-300 transform ${isAdminAreaVisible ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </span>
              </h3>
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isAdminAreaVisible ? 'max-h-full' : 'max-h-0'}`}>
                {isAdminAreaVisible && (
                  <>
                    {navigation.map((item) => (
                      <div key={item.id}>
                        <div className="group relative">
                          <button
                            type="button"
                            onClick={() => handleDropdownToggle(item.id)}
                            className={`text-sm md:text-base font-bold px-3 py-1 rounded-lg ${dropdownStates[item.id] ? 'bg-orange-main text-white' : 'text-orange-main'} cursor-pointer w-full flex justify-between items-center`}
                          >
                            <div className="flex items-center justify-center gap-4">
                              {item.icon}
                              <p className="text-sm md:text-base font-bold text-white">
                                {item.label}
                              </p>
                            </div>
                            <span className={`text-white transition-transform duration-300 transform ${dropdownStates[item.id] ? 'rotate-180' : ''}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                              </svg>
                            </span>
                          </button>
                          {dropdownStates[item.id] && (
                            <div className={`space-y-2 transition-all duration-300 ease-in-out overflow-hidden h-auto`}>
                              {/* Contenido del dropdown */}
                              {item.sectionsData && (
                                <ul className="my-1.5">
                                  {item.sectionsData.map((section) => (
                                    <li key={section.link}>
                                      <Link
                                        to={section.link}
                                        onClick={() => {
                                          handleDrawerToggle();
                                        }}
                                        className="group space-x-2 relative flex items-center justify-start rounded-lg px-3 py-1 text-orange-main hover:bg-orange-main hover:text-white"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                        <span className="text-sm md:text-base font-semibold text-white">
                                          {section.title}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  </>)}
              </div>
            </div>
          )}
        </div>


        <div className="mt-auto">
          <form className="border-t border-white pt-2" onSubmit={closeSession}>
            <button
              type="submit"
              className="t group space-x-4 w-full flex items-center justify-start rounded-lg px-2 py-1 text-orange-main hover:bg-orange-main hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span
                className="text-sm md:text-base font-semibold text-white"
              >
                Cerrar Sesión
              </span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
};

const Sidebar = ({ navigationUser, navigation = [] }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const navigate = useNavigate();

  const closeSession = (e) => {
    e.preventDefault();
    deniedSession(navigate);
  };

  return (
    <>
      {!isDrawerVisible && (
        <div className="fixed top-0 left-0 z-40 px-2 rounded-r-lg flex h-screen w-14 flex-col justify-between bg-gray-950">
          <div>
            <button
              className="rounded-lg h-16 w-16 pr-5 flex items-center justify-center"
              type="button"
              onClick={handleDrawerToggle}
              aria-controls="drawer-navigation"
            >
              <img src={logo} alt="Logo de la Uta" className="w-7 h-10" />
            </button>

            <div className="border-t border-white">
              <div className="space-y-1 py-4">
                {navigationUser.map((item) => (
                  <Link
                    key={item.id}
                    to={item.url}
                    className="t group relative flex justify-center rounded px-2 py-1 text-orange-main hover:bg-orange-main hover:text-white"
                  >
                    {item.icon}
                    <span
                      style={{ pointerEvents: 'none' }}
                      className="ms-4 absolute top-1/2 ml-6 w-24 -translate-y-1/2 translate-x-3/4 rounded bg-gray-900 py-1.5 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
              <ul className="border-t border-white space-y-1 pt-4">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.url}
                      className="group relative flex justify-center rounded px-2 py-1 text-orange-main hover:bg-orange-main hover:text-white"
                    >
                      {item.icon}
                      <span
                        style={{ pointerEvents: 'none' }}
                        className="ms-4 absolute top-1/2 ml-6 w-24 -translate-y-1/2 translate-x-3/4 rounded bg-gray-900 py-1.5 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="py-2 mt-auto border-t border-white">
            <form onSubmit={closeSession}>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-orange-main hover:bg-orange-main hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                <span
                  style={{ pointerEvents: 'none' }}
                  className="ms-4 absolute top-1/2 ml-6 w-24 -translate-y-1/2 translate-x-3/4 rounded bg-gray-900 py-1.5 text-center text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                >
                  Cerrar Sesión
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DrawerContent component for the open sidebar */}
      <DrawerContent
        isDrawerVisible={isDrawerVisible}
        handleDrawerToggle={handleDrawerToggle}
        navigationUser={navigationUser}
        navigation={navigation}
        closeSession={closeSession}
      />
    </>
  );
};

export default Sidebar;
