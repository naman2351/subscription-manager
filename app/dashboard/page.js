'use client';

import { useEffect, useState } from "react";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }

    const fetchData = async () => {
      try {
        const res = await fetch("/api/subscriptions");
        const data = await res.json();

        const userSubscriptions = data.filter(sub => sub.registeredUserEmail === email);

        let totalMonthly = 0;
        let totalYearly = 0;
        userSubscriptions.forEach(sub => {
          if (sub.interval === "monthly") {
            totalMonthly += sub.amount;
            totalYearly += sub.yearly_cost;
          } else {
            totalYearly += sub.yearly_cost;
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
        console.error("Error fetching subscriptions:", error);
      }
    };

    if (email) {
      fetchData();
    }
  }, []);

  const checkRenewalNotifications = (subscriptions) => {
    const today = new Date();
    const notificationDays = [10, 5, 3, 2, 1, 0];

    subscriptions.forEach((sub) => {
      sub.payment_dates.forEach((date) => {
        const renewalDate = new Date(date);
        const diffDays = Math.ceil((renewalDate - today) / (1000 * 60 * 60 * 24));

        if (notificationDays.includes(diffDays)) {
          sendNotification(sub.name, sub.amount, diffDays);
        }
      });
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
    <div className="container mx-auto p-6">
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
                <div key={sub.id} className="p-4 border rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold">{sub.name}</h2>
                  <p><strong>Email Used for Subscription:</strong> {sub.email}</p>
                  <p><strong>Amount:</strong> ₹{sub.amount.toFixed(2)}</p>
                  <p><strong>Payment Interval:</strong> {sub.interval}</p>
                  <p><strong>Payment Dates:</strong> {sub.payment_dates.join(", ")}</p>
                  <p><strong>Yearly Cost:</strong> ₹{sub.yearly_cost.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
          {subscriptions.length > 0 && (
            <div className="mt-8 p-6 bg-gray-500 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Expense Summary</h2>
              <p><strong>Total Monthly Spending:</strong> ₹{monthlyTotal.toFixed(2)}</p>
              <p><strong>Total Yearly Spending:</strong> ₹{yearlyTotal.toFixed(2)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Subscriptions;
