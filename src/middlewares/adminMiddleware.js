function adminMiddleware(req, res, next) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Acesso restrito" });
  }
  next();
}

module.exports = adminMiddleware;