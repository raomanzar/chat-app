import { auth } from "../lib/better-auth.js";

export const requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = session.user;
    req.session = session;
    return next(); // it means call the next middleware or controller
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
