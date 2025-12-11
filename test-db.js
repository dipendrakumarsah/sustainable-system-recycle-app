import dotenv from "dotenv";
import { getDb } from "./lib/db.js";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    const db = await getDb();
    console.log("✅ Connected to database:", db.databaseName);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log("\n📂 Collections:");
    collections.forEach((col) => console.log(`   - ${col.name}`));

    // Count documents
    const productCount = await db.collection("products").countDocuments();
    const binCount = await db.collection("bins").countDocuments();

    console.log("\n📊 Document counts:");
    console.log(`   Products: ${productCount}`);
    console.log(`   Bins: ${binCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
