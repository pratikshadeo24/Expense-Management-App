import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT || 5000;  // Default to port 5000 if not set

// Connect to DB
connectDB();

// Allowed origins array
const allowedOrigins = [
  "http://localhost:3000",
  // Uncomment for production
  // "https://main.d1sj7cd70hlter.amplifyapp.com",
  // "https://expense-tracker-app-three-beryl.vercel.app",
];

// CORS Options: Use a function to dynamically allow origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  // Allow cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Apply CORS before any routes or other middleware
app.use(cors(corsOptions));

// Handle preflight `OPTIONS` requests
app.options('*', cors(corsOptions));

// Helmet (security headers)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Morgan (logging middleware)
app.use(morgan("dev"));

// Routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
