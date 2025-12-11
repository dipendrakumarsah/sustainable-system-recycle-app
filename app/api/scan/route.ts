import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockData";

export async function POST(request: NextRequest) {
  try {
    const { binId, productId, userId } = await request.json();

    if (!binId || !productId || !userId) {
      return NextResponse.json(
        { error: "Bin ID, Product ID, and User ID are required" },
        { status: 400 }
      );
    }

    const bin = await mockDb.getBinByIdentifier(binId);
    if (!bin) {
      return NextResponse.json(
        { error: "Invalid or inactive bin" },
        { status: 404 }
      );
    }

    const product = await mockDb.getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Invalid or inactive product" },
        { status: 404 }
      );
    }

    const user = await mockDb.getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify bin accepts this recyclable type
    if (!bin.acceptedTypes.includes(product.recyclableType)) {
      return NextResponse.json(
        {
          error: `This bin does not accept ${product.recyclableType} items`,
          acceptedTypes: bin.acceptedTypes,
        },
        { status: 400 }
      );
    }

    await mockDb.addTransaction({
      userId: user._id!,
      productId: product._id!,
      binId: bin._id!,
      type: "reward",
      amount: product.rewardAmount,
      description: `Reward for recycling ${product.name}`,
      status: "completed",
      metadata: {
        productName: product.name,
        binLocation: bin.location.name,
        recyclableType: product.recyclableType,
      },
      createdAt: new Date(),
    });

    await mockDb.creditWallet(userId, product.rewardAmount);

    return NextResponse.json(
      {
        message: "Disposal verified successfully",
        reward: product.rewardAmount,
        binLocation: bin.location.name,
        productName: product.name,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing disposal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
