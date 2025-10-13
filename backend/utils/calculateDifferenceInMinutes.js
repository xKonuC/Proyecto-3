function calculateDifferenceInMinutes(creationDate, dueDate) {
  const startDate = new Date(creationDate); // Cambiado el nombre de la variable a createDate
  const endDate = new Date(dueDate); // Cambiado el nombre de la variable a endDate

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

  if (differenceInMilliseconds > 0) {
    return 0;
  }
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
  return differenceInMinutes;
}

export default calculateDifferenceInMinutes;
