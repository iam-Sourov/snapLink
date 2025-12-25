import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("snaplink_db");
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const query = userId ? { userId } : {};

    const images = await db
      .collection("images")
      .find(query)
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