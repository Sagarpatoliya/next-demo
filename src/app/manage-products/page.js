"use client"
import { postData } from "@/utils/apiCalling";
import ProductForm from "@/components/ui/manageProduct";

const ProductManagePage = ({ initialValues = {}, onSubmit }) => {

    const submitHandler = async (data) => {
        try {
            const res = await postData('/products/add', data)
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
