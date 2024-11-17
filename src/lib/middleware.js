import { verifyToken } from "./auth";

// Middleware for protected routes
export const protectedRoute = (req) => {
  try {
    // Extract the token from Authorization header
    const token = extractToken(req);

    // Validate the token and get the decoded payload
    const decoded = verifyToken(token);

    // Return the decoded payload (e.g., user info) if valid
    return decoded;
  } catch (err) {
    // If token is invalid or missing, throw an error
    throw new Error("Unauthorized access: " + err.message);
  }
};

// Helper function to extract the token from Authorization header
const extractToken = (req) => {
  const authHeader = req.headers.get("Authorization");

  // Extract from Authorization header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]; // Extract the token after "Bearer "
  }

  // No token found
  throw new Error("Token not found in Authorization header");
};
