import { generateToken } from "../config/generateToken.js";
import User from "../models/userModel.js";

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  console.log(users);
  res.send(users);
};

const registerController = async (req, res) => {
  const { name, email, password ,pic} = req?.body;
  if (!name || !email || !password) {
    res.status(400);
    throw Error("All Field are Required");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const date = new Date();
  const start = new Date();
  const end = date.setDate(date.getDate()+3);
  const user = await User.create({
    email,
    name,
    password,
    pic,
    start,
    end
  });

  try {
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });

    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.send({ error });
  }
};
const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // const newPass = await user.matchPassword(password);
  // console.log("newPass", newPass);

  if (user && (await user.matchPassword(password))) {
    const start = new Date();
    const end = new Date(user.end);
    const diff = parseInt((start - end) / (1000 * 60 * 60 * 24));
    if(diff < 0)
    {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        reminig: diff,
        token: generateToken(user._id),
      });
    }else{
      res.status(401).json("You need to buy a package to use our service");
    }
  } else {
    res.status(401).json("Invalid Email or Password");
    // throw new Error("Invalid Email or Password");
  }
};

export { registerController, loginController, allUsers };
