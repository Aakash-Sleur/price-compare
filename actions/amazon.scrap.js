// pages/api/fetchAmazon.js
import axios from "axios";
import * as cheerio from "cheerio"; // Ensure you use 'cheerio' (lowercase)

export async function fetchDetailsAmazon(product) {
  const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(product)}`;
  try {
    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    const $ = cheerio.load(data);
    const products = [];

    $(".sg-col-inner").each((index, element) => {
      const name = $(element)
        .find(".a-size-medium.a-color-base.a-text-normal")
        .text()
        .trim();
      const priceWhole = $(element).find(".a-price-whole").text().trim();
      const priceFraction = $(element).find(".a-price-fraction").text().trim();
      const rating = $(element).find(".a-icon-alt").text().trim();
      const link = $(element).find(".a-link-normal.s-no-outline").attr("href");
      const image = $(element).find(".s-image").attr("src");

      // Construct full price if both whole and fraction parts are available
      const price =
        priceWhole && priceFraction ? `₹${priceWhole}${priceFraction}` : null;

      if (name && price && link && image) {
        products.push({
          name,
          price,
          rating: rating || "No rating", // Default to "No rating" if not available
          url: `https://www.amazon.in${link}`,
          image,
        });
      }
    });

    return products;
  } catch (error) {
    console.error("Error fetching Amazon data:", error);
    return [];
  }
}

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  const products = await fetchDetailsAmazon(query);
  res.status(200).json(products);
}
