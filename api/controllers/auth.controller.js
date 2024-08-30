const jwt = require("jsonwebtoken");
const User = require("../modals/user.model");
const { userSchema } = require("../types/user.types");
const { errorHandler } = require("../utility/err");

exports.auth = async (req, res, next) => {
  const payload = req.body;
  const { action } = req.query;

  try {
    // Validate payload
    const decoded = userSchema.safeParse(payload);
    if (!decoded.success) {
      return next(errorHandler(411, "Invalid fields"));
    }

    const { username, email, password } = decoded.data;

    if (action === "signup") {
      // Handle user signup
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(errorHandler(400, "Email already exists"));
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign(
        { email: user._id.toString() },
        process.env.SECRET_KEY,
        { expiresIn: "1y" }
      );
      const userDetails = { ...user._doc };
      delete userDetails.password;
      res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 31536000000),
          httpOnly: true,
        })
        .status(200)
        .json({ user: userDetails });
    } else if (action === "signin") {
      // Handle user signin
      const user = await User.findOne({ email });
      if (!user) {
        return next(errorHandler(404, "Invalid Credentials"));
      }

      const validPass = user.comparePassword(password);
      if (!validPass) {
        return next(errorHandler(401, "Invalid Credentials"));
      }

      const token = jwt.sign(
        { email: user._id.toString() },
        process.env.SECRET_KEY,
        { expiresIn: "1y" }
      );
      // esignore
      const userDetails = { ...user._doc };
      delete userDetails.password;
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
    next(errorHandler(error));
  }
};
