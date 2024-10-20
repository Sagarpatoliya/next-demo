"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "@/redux/selectors/productsSelector";
import { fetchProductsByCatagory, setPage } from "@/redux/slices/productsSlice";
import ReactPaginate from "react-paginate";
import Loader from "../common/loader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterList from "../ui/filterHeader";
const { default: Card } = require("../ui/card");

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, status, totalCount, currentPage, category, sortBy, searchQuery } = useSelector(selectProducts);
    const [order, setOrder] = useState('')
    const router = useRouter()
    const limit = 10;

    useEffect(() => {
        if (searchQuery) {
            setOrder('')
        }
    }, [searchQuery])

    const handlePageChange = ({ selected }) => {
        const selectedPage = selected + 1;
        if (selectedPage !== currentPage) {
            dispatch(setPage(selectedPage));
        } else { return }
        dispatch(fetchProductsByCatagory({ category, page: selectedPage, sortBy, order }));
    };

    const pageCount = Math.ceil(totalCount / limit);

    return (
        <div className="py-4 w-full max-w-[1440px] lg:px-8 px-4 mx-auto">
            <FilterList setOrder={setOrder} order={order} />
            <div className="flex gap-3 items-center justify-between mb-4">
                <button className="bg-blue-500 flex gap-2 text-white px-4 py-2 rounded" onClick={() => router.push('/manage-products')}>
                    <Plus />  Add Product
                </button>
            </div>
            {status === "loading" ? <div className="h-[calc(100vh-100px)] w-screen flex items-center justify-center">
                <Loader />
            </div> :
                <><div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">

                    {products.map((product, index) => (
                        <div key={index} className="flex justify-center">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
                    <div className="flex justify-center mt-4 w-full max-w-screen overflow-x-scroll scrollbar-hidden">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            initialPage={currentPage - 1}
                            renderOnZeroPageCount={null}
                            containerClassName="flex items-center space-x-2"
                            pageClassName="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                            activeClassName="bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                            previousClassName="px-4 py-2 whitespace-nowrap border text-gray-700 hover:text-white rounded-md border-gray-300 bg-gray-200 hover:bg-gray-700"
                            nextClassName="px-4 whitespace-nowrap py-2 border text-gray-700 hover:text-white rounded-md border-gray-300 bg-gray-200 hover:bg-gray-700"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                    </div>
                </>
            }



        </div>
    );
};

export default HomePage;
