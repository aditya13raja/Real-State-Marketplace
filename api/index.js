import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Importing routes
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.router.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB!");
}).catch(err => {
  console.log(err);
})

app.listen(3000, () => {
  console.log("Server started at port https://localhost:3000");
})

app.use('/api', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});