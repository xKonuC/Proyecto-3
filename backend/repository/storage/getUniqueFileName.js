function getUniqueFileName(archive) {
  return archive.substring(archive.lastIndexOf('/') + 1);
}
export default getUniqueFileName;
