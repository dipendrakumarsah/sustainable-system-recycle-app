import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await mockDb.getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const transactions = (await mockDb.listTransactionsByUser(userId)).slice(
      0,
      50
    );

    return NextResponse.json(
      {
        walletBalance: user.walletBalance,
        transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
