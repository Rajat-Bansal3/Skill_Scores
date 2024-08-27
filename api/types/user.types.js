const { z } = require("zod");

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "should me more than 3 chars" })
    .max(17, { message: "can be oly upto 17 chars" })
    .toLowerCase()
    .optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(7, { message: "should me more than 3 chars" })
    .max(17, { message: "should me more than 3 chars" }),
});

module.exports = {
  userSchema,
};
