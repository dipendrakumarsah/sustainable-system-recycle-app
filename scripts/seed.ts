import dotenv from "dotenv";
import { getDb } from "../lib/db";
import { Product } from "../lib/models/Product";
import { Bin } from "../lib/models/Bin";
import QRCode from "qrcode";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });
console.log("🚀 Seed script loaded");

async function seedDatabase() {
  const db = await getDb();

  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.collection("products").deleteMany({});
  await db.collection("bins").deleteMany({});
  await db.collection("users").deleteMany({});
  await db.collection("transactions").deleteMany({});

  // Sample Products
  const products: Omit<Product, "_id">[] = [
    {
      name: "Eco Fresh Drink",
      description: "Refreshing beverage in a recyclable plastic bottle",
      price: 95,
      rewardAmount: 5,
      rewardPercentage: 5.26,
      category: "beverage",
      recyclableType: "plastic",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Glass Water Bottle",
      description: "Premium glass bottled water",
      price: 120,
      rewardAmount: 10,
      rewardPercentage: 8.33,
      category: "beverage",
      recyclableType: "glass",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Organic Juice Can",
      description: "Fresh organic juice in aluminum can",
      price: 85,
      rewardAmount: 6,
      rewardPercentage: 7.06,
      category: "beverage",
      recyclableType: "metal",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Eco Snack Box",
      description: "Healthy snacks in recyclable paper packaging",
      price: 150,
      rewardAmount: 12,
      rewardPercentage: 8.0,
      category: "food",
      recyclableType: "paper",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const productResult = await db
    .collection<Product>("products")
    .insertMany(products as Product[]);
  console.log(`✅ Inserted ${productResult.insertedCount} products`);

  // Sample Bins
  const binLocations = [
    {
      name: "Central Park Entrance",
      address: "123 Park Avenue, Delhi",
      types: ["plastic", "glass", "metal"] as (
        | "plastic"
        | "glass"
        | "metal"
        | "paper"
        | "organic"
      )[],
    },
    {
      name: "Shopping Mall - East Wing",
      address: "456 Mall Road, Mumbai",
      types: ["plastic", "paper"] as (
        | "plastic"
        | "glass"
        | "metal"
        | "paper"
        | "organic"
      )[],
    },
    {
      name: "Metro Station - Platform 2",
      address: "789 Metro Line, Bangalore",
      types: ["plastic", "metal", "paper"] as (
        | "plastic"
        | "glass"
        | "metal"
        | "paper"
        | "organic"
      )[],
    },
    {
      name: "University Campus",
      address: "321 Education Street, Pune",
      types: ["plastic", "glass", "metal", "paper"] as (
        | "plastic"
        | "glass"
        | "metal"
        | "paper"
        | "organic"
      )[],
    },
  ];

  const bins: Omit<Bin, "_id">[] = [];
  for (const location of binLocations) {
    const binId = `BIN-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const qrCode = await QRCode.toDataURL(binId);

    bins.push({
      binId,
      location: {
        name: location.name,
        address: location.address,
      },
      acceptedTypes: location.types,
      qrCode,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  const binResult = await db.collection<Bin>("bins").insertMany(bins as Bin[]);
  console.log(`✅ Inserted ${binResult.insertedCount} bins`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Summary:");
  console.log(`   Products: ${productResult.insertedCount}`);
  console.log(`   Bins: ${binResult.insertedCount}`);
  console.log("\n🚀 You can now run: npm run dev");

  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
