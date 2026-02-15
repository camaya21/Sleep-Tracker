require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function getDb() {
  if (db) return db;
  await client.connect();
  db = client.db(process.env.MONGODB_DBNAME || "sleep_tracker");
  console.log("✅ Connected to MongoDB Atlas");
  return db;
}

module.exports = { getDb };
