const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const app = require("./src/index"); // Import from app.js
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});