// Import jsonwebtoken to verify JWT tokens in the auth middleware
const jwt = require('jsonwebtoken');

// Middleware function to protect routes and ensure the user is authenticated
const authMiddleware = (req, res, next) => {
  try {
    
    // Debugging: Log the Authorization header to see what is being received
    //console.log("AUTH HEADER:", req.headers.authorization);

    // Check if the Authorization header is present and properly formatted
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authorized' });
      }

    // Extract the token from the header (remove 'Bearer ' prefix and any trailing semicolons)
    const token = authHeader.split(' ')[1].replace(/;$/, '');

    // Verify the token using the JWT secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // If verification is successful, call next() to proceed to the protected route handler
    next();

    // If verification fails, it will throw an error and be caught in the catch block below
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Not authorized' });
  }
};

// Export for routes to use
module.exports = authMiddleware;


/* Debugging Notes
Insomnia was used for manual testing (it's just the API client tool I happened to learn first)

Issue - during testing, protected routes were returning "Not authorized" even with a valid token.

Cause- The Authorization header contained a trailing semicolon.  It appears that Insomnia was 
adding a semicolon at the end of the token when copying it from the response and pasting it into 
the header for subsequent requests. This caused the JWT verification to fail because the token 
string was not in the expected format.

Solution - In the auth middleware, after extracting the token, we can add a .replace(/;$/, '') 
to remove any trailing semicolon from the token string before verifying it. This allows the JWT 
verification to work correctly even if the token has an extra semicolon at the end. 

Source: Google search "how to sanitize a token in javascript when client formatting adds semicolons", 
and found the .replace(/;$/, '') solution on StackOverflow.
*/