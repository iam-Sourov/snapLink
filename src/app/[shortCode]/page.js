
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }) {

  const { shortCode } = await params;
  const client = await clientPromise;
  const db = client.db("snaplink_db");
  const collection = db.collection("images");

  const result = await collection.findOneAndUpdate(
    { shortCode: shortCode },
    { $inc: { clicks: 1 } }, 
    { returnDocument: "after" } 
  );

  if (result) {

    const doc = result.value || result;

    if (doc?.originalUrl) {
      redirect(doc.originalUrl);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500">
        404 - Link Not Found
      </h1>
    </div>
  );
}