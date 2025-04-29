"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok){
      router.push('/auth/login');
    }
    if (!response.ok){
      setMessage(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white font-[Montserrat]">
      <div className="p-8 bg-gray-800 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 my-2 bg-gray-700 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 my-2 bg-gray-700 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 my-2 bg-gray-700 rounded"
          />
          <button type="submit" className="mt-4 p-2 bg-blue-600 hover:bg-blue-500 rounded hover:cursor-pointer hover:scale-105 transition duration-300">
            Sign Up
          </button>
        </form>
        {message && <p className="text-center mt-4 font text-red-500">{message}</p>}
      </div>
    </div>
  );
}
