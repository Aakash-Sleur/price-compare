import { UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { TrendingUp } from "lucide-react";

const Header = async () => {
  const currUser = await currentUser();
  const isLoggedIn = !!currUser;
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <TrendingUp className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold text-gray-900">PriceCompare</span>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/explore" className="text-gray-500 hover:text-gray-900">
            Explore
          </Link>
          <Link href="/saved" className="text-gray-500 hover:text-gray-900">
            Saved
          </Link>
          {isLoggedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
