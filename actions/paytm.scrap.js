// pages/api/fetchPaytmMall.js
import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchDetailsPaytmMall(product) {
  const searchUrl = `https://paytmmall.com/shop/search?q=${encodeURIComponent(
    product
  )}&from=organic&child_site_id=6&site_id=2`;

  try {
    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.3 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });

    const $ = cheerio.load(data);
    const products = [];

    // Iterate over each product container
    $("._2i1r").each((index, element) => {
      const name = $(element).find(".UGUy").text().trim();
      const price = $(element).find("._1kMS span").text().trim();
      const link = $(element).find("a").attr("href");
      const image = $(element).find("img").attr("src");

      // Ensure all necessary data is present
      if (name && price && link && image) {
        products.push({
          name,
          price,
          url: `https://paytmmall.com${link}`, // Construct full URL
          image: image.startsWith("http")
            ? image
            : `https://paytmmall.com${image}`, // Ensure image URL is valid
        });
      }
    });

    return products;
  } catch (error) {
    console.error("Error fetching Paytm Mall data:", error);
    return [];
  }
}

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  const products = await fetchDetailsPaytmMall(query);
  res.status(200).json(products);
}
