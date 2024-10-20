import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
      <Image
        src="/logo.svg"
        alt="Your Company Logo"
        width={64}
        height={64}
        className="mx-auto"
      />
      <div className="mx-auto mt-10">{children}</div>
    </div>
  );
}
