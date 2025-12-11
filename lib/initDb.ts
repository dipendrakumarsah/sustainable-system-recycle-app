import { getDb } from "./db";

export async function initializeDatabase() {
  const db = await getDb();

  // Create indexes for better query performance
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("bins").createIndex({ binId: 1 }, { unique: true });
  await db.collection("transactions").createIndex({ userId: 1, createdAt: -1 });
  await db.collection("products").createIndex({ active: 1, category: 1 });

  console.log("Database indexes created successfully");
}
