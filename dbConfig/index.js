import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,       // Optional: Check if needed based on Mongoose version
            useUnifiedTopology: true,    // Optional: Check if needed based on Mongoose version
        });
        console.log("Connected to DB Successfully");
    } catch (error) {
        console.error("Error connecting to DB:", error);
    } 
};

// Optionally, export the connection function if you need to use it elsewhere
export default dbConnection;
