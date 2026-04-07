import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Generator without the extra bullshit",
  description: "QR code generator without ads, tracking. It's free and open source. Just paste your URL and get the QR code. No bullshit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/w95fa"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
