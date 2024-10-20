"use client"
import ProductForm from "@/components/ui/manageProduct";
import { getData, putData } from "@/utils/apiCalling";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";

const ProductManagePage = () => {
    const { id } = useParams()

    const { data: productData, error, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getData(`products/${id}`),
    });
    
    if (isLoading) return <div className="h-[calc(100vh-100px)] w-screen flex items-center justify-center"><Loader /></div>;
    if (error) return <div>Error loading product data</div>;
    const submitHandler = async (data) => {
        try {
            const res = await putData(`/products/${id}`, data)
        } catch (err) {
            console.log(err, "<-----error in add data")
        }
    };

    return (
        <div>
            <ProductForm initialValues={productData} onSubmit={submitHandler} id={id} />
        </div>
    );
};

export default ProductManagePage;
