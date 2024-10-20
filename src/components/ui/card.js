import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Delete, Edit, Eye, View, ViewIcon } from "lucide-react";
import { deleteData } from "@/utils/apiCalling";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Card = ({ product = {} }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDelate = async () => {
        try {
            const res = await deleteData(`products/${product?.id}`)
            toast.success("Product deleted successfully")
            setDropdownOpen(false)
        } catch (err) {
            console.log(err, "err")
        }
    }

    return (
        <div className="w-full relative max-w-md bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="flex justify-end px-4 pt-4">
                <button
                    id="dropdownButton"
                    className={`inline-block ${dropdownOpen ? "opacity-0" : "flex"} text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5`}
                    type="button"
                    onClick={toggleDropdown}
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                    >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>

                <div
                    id="dropdown"
                    ref={dropdownRef}
                    className={`z-10 absolute ${dropdownOpen ? "block" : "hidden"} text-base list-none bg-blue-50 divide-y divide-gray-100 rounded-lg shadow w-44 `}
                >
                    <ul className="py-2" aria-labelledby="dropdownButton">

                        <li>
                            <Link
                                href={`/${product?.id}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                                <Eye className="text-sm w-4 h-4" /> View
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/manage-products/${product?.id}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                                <Edit className="text-sm w-4 h-4" />  Edit
                            </Link>
                        </li>
                        <li>
                            <div
                                onClick={handleDelate}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 "
                            >
                                <Delete className="text-sm w-4 h-4" /> Delete
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center px-4 pb-10">
                <Image
                    width={100}
                    height={100}
                    className="w-24 h-24 mb-3 bg-white rounded-full shadow-lg object-cover"
                    src={product?.thumbnail}
                    alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900">{product?.title}</h5>
                <h5 className="mb-1 text-xl font-medium text-gray-800">Price: <b>{product?.price} $</b></h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {product?.description}
                </span>
            </div>
        </div>
    );
};

export default Card;
