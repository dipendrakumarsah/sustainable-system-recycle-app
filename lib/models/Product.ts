import { ObjectId } from "mongodb";

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  rewardAmount: number; // Fixed reward amount (e.g., ₹5)
  rewardPercentage: number; // Percentage of price (e.g., 5.26% of ₹95)
  category: "beverage" | "food" | "packaging" | "other";
  recyclableType: "plastic" | "glass" | "metal" | "paper" | "organic";
  imageUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  rewardAmount: number;
  rewardPercentage: number;
  category: "beverage" | "food" | "packaging" | "other";
  recyclableType: "plastic" | "glass" | "metal" | "paper" | "organic";
  imageUrl?: string;
}
