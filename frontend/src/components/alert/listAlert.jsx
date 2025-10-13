import React, { memo } from "react";

const ListAlert = memo(({ type = "verification", children }) => {
    const classVariants = {
        verification:
            "p-4 shadow inline-block max-w-sm bg-green-300 text-green-900 rounded-md m-2",
        warning:
            "p-4 shadow inline-block max-w-sm bg-yellow-300 text-yellow-900 rounded-md m-2",
        danger:
            "p-4 shadow inline-block max-w-sm bg-red-300 text-red-900 rounded-md m-2"
    };
    return (
        <div
            className={
                classVariants[type] +
                " flex gap-2 items-center justify-center mx-auto"
            }
        >
            <span className="text-2xl">
                {type === "verification" ? (
                    <></>
                ) : type === "warning" ? (
                    <></>
                ) : (
                    <></>
                )}
            </span>
            {children}
        </div>
    );
});

export default ListAlert;