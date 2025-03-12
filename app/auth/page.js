"use client";
import { useRouter } from "next/navigation";

export default function AuthSelection() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome to Subscription Manager</h1>
      <div className="space-y-4">
        <button
          onClick={() => router.push("/auth/signup")}
          className="bg-blue-500 text-white px-6 py-2 m-4 rounded shadow-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-green-500 text-white px-6 py-2 m-4 rounded shadow-md hover:bg-green-600 hover:cursor-pointer"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
