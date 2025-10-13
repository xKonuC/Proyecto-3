import React, { useRef, useEffect } from "react";
import SectionsBase from "./sectionsBase";
import "../../../style/border.css";
import { verifyAuthAndRedirect } from "../../../utils/sessionHelpers";
import { useNavigate } from "react-router-dom";

function SectionsAdministrative({ title, sections }) {
    const navigate = useNavigate();
    const isMounted = useRef(false);

    useEffect(() => {
        // Iniciar carga de datos
        const fetchData = async () => {
            if (!isMounted.current) {
                isMounted.current = true;
                await verifyAuthAndRedirect(navigate);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <SectionsBase
            title={title}
            sections={sections}
        />
    );
}

export default SectionsAdministrative;
