
"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteImage(imageId) {
  try {
    const client = await clientPromise;
    const db = client.db("snaplink_db");
    const collection = db.collection("images");

    const objectId = new ObjectId(imageId);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      revalidatePath("/");
      revalidatePath("/gallery");
      return { success: true };
    } else {
      return { success: false, error: "Image not found" };
    }
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete" };
  }
}