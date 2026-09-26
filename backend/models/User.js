const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 12);
  return this.password;
}

userSchema.methods.checkPassword = async function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

userSchema.pre("save", hashPassword);

const User = mongoose.model("User", userSchema);

module.exports = User;
