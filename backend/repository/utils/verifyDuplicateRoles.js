function verifyDuplicateRolesAsync(data, roleIDs) {
  const duplicateRoles = {};

  data.forEach((item) => {
    if (roleIDs.includes(item.roleID)) {
      if (!duplicateRoles[item.roleID]) {
        duplicateRoles[item.roleID] = [item.role.name];
      } else {
        duplicateRoles[item.roleID].push(item.role.name);
      }
    }
  });

  const duplicateRolesString = Object.keys(duplicateRoles)
    .map((roleID) => {
      const roleNames = duplicateRoles[roleID].join(', ');
      return `${roleNames}`;
    })
    .join(', ');

  return duplicateRolesString;
}

export default verifyDuplicateRolesAsync;
