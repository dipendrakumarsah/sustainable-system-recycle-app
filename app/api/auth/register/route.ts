import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mockDb } from "@/lib/mockData";
import { UserInput } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    const body: UserInput = await request.json();
    const { email, password, name, phone } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    const existingUser = await mockDb.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await mockDb.createUser({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
