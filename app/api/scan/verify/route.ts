import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockData";

export async function POST(request: NextRequest) {
  try {
    const { binId } = await request.json();

    if (!binId) {
      return NextResponse.json(
        { error: "Bin ID is required" },
        { status: 400 }
      );
    }

    const bin = await mockDb.getBinByIdentifier(binId);

    if (!bin) {
      return NextResponse.json(
        { error: "Bin not found or inactive" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        bin: {
          binId: bin.binId,
          location: bin.location,
          acceptedTypes: bin.acceptedTypes,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying bin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
