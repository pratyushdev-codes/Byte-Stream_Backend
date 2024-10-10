import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,       
            useUnifiedTopology: true,    
        });
        console.log("Connected to DB Successfully");
    } catch (error) {
        console.error("Error connecting to DB:", error);
    } 
};


export default dbConnection;
