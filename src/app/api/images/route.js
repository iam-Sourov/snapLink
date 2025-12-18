// app/api/images/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("snaplink_db");
    
    const images = await db
      .collection("images")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(images);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}