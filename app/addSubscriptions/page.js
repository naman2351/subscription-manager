"use client";
import { useRouter } from "next/navigation";

export default function addSubscriptions() {
    const [formData, setFormData] = useState({
        name: "",
        registered_email: "",
        amount: "",
        frequency: "",
        nextPaymentDate: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value })
    };

    const handleSubmit = async (e) => {
        if (!Object.values(formData).every((value) => value !== "")){
            alert("Please fill out all fields before submitting.");
            return;
        }
        e.preventDefault();
        const response = await fetch("/api/subscriptions", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
    }

}