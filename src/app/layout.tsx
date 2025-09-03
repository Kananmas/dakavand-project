"use client"

import "./globals.css";
import { UserProvider } from "@/context/User/user.provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
