import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  password: string; // Hashed
  name: string;
  phone?: string;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
}

export interface UserInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
}
