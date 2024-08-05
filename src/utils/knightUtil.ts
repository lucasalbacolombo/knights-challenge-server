function calculateAttack(knight) {
  // Access knight properties to calculate attack
  const { attributes, weapons, keyAttribute } = knight;

  // Logic to determine the equipped weapon
  const equippedWeapon = weapons.find((weapon) => weapon.equipped);
  const weaponMod = equippedWeapon ? equippedWeapon.mod : 0;

  // Calculate attack based on key attribute and weapon mod
  const keyAttrValue = attributes[keyAttribute];
  return 10 + keyAttrValue + weaponMod;
}

function calculateExp(birthday) {
  // Logic to calculate experience based on birthday
  // Assuming you have a function to calculate age from birthday
  const age = calculateAge(birthday);

  // Replace this with your actual experience calculation logic
  return Math.floor((age - 7) * Math.pow(22, 1.45));
}
