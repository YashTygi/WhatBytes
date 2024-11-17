import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
    try {
        if (connection.isConnected) {
            console.log("Already connected to database");
            return mongoose.connection;
        }

        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL);
        connection.isConnected = mongoose.connection.readyState;
        console.log("Database connected successfully");

        return mongoose.connection;
    } catch (err) {
        console.error("Failed to connect to database:", err);
        process.exit(1);
    }
}

export default dbConnect;
