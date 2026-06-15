import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { getCorsOptions } from "./config/cors.config.js";
import authRoutes from "./modules/auth/auth.routes.js";
import connectDb from "./config/database.config.js";
import dns from "dns"
dns.setServers(["8.8.4.4", "8.8.8.8"]);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit:"10mb" }));
app.use(express.urlencoded({ extended:true, limit:"10mb" }));
app.use(cookieParser());
app.use(cors(getCorsOptions()));

app.get("/", (req,res)=>res.send("Test Route Working Great 😁"));

app.use("/api/v1/auth", authRoutes);

const startServer = async ()=>{
  console.log("DB STRING:",process.env.DATABASE_URI);
  try{
    console.log("Trying to connect DB...");
    await connectDb();
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
  }catch(err){
    console.error("Server failed to start",err);
  }
};

startServer();

export default app;