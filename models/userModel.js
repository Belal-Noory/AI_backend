import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://www.kasandbox.org/programming-images/avatars/cs-hopper-cool.png",
    },
    trail: {
      type: Boolean,
      default: true,
    },
    start: { type: Date, default: null },
    end: {type:Date, default: null}
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return true;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);
export default User;
