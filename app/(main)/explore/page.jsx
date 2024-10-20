"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, ShoppingBag, BookmarkPlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ExplorePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    fetchProducts("laptop");
  }, []);

  const fetchProducts = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();

      const combinedProducts = [
        ...data.amazon.map((p) => ({ ...p, source: "Amazon" })),
        ...data.snapdeal.map((p) => ({ ...p, source: "Snapdeal" })),
        ...data.paytmMall.map((p) => ({ ...p, source: "PaytmMall" })),
      ];

      setAllProducts(combinedProducts);
      setDisplayedProducts(combinedProducts);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleSave = async (product) => {
    try {
      // Assuming you have a way to get the user ID, replace 'user123' with the actual user ID
      const userId = "user123";
      const response = await fetch(`/api/saved/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to save product");
      // You might want to show a success message to the user here
    } catch (err) {
      console.error("Error saving product:", err);
      // You might want to show an error message to the user here
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ShoppingBag className="w-12 h-12 text-indigo-600 animate-bounce" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Explore Products
        </h1>
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              type="search"
              placeholder="Search for products"
              className="flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col h-[400px] overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute px-2 py-1 text-xs font-semibold text-gray-700 bg-white rounded-full top-2 right-2">
                  {product.source}
                </div>
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{product.price}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {typeof product.rating === "number"
                        ? product.rating.toFixed(1)
                        : product.rating}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => window.open(product.url, "_blank")}
                    className="flex-1"
                  >
                    Visit
                  </Button>
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={() => handleSave(product)}
                  >
                    <BookmarkPlus className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
