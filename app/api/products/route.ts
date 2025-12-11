import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const active = searchParams.get("active");

    const products = await mockDb.listProducts({
      category,
      active: active !== null ? active === "true" : null,
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
