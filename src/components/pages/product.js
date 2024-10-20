import Image from "next/image";
import Link from "next/link";
import ReactStars from "react-rating-stars-component";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/loader";
import { getData } from "@/utils/apiCalling";

const SelectedProduct = ({ productId }) => {
    const { data: productData, error, isLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getData(`products/${productId}`),
    });
    if (isLoading) return <div className="h-[calc(100vh-100px)] w-screen flex items-center justify-center"><Loader /></div>;
    if (error) return <div>Error loading product data</div>;

    return (
        <div className="container mx-auto my-10   w-full max-w-[1440px] lg:px-8 px-4">
            <div className="text-sm mb-4 text-gray-600">
                <Link href="/" className="hover:underline"><b>Home</b></Link> &gt;{" "}
                <b>{productData.title}</b>
            </div>

            <div className="grid grid-cols-1 border border-solid border-gray-300 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <Image
                        width={800}
                        height={800}
                        src={productData.thumbnail}
                        alt={productData.title}
                        className="w-full rounded-lg border mb-4 object-cover"
                    />
                    {productData.images.length > 1 && (
                        <div className="grid  grid-cols-3 gap-2">
                            {productData.images.map((img, index) => (
                                <Image
                                    width={400}
                                    height={400}
                                    key={index}
                                    src={img}
                                    alt={`${productData.title} ${index + 1}`}
                                    className="w-full h-28 object-cover rounded-lg border border-gray-300"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl text-gray-700 font-semibold mb-2">{productData.title}</h1>
                    <p className="text-gray-500 mb-4">{productData.brand}</p>

                    <p className="text-xl text-red-500 mb-4">
                        ${productData.price}{" "}
                        <span className="text-sm text-gray-500 line-through">
                            ${(productData.price * (1 + productData.discountPercentage)).toFixed(2)}
                        </span>
                    </p>

                    <div className="mb-4 flex items-center">
                        <ReactStars
                            count={5}
                            value={productData.rating}
                            size={24}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <span className="text-gray-500 text-sm ml-2">
                            ({productData.reviews.length} reviews)
                        </span>
                    </div>

                    <p className="text-gray-600 mb-4">{productData.description}</p>

                    <p className="text-green-600 font-semibold mb-4">
                        {productData.availabilityStatus}
                    </p>

                    <p className="text-gray-600 mb-4">
                        <b> Shipping</b>: {productData.shippingInformation}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <b>Warranty</b>: {productData.warrantyInformation}
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 mt-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-600">Customer Reviews</h2>
                {productData.reviews.map((review, index) => (
                    <div key={index} className="mb-4 border-b pb-4">
                        <ReactStars
                            count={5}
                            value={review.rating}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-gray-400 text-sm">
                            - {review.reviewerName}, {new Date(review.date).toDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default SelectedProduct