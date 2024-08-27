const { default: rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Slow Down. Try memoisation of results to decrease req count",
});
module.exports = {
  limiter,
};
