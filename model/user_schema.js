import mongoose from 'mongoose';

const user_schema = new mongoose.schema({
    username: {
        type: String,
        required:true,
    },
    
})