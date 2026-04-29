const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    // Accepts both "Bearer <token>" and raw "<token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach full student object (minus password) to req
    const student = await Student.findById(decoded.id).select("-password");
    if (!student) {
      return res.status(401).json({ message: "Student not found, unauthorized" });
    }

    req.user = student;   // accessible as req.user in routes
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};
