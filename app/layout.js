import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-5 bg-gray-100">
        {children}
      </body>
    </html>
  );
}
