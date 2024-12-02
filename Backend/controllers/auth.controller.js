import User from "../Models/user.Model.js";
import bycrpt from "bcryptjs";
import generateTokenSetCookie from "../Token/generateTokenSetCookie.js";
const login = async (req, res) => {
  try {
    const { input, password } = req.body;
    const user = await User.findOne({ $or: [{ username: input }, { email: input }] });
    const isPassword = await bycrpt.compare(password,user?.password||"");
      if(!user||!isPassword){
         res.status(400).json({Error:"Invalid User data"});
      }else{
          generateTokenSetCookie(user._id,res);
          res.status(200).json({
             _id:user._id,
             email:user.email,
             username:user.username,
             password:user.password
          })
      }
    } 
   catch (error) {
    console.log("Error Occured in Login route", error.message);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ Error: "User already Exist" });
    }
    if (confirmpassword !== password) {
      return res.status(400).json({ Error: "Passwords do not Match" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ Error: "Not a valid email" });
    }
    if (!isStrongPassword(password)) {
      return res
        .status(400)
        .json({
          Error:
            "Enter a strong Password,Include specail characters upper case and lower case.",
        });
    }
    const key = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, key);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmpassword,
    });
    if (newUser) {
      generateTokenSetCookie(newUser._id, res);
      await newUser.save();
      console.log("new user inserted", newUser);
      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
      });
    }
  } catch (error) {
    console.log("Error Occured in Signup Controller", error.message);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

const logout = async (req,res) => {
    try {
        res.cookie('cookies',"",{maxAge:0})
        res.status(200).json({message:"Logged out Successfully"});

    } catch (error) {
        console.log(error.Message);
        res.status(500).json({error:"Internal server Error"});
    }

};

export { login, logout, signup };

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("Error occured in validate email!");
  return emailPattern.test(email);
};

const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  ) {
    return true;
  } else {
    return false;
  }
};
