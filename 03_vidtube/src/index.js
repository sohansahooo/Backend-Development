import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 3000

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);  
    })
})
.catch((err) => {
    console.log("Error connecting to MongoDB", err);
});