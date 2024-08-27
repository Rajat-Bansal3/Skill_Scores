const jwt = require("jsonwebtoken");

const User = require("../modals/user.model");
const { userSchema } = require("../types/user.types");
const { errorHandler } = require("../utility/err");

exports.auth = async (req, res, next) => {
  const payload = req.body;
  const { action } = req.query;
  try {
    const decoded = userSchema.safeParse(payload);
    if (!decoded.success) return next(errorHandler(411, "invalid fields"));
    const { username, email, password } = decoded.data;
    if (action === "signup") {
      //signUp
      console.log(decoded);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(errorHandler(400, "Email already exists"));
      }
      const user = new User({ username, email, password });
      console.log("here");
      await user.save();
      console.log("here");
      const token = jwt.sign({ email: user._id }, process.env.SECRET_KEY);
      const { password: pass, ...userDetails } = newUser._doc;
      console.log("here");
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 31536000000),
          httpOnly: true,
        })
        .status(200)
        .json({ user: userDetails });
    }
    //signIn
    else if (action === "signin") {
      const user = await User.findOne({ email });
      if (!user) return next(errorHandler(404, "Invalid Credentials"));
      const validPass = user.comparePassword(password);
      if (!validPass) return next(errorHandler(401, "Invalid Credentials"));
      const token = jwt.sign({ email: user._id }, process.env.SECRET_KEY);
      const { password: pass, ...userDetails } = user._doc;

      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 31536000000),
          httpOnly: true,
        })
        .status(200)
        .json({ user: userDetails });
    } else {
      return next(errorHandler(400, "Invalid action"));
    }
  } catch (error) {
    next(errorHandler(500, "internal server error"));
  }
};
