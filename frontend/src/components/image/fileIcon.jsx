import React from 'react';
import iconPng from '../../img/image-icon.png'
import iconDoc from '../../img/word-icon.png'
import iconXls from '../../img/excel-icon.png'
import iconPdf from '../../img/pdf-icon.png'
import iconDefault from '../../img/default-icon.png'

const FileIcon = ({ format, width = "150", height = "150" }) => {
  let iconSrc;
  let altText = "Archivo desconocido";

  if (format === 'pdf') {
    iconSrc = iconPdf;
    altText = "PDF Icon";
  } else if (format === 'png') {
    iconSrc = iconPng;
    altText = "PNG Icon";
  } else if (
    format === 'doc' || format === 'docx' ||
    format === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    iconSrc = iconDoc;
    altText = "Word Icon";
  } else if (
    format === 'xlsx' ||
    format === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    iconSrc = iconXls;
    altText = "Excel Icon";
  } else {
    iconSrc = iconDefault;
  }

  return <img src={iconSrc} alt={altText} width={width} height={height} />;
};

export default FileIcon;
