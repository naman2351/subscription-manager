"use client";
import { useState } from "react";

export default function addSubscriptions() {
    const [formData, setFormData] = useState({
        name: "",
        registered_email: "",
        amount: "",
        frequency: "",
        nextPaymentDate: "",
        email: sessionStorage.getItem("userEmail"),
    });

    const [message, setMessage] = useState("");
    const [error, seterror] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        if (!Object.values(formData).every((value) => value !== "")) {
            alert("Please fill out all fields before submitting.");
            return;
        }
        e.preventDefault();
        const response = await fetch("/api/subscriptions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setMessage(response.message);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white font-[Montserrat]">
            <div className="p-8 bg-gray-800 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold text-center">Add Your Subscription</h2>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name of Service"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="p-2 my-2 bg-gray-700 rounded"
                    ></input>
                    <input
                        type="text"
                        name="registered_email"
                        placeholder="Email used for registration"
                        value={formData.registered_email}
                        onChange={handleChange}
                        required
                        className="p-2 my-2 bg-gray-700 rounded"
                    ></input>
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount per renewal"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="p-2 my-2 bg-gray-700 rounded"
                    ></input>
                    <select
                        className="p-2 my-2 bg-gray-700 rounded"
                        id="frequency"
                        name="frequency"
                        placeholder="Select frequency of renewal"
                        value={formData.frequency}
                        onChange={handleChange}>
                        <option value="" disabled>Select frequency of renewal</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="biannually">Biannually</option>
                        <option value="annually">Annually</option>
                    </select>
                    <input
                        type="date"
                        name="nextPaymentDate"
                        placeholder="Date of next payment"
                        value={formData.nextPaymentDate}
                        onChange={handleChange}
                        required
                        className="p-2 my-2 bg-gray-700 rounded"
                    ></input>
                    <button type="submit" className="mt-4 p-2 bg-blue-600 hover:bg-blue-500 rounded hover:cursor-pointer hover:scale-105 transition duration-300">
                        Submit
                    </button>
                </form>
                {message && <p className="text-center mt-4">{message}</p>}
            </div>
        </div>
    )
}