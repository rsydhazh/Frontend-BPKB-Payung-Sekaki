import "./globals.css";

export const metadata = {
  title: "Web Payung Sekaki",
  description: "Website Resmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-800">
        {children}
      </body>
    </html>
  );
}