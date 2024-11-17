import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/navbar/Nav";
import Sidebar from "@/components/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "WhatBytes",
  description: "WhatBytes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`w-screen h-full flex flex-col`}
      >
        <Nav />
        <div className="flex h-full">
          <Sidebar />
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}