// app/api/search/route.js

import { NextResponse } from "next/server";
import { fetchDetailsAmazon } from "@/actions/amazon.scrap";
import { fetchDetailsSnapdeal } from "@/actions/snapdeal.scrap";
import { fetchDetailsPaytmMall } from "@/actions/paytm.scrap";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const [amazonProducts, snapdealProducts, paytmMallProducts] =
      await Promise.all([
        fetchDetailsAmazon(query),
        fetchDetailsSnapdeal(query),
        fetchDetailsPaytmMall(query),
      ]);

    return NextResponse.json({
      amazon: amazonProducts,
      snapdeal: snapdealProducts,
      paytmMall: paytmMallProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching products" },
      { status: 500 }
    );
  }
}
