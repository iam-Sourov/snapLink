// app/[shortCode]/page.js
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {
  // 1. Get the short code from the URL
  // In Next.js 15, params is a Promise, so we must await it
  const { shortCode } = await params;

  // 2. Connect to DB
  const client = await clientPromise;
  const db = client.db("snaplink_db");
  const collection = db.collection("images");

  // 3. Find the image and update the click count (+1)
  const result = await collection.findOneAndUpdate(
    { shortCode: shortCode }, // Find by shortCode
    { $inc: { clicks: 1 } },  // Increment clicks by 1
    { returnDocument: "after" } // Return the updated document
  );

  // 4. Handle the result
  if (result) {
    // If found, redirect to the original high-quality image URL
    // result.originalUrl might be inside result.value depending on driver version
    // Usually, findOneAndUpdate returns the document directly or inside .value
    const doc = result.value || result;

    if (doc?.originalUrl) {
      redirect(doc.originalUrl);
    }
  }

  // 5. If not found, show a simple 404 message
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500">
        404 - Link Not Found
      </h1>
    </div>
  );
}