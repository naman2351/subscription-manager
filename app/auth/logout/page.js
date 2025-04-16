"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");

    const signout = async () => {
        console.log("check")
        const res = await fetch('/api/logout', {
            method: "POST",
        });
        const response  = await res.json();
        console.log(response);
        if (res.ok){
            setMessage(response.message);
            router.push('/');
        } else {
            setError(response.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white font-[Montserrat]">
            <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-md">
                <h2 className="text-xl font-bold mb-4">Are you sure you wish to log out?</h2>
                <button
                className="bg-gray-700 rounded-md p-4 m-2 w-48 hover:cursor-pointer hover:bg-red-600 transition duration-300"
                onClick={signout}
                >
                    Yes I'm Sure
                </button>
                <button
                className="bg-gray-700 rounded-md p-4 m-2 w-48 hover:cursor-pointer hover:bg-green-600 transition duration-300"
                onClick={()=>router.push('/dashboard')}
                >
                    No, Take me Back
                </button>
                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
}