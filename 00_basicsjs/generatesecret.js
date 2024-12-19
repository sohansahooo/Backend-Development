const crypto = require('crypto');

// Function to generate a random secret
const generateSecret = () => {
  return crypto.randomBytes(64).toString('base64url'); // 'base64url' encoding for a URL-safe string
};

// Generate the secret
const secret = generateSecret("secret");

console.log(secret);
