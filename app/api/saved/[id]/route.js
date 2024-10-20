import { connectDB } from "@/lib/mongodb";
import savedModel from "@/models/saved.model";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const { id } = context.params; // Get the 'id' parameter from the folder path
    await connectDB();

    // Use the 'id' parameter to fetch a specific product if needed
    const savedProducts = await savedModel.find({ userId: id });

    if (savedProducts) {
      return NextResponse.json(savedProducts);
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching saved product:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function POST(request, context) {
  try {
    const { id } = context.params; // Get the 'id' parameter from the folder path

    const { name, price, url, image } = await request.json();
    console.log(name, price, url, image);
    await connectDB();

    const newSavedProduct = new savedModel({
      userId: id,
      name,
      price,
      url,
      image,
    });

    await newSavedProduct.save();

    return NextResponse.json(
      { message: "Product saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { message: "An error occurred while saving the product" },
      { status: 500 }
    );
  }
}
