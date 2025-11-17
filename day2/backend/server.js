import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import menRoutes from './routes/menRoutes.js';
import womenRoutes from './routes/womenRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { v2 as cloudinary } from 'cloudinary';
import './config/cloudinary.js';

dotenv.config();

const app = express();


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB connection error:", err));


app.use('/api/auth', authRoutes);
app.use('/api/men', menRoutes);
app.use('/api/women', womenRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
