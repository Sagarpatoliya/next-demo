"use client";
import {  useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/input";
import { Filter, Search } from "lucide-react";
import { selectProducts } from "@/redux/selectors/productsSelector";
import { fetchProducts, setCategory, setSearchQuery, setSortBy } from "@/redux/slices/productsSlice"; 

export default function Header() {
    const dispatch = useDispatch();
    const { currentPage, searchQuery } = useSelector(selectProducts);

    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            dispatch(fetchProducts({ searchQuery, page: currentPage, limit: 10 }));
        }, 700);

        return () => clearTimeout(debounceTimeout.current);
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        const query = e.target.value;

        dispatch(setCategory("")); 
        dispatch(setSortBy("")); 
        dispatch(setSearchQuery(query)); 
    };

    return (
        <header className="flex border-b border-blue-400 backdrop-blur-2xl  fixed top-0 bg-blue-50  bg-opacity-35  font-[sans-serif] min-h-[70px] tracking-wide w-full z-50">
            <div className="flex items-center gap-5 max-w-[1440px] lg:px-8 px-4  mx-auto w-full">
                <div className="w-full flex items-center">
                    <Input
                        icon={Search}
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                        placeholder="Search for products"
                    />
                </div>
            </div>
        </header>
    );
}
