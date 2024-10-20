"use client"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { postData } from "@/utils/apiCalling";
import Link from "next/link";

const ProductForm = ({ initialValues = {}, onSubmit, id = '' }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            brand: "",
            discountPercentage: 0,
        },
    });

    useEffect(() => {
        if (initialValues) {
            setValue("title", initialValues.title);
            setValue("description", initialValues.description);
            setValue("price", initialValues.price);
            setValue("brand", initialValues.brand);
            setValue("discountPercentage", initialValues.discountPercentage);
        }
    }, [initialValues, setValue]);

    const submitHandler = async (data) => {
        onSubmit(data)
    };

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white p-6 rounded-lg shadow-lg space-y-4 "
        >
            <div className="mt-[70px]">
                <div className="text-sm mb-4 text-gray-600">
                    <Link href="/" className="hover:underline"><b>Home</b></Link> &gt;{" "}
                    <b>{initialValues?.title ?? "Add Product"}</b>
                </div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5"
                    placeholder="Enter product title"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    {...register("description", { required: "Description is required" })}
                    className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5"
                    placeholder="Enter product description"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                    Price ($)
                </label>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        validate: value => value > 0 || "Price must be greater than 0"
                    })}
                    className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5"
                    placeholder="Enter product price"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="brand">
                    Brand
                </label>
                <input
                    id="brand"
                    {...register("brand", { required: "Brand is required" })}
                    className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5"
                    placeholder="Enter product brand"
                />
                {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
            </div>

            {/* Discount Percentage Field */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="discountPercentage">
                    Discount Percentage (%)
                </label>
                <input
                    id="discountPercentage"
                    type="number"
                    step="0.01"
                    {...register("discountPercentage", {
                        required: "Discount percentage is required",
                        valueAsNumber: true,
                        validate: value => value >= 0 || "Discount percentage must be 0 or more"
                    })}
                    className="bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full  p-2.5"
                    placeholder="Enter discount percentage"
                />
                {errors.discountPercentage && (
                    <p className="text-red-500 text-sm">{errors.discountPercentage.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {id ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
};

export default ProductForm;
