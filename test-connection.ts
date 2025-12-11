import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: ".env.local" });

async function testConnection() {
  console.log("Environment check:");
  console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
  console.log(
    "URI preview:",
    process.env.MONGODB_URI?.substring(0, 30) + "..."
  );

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment");
    process.exit(1);
  }

  try {
    console.log("\n🔌 Connecting to MongoDB...");
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    console.log("✅ Connected successfully!");

    const db = client.db("sustainable-rewards");
    console.log("📦 Database:", db.databaseName);

    const collections = await db.listCollections().toArray();
    console.log("\n📂 Collections:", collections.length);
    collections.forEach((col) => console.log(`   - ${col.name}`));

    const productCount = await db.collection("products").countDocuments();
    const binCount = await db.collection("bins").countDocuments();

    console.log("\n📊 Documents:");
    console.log(`   Products: ${productCount}`);
    console.log(`   Bins: ${binCount}`);

    await client.close();
    console.log("\n✅ Connection test completed!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Connection failed:");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
