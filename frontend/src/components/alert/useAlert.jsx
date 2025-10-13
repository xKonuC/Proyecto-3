import React, { useState } from "react";
import ListAlert from "./listAlert";

export default function useAlert() {
    const [list, setAlerts] = useState([]);

    const createToast = (options) => {
        setAlerts([...list, options]);
        setTimeout(() => {
            setAlerts((l) => l.slice(1));
        }, 5000);
    };

    const alerts = (
        <div className="fixed right-0 top-0 w-full">
            {list.map((t, index) => (
                <ListAlert key={index} type={t.type}>{t.content}</ListAlert>
            ))}
        </div>
    );

    return {
        alerts,
        createToast,
    };
}
