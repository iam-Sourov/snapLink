
"use server";

import clientPromise from "@/lib/mongodb";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function addImageToDB(imageData) {

  const client = await clientPromise;
  const db = client.db("snaplink_db");
  const collection = db.collection("images");


  const shortCode = nanoid(5);
  const newImage = {
    ...imageData, 
    shortCode,
    clicks: 0,
    createdAt: new Date(),
  };

  await collection.insertOne(newImage);

  revalidatePath("/");

  return { success: true, shortCode };
}