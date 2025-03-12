import "./globals.css";

export const metadata = {
  title: "Subscription Manager",
  description: "Manage your subscriptions easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
