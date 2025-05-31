import express from 'express';//module.js work asynchronously.
import dotenv from 'dotenv';
// import {connectDb} from './database/db.js';
import cors from 'cors';
import router from './routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router);

const port = process.env.PORT || 3000;
try{

    app.listen(port, () => {
        console.log(`server is running at http://localhost:${port}`);
    });
}catch(error){
    console.log(`error in server:${error}`);
}
