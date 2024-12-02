import express from 'express'
import ConnectToMonogDb from './DB/ConnectToMonogDb.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/Auth.route.js'
import taskRoute from './Routes/Task.route.js'
dotenv.config();
const PORT = process.env.PORT||3000;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/',taskRoute);
app.listen(PORT,()=>{
    ConnectToMonogDb();
    console.log(`Server is listening at port ${PORT}`);
})