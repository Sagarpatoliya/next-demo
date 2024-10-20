"use client"
import Header from "@/components/ui/header";
import HomePage from "@/components/pages/home";

export default function Home({ children }) {
    return (
        <div className="w-full min-h-screen   bg-white">
            <Header />
            <div className="pt-[70px]">
                {children}
            </div>
        </div>
    );
}
