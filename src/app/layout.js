"use client"
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";



export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <html lang="en">
          <body
            className={` antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </html>
      </Provider>
    </QueryClientProvider>
  );
}
