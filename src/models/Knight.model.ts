import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");

interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

const knightSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  nickname: String,
  birthday: { type: Date, required: true },
  weapons: [
    {
      name: String,
      mod: Number,
      attr: String,
      equipped: Boolean,
    },
  ],
  attributes: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  keyAttribute: String,
  hallOfFame: Boolean,
  isHero: { type: Boolean, default: false },
});

knightSchema.methods.calculateAttack = function () {
  const modTable = {
    "-2": [0, 8],
    "-1": [9, 10],
    "0": [11, 12],
    "1": [13, 15],
    "2": [16, 18],
    "3": [19, 20],
  };

  const keyAttrValue = this.attributes[this.keyAttribute];
  let mod = -2;

  for (const [modValue, range] of Object.entries(modTable)) {
    if (keyAttrValue >= range[0] && keyAttrValue <= range[1]) {
      mod = parseInt(modValue);
      break;
    }
  }

  const equippedWeapon = this.weapons.find((weapon: Weapon) => weapon.equipped);
  const weaponMod = equippedWeapon ? equippedWeapon.mod : 0;

  return 10 + mod + weaponMod;
};

knightSchema.methods.calculateExperience = function () {
  const birthYear = new Date(this.birthday).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age >= 7 ? Math.floor((age - 7) * Math.pow(22, 1.45)) : 0;
};

const knightModel = mongoose.model("Knight", knightSchema);
export default knightModel;
