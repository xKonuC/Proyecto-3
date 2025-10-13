// SectionsStudent.jsx
import React from "react";
import "../../../style/border.css";
import SectionsStudentBase from "./sectionsStudentBase";

function SectionsStudent({ title, description, sections }) {
    return (
        <SectionsStudentBase
            title={title}
            description={description}
            sections={sections}
        />
    );
}

export default SectionsStudent;
