import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-5 bg-gray-100 bg-gradient-to-t from-gray-100 to-slate-300 bg-[length:100%_350px] bg-no-repeat">
        {children}
      </body>
    </html>
  );
}
