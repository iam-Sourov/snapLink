// actions/addImage.js
"use server";

import clientPromise from "@/lib/mongodb";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function addImageToDB(imageData) {
  // 1. Connect to DB
  const client = await clientPromise;
  const db = client.db("snaplink_db"); // Choose your DB name
  const collection = db.collection("images");

  // 2. Generate a short code (5 characters is usually enough)
  const shortCode = nanoid(5);

  // 3. Create the document object
  const newImage = {
    ...imageData, // Contains public_id, secure_url, etc. from Cloudinary
    shortCode,
    clicks: 0,
    createdAt: new Date(),
  };

  // 4. Insert into MongoDB
  await collection.insertOne(newImage);

  // 5. Refresh the gallery page so the new image shows up immediately
  revalidatePath("/");

  return { success: true, shortCode };
}