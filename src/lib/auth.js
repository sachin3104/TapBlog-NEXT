import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiry = "1h"; // Default to 1 hour

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (!/^\d+[smhd]?$/.test(expiry)) {
    throw new Error(
      'Invalid JWT_EXPIRY format. Use a number (e.g., "60") or a string (e.g., "1h", "2d").'
    );
  }

  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  return token;
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Error in verifying the token");
  }
};
