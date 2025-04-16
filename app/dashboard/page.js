'use client';

import { useEffect, useState } from "react";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchSessionAndData = async () => {
      try {
        const sessionRes = await fetch("/api/session");
        const sessionData = await sessionRes.json();
        console.log("Session:", sessionData);

        if (!sessionRes.ok || !sessionData.email) {
          setUserEmail("");
          return;
        }

        const email = sessionData.email;
        setUserEmail(email);

        const res = await fetch("/api/dashboard");
        const data = await res.json();
        console.log("Subscriptions:", data);

        const userSubscriptions = data.filter(sub => sub.registered_email === email);

        let totalMonthly = 0;
        let totalYearly = 0;
        userSubscriptions.forEach(sub => {
          if (sub.frequency === "monthly") {
            totalMonthly += sub.amount;
            totalYearly += sub.amount * 12;
          } else if (sub.frequency === "yearly") {
            totalYearly += sub.amount;
          }
        });

        setSubscriptions(userSubscriptions);
        setMonthlyTotal(totalMonthly);
        setYearlyTotal(totalYearly);

        if (Notification.permission !== "granted") {
          Notification.requestPermission();
        }

        checkRenewalNotifications(userSubscriptions);

      } catch (error) {
        console.error("Error fetching session/subscriptions:", error);
      }
    };

    fetchSessionAndData();
  }, []);

  const checkRenewalNotifications = (subscriptions) => {
    const today = new Date();
    const notificationDays = [10, 5, 3, 2, 1, 0];

    subscriptions.forEach((sub) => {
      const renewalDate = new Date(sub.next_payment_date);
      const diffDays = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));

      if (notificationDays.includes(diffDays)) {
        sendNotification(sub.name, sub.amount, diffDays);
      }
    });
  };

  const sendNotification = (serviceName, amount, daysRemaining) => {
    if (Notification.permission === "granted") {
      const message =
        daysRemaining === 0
          ? `Your ${serviceName} subscription is renewing today! Cost: ₹${amount.toFixed(2)}`
          : `Reminder: Your ${serviceName} subscription renews in ${daysRemaining} days. Cost: ₹${amount.toFixed(2)}`;

      new Notification("Subscription Renewal Reminder", {
        body: message,
        icon: "/subscription-icon.png",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 font-[Montserrat]">
      <h1 className="text-3xl font-bold mb-6">Subscription Details</h1>

      {!userEmail ? (
        <p className="text-red-500">You need to log in to see your subscriptions.</p>
      ) : (
        <>
          <div className="space-y-4">
            {subscriptions.length === 0 ? (
              <p className="text-gray-500">No subscriptions found for {userEmail}.</p>
            ) : (
              subscriptions.map((sub) => (
                <div key={sub.subscription_id} className="p-4 border rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">{sub.name}</h2>
                  <p><strong>Email Used for Subscription:</strong> {sub.registered_email}</p>
                  <p><strong>Amount:</strong> ₹{sub.amount.toFixed(2)}</p>
                  <p><strong>Payment Frequency:</strong> {sub.frequency}</p>
                  <p><strong>Next Payment Date:</strong> {new Date(sub.next_payment_date).toDateString()}</p>
                </div>
              ))
            )}
          </div>
          {subscriptions.length > 0 && (
            <div className="mt-8 p-6 bg-gray-500 rounded-lg shadow-md text-white">
              <h2 className="text-2xl font-bold">Expense Summary</h2>
              <p><strong>Total Monthly Spending:</strong> ₹{monthlyTotal.toFixed(2)}</p>
              <p><strong>Total Yearly Spending:</strong> ₹{yearlyTotal.toFixed(2)}</p>
            </div>
          )}
        </>
      )}
      {subscriptions.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => downloadCSV(subscriptions)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:cursor-pointer hover:bg-blue-500 transition duration-300"
          >
            Download as CSV
          </button>
        </div>
      )}
    </div>
  );
};

const downloadCSV = (subscriptions) => {
  const headers = [
    "Service Name",
    "Email Used",
    "Amount",
    "Frequency",
    "Next Payment Date"
  ];

  const rows = subscriptions.map(sub => [
    sub.name,
    sub.registered_email,
    sub.amount,
    sub.frequency,
    new Date(sub.next_payment_date).toLocaleDateString()
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "subscriptions.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default Subscriptions;
