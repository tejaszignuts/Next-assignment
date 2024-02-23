"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
