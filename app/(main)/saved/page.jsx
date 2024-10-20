"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Trash2, ExternalLink } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function SavedPage() {
  const [savedProducts, setSavedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchSavedProducts();
    }
  }, [user]);

  const fetchSavedProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/saved/${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch saved products");
      const data = await response.json();
      setSavedProducts(data);
    } catch (err) {
      setError("Failed to fetch saved products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    // Optimistic update
    const previousProducts = savedProducts;
    setSavedProducts(
      savedProducts.filter((product) => product._id !== productId)
    );

    try {
      const response = await fetch(`/api/saved/${user.id}/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove product");
    } catch (err) {
      console.error("Error removing product:", err);
      // Revert the optimistic update
      setSavedProducts(previousProducts);
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        aria-live="polite"
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-screen text-red-600"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Saved Products
        </h1>
        {savedProducts.length === 0 ? (
          <p>No saved products yet.</p>
        ) : (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
          >
            {savedProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                role="listitem"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{parseFloat(product.price).toLocaleString("en-IN")}
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
                    <Link
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        View Product
                      </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600">
                          <Trash2 className="w-5 h-5 mr-2" />
                          Remove
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Remove Product</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove this product from your
                          saved list?
                        </DialogDescription>
                        <div className="flex justify-end gap-2 mt-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              onClick={() => handleRemove(product._id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Remove
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
