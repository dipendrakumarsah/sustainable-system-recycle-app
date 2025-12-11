import { ObjectId } from "mongodb";

export interface Bin {
  _id?: ObjectId;
  binId: string; // Unique identifier for the bin (encoded in QR)
  location: {
    name: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  acceptedTypes: ("plastic" | "glass" | "metal" | "paper" | "organic")[];
  qrCode: string; // Base64 encoded QR code image
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BinInput {
  location: {
    name: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  acceptedTypes: ("plastic" | "glass" | "metal" | "paper" | "organic")[];
}
