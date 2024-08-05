import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");

const knightSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  nickname: String,
  birthday: Date,
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
  deleted: Boolean,
  isHero: { type: Boolean, default: false },
});

knightSchema.virtual("attack").get(function () {
  const { attributes, weapons, keyAttribute } = this;

  const equippedWeapon = weapons.find((weapon) => weapon.equipped);
  const weaponMod = equippedWeapon ? equippedWeapon.mod : 0;

  const keyAttrValue = attributes?.[keyAttribute] || 0;
  return 10 + keyAttrValue + weaponMod;
});

knightSchema.pre("save", function (next) {
  const age = calculateAge(this.birthday);
  this.exp = Math.floor((age - 7) * Math.pow(22, 1.45));
  next();
});

function calculateAge(birthday: Date) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const knightModel = mongoose.model("Knight", knightSchema);
export default knightModel;
