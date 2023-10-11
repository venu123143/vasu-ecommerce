"use client"
import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { AiFillStar } from "react-icons/ai"
import { SyncLoader } from "react-spinners";
import { addToCart } from "@/redux/features/auth-slice";
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";

const ProductPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [product, setProduct] = useState<any>({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setIsLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        width: 380,
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: 'translateX(-50%, -50%)'
    };
    if (isLoading) {
        return (
            <SyncLoader
                color="#361AE3"
                loading={true}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        );
    }
    const currentUser = localStorage.getItem("currentUser")
    const handleAddToCart = (product: any) => {
        if (currentUser !== null) {
            dispatch(addToCart(product));
            toast.success("item added to cart")
        }
        else {
            router.push("/login")
        }
    };
    return (
        <div className="container mx-auto mt-4 p-4">
            <Link href="/shop">
                <AiOutlineArrowLeft className="cursor-pointer hover:text-blue-500 h-[20px] w-[35px]" />
            </Link>

            <div className="flex justify-between">
                <div className="mr-10 h-[300px ] w-[300px]">
                    <img
                        src={product.images[currentImageIndex]}
                        alt={`${product.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-auto"
                    />
                </div>
                <div className="w-1/2 p-4">
                    <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="mt-4">
                        <p className="text-xl font-semibold text-blue-500">
                            ${product.price}
                        </p>
                        <p className="text-sm text-gray-500">
                            {product.discountPercentage}% off
                        </p>
                        <p className="text-yellow-500">Rating:</p>
                        <div className="ml-2 flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span key={index} className="text-yellow-500">
                                    {index < Math.round(product.rating) ? <AiFillStar /> : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleAddToCart(product)}

                    >

                        AddToCart
                    </button>
                    <div className="mt-4">
                        <p className="text-gray-600">In Stock: {product.stock} units</p>
                        <p className="text-gray-600">Brand: {product.brand}</p>
                        <p className="text-gray-600">Category: {product.category}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold">Product Images:</h2>
                <div className="flex mt-4">
                    {product.images.map((image: any, index: number) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                            className={`w-[100px] h-[100px] mr-4 cursor-pointer ${index === currentImageIndex ? 'border border-blue-500' : ''
                                }`}
                            onMouseOver={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProductPage;
