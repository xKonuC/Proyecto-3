/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link } from "react-router-dom";

function SectionsBase({ title, sections, description = "", customClass = "" }) {

    return (
        <main className={`bg-white text-orange-main ${customClass} min-h-screen rounded-lg p-10 shadow-md`}>
            <div className="mx-auto max-w-screen-xl px-4 pb-2 sm:pb-4 sm:px-3 lg:pb-6 lg:px-2">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-3xl font-bold text-center sm:text-5xl text-orange-main">{title}</h2>
                    <p className="mt-4 text-gray-600 font-normal">
                    {description}
                </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section, index) => (
                        <Link
                            key={index}
                            to={section.link}
                            className="group relative block h-full"
                        >
                            <span className="absolute inset-0 rounded-xl border-2 border-dashed border-orange-main"></span>

                            <div className="relative flex h-full rounded-xl items-end border-2 border-orange-main bg-orange-main transition-all ease-in-out duration-300 group-hover:bg-white group-hover:border-orange-main">
                                <div className="p-4 sm:p-6 lg:p-8">
                                    <span className="block group-hover:hidden text-white">
                                        {section.icon}
                                    </span>
                                    <h2 className="mt-4 text-xl font-semibold sm:text-2xl text-white group-hover:text-orange-main">{section.title}</h2>
                                    <p className="hidden group-hover:block mt-3 text-xs sm:text-base break-words text-justify text-white group-hover:text-orange-main">
                                        {section.description}
                                    </p>
                                    <p className="hidden group-hover:flex mt-2 font-bold items-center gap-1 text-white group-hover:text-orange-main">
                                        Ver más
                                        <span aria-hidden="true" className="block text-2xl transform transition-all rtl:rotate-180">
                                            &rarr;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default SectionsBase;
