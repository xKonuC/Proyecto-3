import React from 'react';
import logo from '../../img/uta.png'

const loginLoader = () => (
  <section className="bg-orange-main relative place-items-center grid h-screen w-screen gap-4">
    {/* ITEM 1 */}
    <div className="bg-orange-300 w-72 h-72 absolute animate-ping rounded-full delay-5s shadow-xl"></div>
    {/* ITEM 2 */}
    <div className="bg-orange-200 w-52 h-52 absolute animate-ping rounded-full shadow-xl"></div>
    {/* ITEM 3 */}
    <div className="bg-orange-100 w-36 h-36 absolute animate-ping rounded-full delay-5s shadow-xl"></div>
    {/* SVG LOGO */}
    <img
      className="z-10 h-40 w-28 animate-bounce delay-5s"
      src={logo}
      alt="Logo Uta"
    />
  </section>
);

export default loginLoader;
