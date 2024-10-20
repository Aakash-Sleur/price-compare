import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck, Zap } from "lucide-react";
import Header from "@/components/custom/header";

export default async function Home() {
  return (
    <main className="flex-grow">
      <section className="py-20 text-white bg-indigo-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Compare Prices. Save Money.
            </h1>
            <p className="max-w-md mx-auto mt-3 text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
              Find the best deals across multiple stores in seconds.
            </p>
            <div className="max-w-xl mx-auto mt-10">
              <form className="sm:flex">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search for a product"
                    className="w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose PriceCompare?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We make shopping smarter and more efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Comprehensive Search
              </h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Search across multiple stores to find the best prices.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Reliable Information
              </h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Up-to-date prices and product information you can trust.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Fast Comparisons
              </h3>
              <p className="mt-2 text-base text-center text-gray-500">
                Get instant price comparisons and save time shopping.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
