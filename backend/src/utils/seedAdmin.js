import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const seedAdmin = async ()=>{ try{
  await mongoose.connect(process.env.DATABASE_URI);

  const exists = await User.findOne({ role:"ADMIN" });
  if(exists){
    console.log("Admin already exists");
    await mongoose.connection.close();
    return process.exit(0);
  }

  await User.create({
    firstName:"abc",
    lastName:"xyz",
    email:"admin@companyname.com",
    password:await bcrypt.hash("admin@",10),
    role:"ADMIN"
  });

  console.log("Admin created");

  await mongoose.connection.close();
  process.exit(0);
}catch(err){
  console.error("Seed admin error:",err);
  await mongoose.connection.close();
  process.exit(1);
} };

seedAdmin();