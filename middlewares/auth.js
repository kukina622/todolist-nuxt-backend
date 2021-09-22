module.exports = function (req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(403).json({
    message: "NO_PERMISSION"
  });
};
