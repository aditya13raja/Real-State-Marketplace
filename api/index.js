import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importing routes
import userRoute from './routes/user.route.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB!");
}).catch(err => {
  console.log(err);
})

app.listen(3000, () => {
  console.log("Server started at port https://localhost:3000");
})

app.use('/api/routes', userRoute);