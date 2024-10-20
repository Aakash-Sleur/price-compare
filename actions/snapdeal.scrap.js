// pages/api/fetchSnapdeal.js
import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchDetailsSnapdeal(product) {
  const searchUrl = `https://www.snapdeal.com/search?keyword=${encodeURIComponent(
    product
  )}`;
  try {
    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.3 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    const $ = cheerio.load(data);
    const products = [];

    $(".product-tuple-listing").each((index, element) => {
      const name = $(element).find(".product-title").text();
      const price = $(element).find(".product-price").text();
      const ratingStyle = $(element).find(".filled-stars").attr("style");
      const link = $(element).find(".dp-widget-link").attr("href");
      const image = $(element).find("img").attr("src");

      const rating = ratingStyle
        ? ratingStyle.split(":")[1].trim()
        : "No rating";

      if (name && price && link && image) {
        products.push({
          name: name.trim(),
          price: price.trim(),
          rating: rating,
          url: `${link}`,
          image: image,
        });
      }
    });

    return products;
  } catch (error) {
    console.error("Error fetching Snapdeal data:", error);
    return [];
  }
}

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  const products = await fetchDetailsSnapdeal(query);
  res.status(200).json(products);
}
