import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mockData";
import { ProductInput } from "@/lib/models/Product";
import { BinInput } from "@/lib/models/Bin";

// Get all products (admin view)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'products' or 'bins'

    if (type === "bins") {
      const bins = await mockDb.listBins();
      return NextResponse.json({ bins }, { status: 200 });
    }

    const products = await mockDb.listProducts();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create new product or bin
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body; // 'product' or 'bin'

    if (type === "product") {
      const productData: ProductInput = body.data;
      const product = await mockDb.createProduct(productData);
      return NextResponse.json(
        {
          message: "Product created successfully",
          productId: product._id,
        },
        { status: 201 }
      );
    }

    if (type === "bin") {
      const binData: BinInput = body.data;
      const bin = await mockDb.createBin(binData);
      return NextResponse.json(
        {
          message: "Bin created successfully",
          binId: bin._id,
          binIdentifier: bin.binId,
          qrCode: bin.qrCode,
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update product or bin
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data } = body;

    if (type === "product") {
      await mockDb.updateProduct(id, data);
      return NextResponse.json(
        { message: "Product updated successfully" },
        { status: 200 }
      );
    }

    if (type === "bin") {
      await mockDb.updateBin(id, data);
      return NextResponse.json(
        { message: "Bin updated successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error updating resource:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete product or bin
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!id || !type) {
      return NextResponse.json(
        { error: "Type and ID are required" },
        { status: 400 }
      );
    }

    if (type === "product") {
      await mockDb.deleteProduct(id);
      return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
      );
    }

    if (type === "bin") {
      await mockDb.deleteBin(id);
      return NextResponse.json(
        { message: "Bin deleted successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
