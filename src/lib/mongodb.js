import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI");
}

const globalForMongo = globalThis;

export const mongoClient =
  globalForMongo.__mongoClient__ ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__mongoClient__ = mongoClient;
}

export const db = mongoClient.db("docAppoint");
