import type { Metadata } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./lib/store/StoreProvider";



export const metadata: Metadata = {
  title: "Asset Management Tool",
  description: "By Lyktek.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased w-full h-screen overflow-hidden`}
      >
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
