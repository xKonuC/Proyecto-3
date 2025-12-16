// SectionsGraduate.jsx
import React from "react";
import "../../../style/border.css";
import SectionsGraduateBase from "./sectionsGraduateBase";

function SectionsGraduate({ title, description, sections }) {
    return (
        <SectionsGraduateBase
            title={title}
            description={description}
            sections={sections}
        />
    );
}

export default SectionsGraduate;
