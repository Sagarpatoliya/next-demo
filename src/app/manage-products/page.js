"use client"
import { postData } from "@/utils/apiCalling";
import ProductForm from "@/components/ui/manageProduct";
import toast from "react-hot-toast";

const ProductManagePage = () => {
    const submitHandler = async (data) => {
        try {
            const res = await postData('/products/add', data)
            toast.success('Product Added Successfully')
            return res
        } catch (err) {
            console.log(err, "<-----error in add data")
        }
    };

    return (
        <div>
            <ProductForm onSubmit={submitHandler} />
        </div>
    );
};

export default ProductManagePage;
