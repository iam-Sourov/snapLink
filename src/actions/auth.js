
"use server";

import clientPromise from "@/lib/mongodb";

export async function registerUser(userData) {
  try {
    const client = await clientPromise;
    const db = client.db("snaplink_db");
    const users = db.collection("users");


    const existingUser = await users.findOne({ email: userData.email });
    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password, 
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    return { success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, error: "Registration failed" };
  }
}