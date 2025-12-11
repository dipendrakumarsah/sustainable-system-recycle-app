import { ObjectId } from "mongodb";

export interface Transaction {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  binId: ObjectId;
  type: "purchase" | "disposal" | "reward";
  amount: number; // Positive for rewards, negative for purchases
  description: string;
  status: "pending" | "completed" | "failed";
  metadata?: {
    productName?: string;
    binLocation?: string;
    recyclableType?: string;
  };
  createdAt: Date;
}

export interface TransactionInput {
  userId: ObjectId;
  productId?: ObjectId;
  binId?: ObjectId;
  type: "purchase" | "disposal" | "reward";
  amount: number;
  description: string;
  metadata?: {
    productName?: string;
    binLocation?: string;
    recyclableType?: string;
  };
}
