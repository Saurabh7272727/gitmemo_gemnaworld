import mongoose from "mongoose";



const mongoDBConnection = async () => {
    try {
        console.log('connecting......')
        await mongoose.connect("mongodb://localhost:27017/hackindia");
        console.log("connected database");
    } catch (error) {
        throw new Error(`DataBase Errro =============================>${error}`)
    }
}

export default mongoDBConnection;