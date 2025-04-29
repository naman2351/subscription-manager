"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="bg-[#212121] border-b-3 border-[#414141] sticky font-[Montserrat] p-6">
            <div className="flex place-content-between pl-8">
                <button
                    className="text-2xl font-bold hover:cursor-pointer hover:text-orange-400 transition duration-300 pr-3"
                    onClick={() => router.push('/')}
                >
                    Subsync
                </button>
                <div className="text-xl">
                    <button
                        className="hover:cursor-pointer hover:text-orange-400 transition duration-300 pr-3"
                        onClick={() => router.push('/dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className="hover:cursor-pointer hover:text-orange-400 transition duration-300 pl-3"
                        onClick={() => router.push('/addSubscriptions')}
                    >
                        Add Subscription
                    </button>
                </div>
                <div className="text-xl">
                    <button
                        className="hover:cursor-pointer hover:text-orange-400 transition duration-300 px-3"
                        onClick={() => router.push('/auth/signup')}
                    >
                        Sign Up
                    </button>
                    <button
                        className="hover:cursor-pointer hover:text-orange-400 transition duration-300 px-3"
                        onClick={() => router.push('/auth/login')}
                    >
                        Log In
                    </button>
                    <button
                        className="hover:cursor-pointer hover:text-orange-400 transition duration-300 px-3"
                        onClick={() => router.push('/auth/logout')}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};