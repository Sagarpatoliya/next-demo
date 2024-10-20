"use client";

import SelectedProduct from "@/components/pages/product";
import { useParams } from "next/navigation";

const ProductPage = () => {
    const { product: productId } = useParams();
    return (
        <>
            <SelectedProduct productId={productId} />
        </>
    )
};

export default ProductPage;
