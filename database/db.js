import mongoose from 'mongoose';

const URI="mongodb://localhost:27017/weather";

const connectDb=async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("connection successfull!");
    }
    catch(er){
        console.log("something went wrong while connection...");
        process.exit(1);
    }
}

export {connectDb};
