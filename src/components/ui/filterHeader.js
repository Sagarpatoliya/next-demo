"use client"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCatagory, setCategory, setSortBy } from "@/redux/slices/productsSlice";
import { getData } from "@/utils/apiCalling";
import { useQuery } from "@tanstack/react-query";

const FilterList = ({ setOrder, order }) => {
    const dispatch = useDispatch();
    const { category, sortBy, searchQuery, currentPage, } = useSelector((state) => state.products);
    const { data: categoryData, error, isLoading } = useQuery({
        queryKey: "category",
        queryFn: () => getData(`products/category-list`),
    });

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        dispatch(setCategory(selectedCategory));
        dispatch(fetchProductsByCatagory({ category: selectedCategory, page: currentPage, sortBy, order }));
    };

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        dispatch(setSortBy(selectedSort));
    };

    return (
        <div className="flex md:flex-row flex-col justify-between  gap-2 my-4">
            <select onChange={handleCategoryChange} value={category} className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full p-2.5">
                <option value="">All Categories</option>
                {categoryData?.map((item, index) => <option value={item} key={index} >{item}</option>)}
            </select>

            <select onChange={handleSortChange} value={sortBy} className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5">
                <option value="">Sort By</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
            </select>
            <select onChange={(e) => {
                setOrder(e.target.value)
                dispatch(fetchProductsByCatagory({ category, page: currentPage, sortBy, order: e.target.value }));
            }} value={order} className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5">
                <option value="">Order By</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
        </div>
    )
}
export default FilterList