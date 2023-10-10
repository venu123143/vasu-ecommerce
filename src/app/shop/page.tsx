"use client"
import { CSSProperties, useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store';
import { addToCart } from '@/redux/features/auth-slice';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import { SyncLoader } from 'react-spinners';

const ShopPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { value } = useSelector((state: RootState) => state.auth)

    const currentUser = typeof window !== 'undefined' ? localStorage.getItem("currentUser") : null;


    const handleAddToCart = (product: any) => {
        if (currentUser !== null) {
            dispatch(addToCart(product));
            toast.success("item added to cart")
        }
        else {
            router.push("/login")
        }
        console.log("empty", product);
    };


    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 8;

    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
    const offset = pageNumber * productsPerPage;

    const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/products?limit=100");
                if (res) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products);
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false)
            }
        }
        fetchData();
    }, []);

    const filterProducts = (category: string, searchValue: string) => {
        if (category === '' && searchValue === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => {
                const categoryLower = product.category.toLowerCase();
                const titleLower = product.title.toLowerCase();
                const categoryMatch = category === '' || categoryLower === category.toLowerCase();
                const searchValueMatch = searchValue === '' || titleLower.includes(searchValue.toLowerCase());
                return categoryMatch && searchValueMatch;
            });
            setFilteredProducts(filtered);
        }
        setCategoryFilter(category);
    };


    const handlePriceSort = (option: string) => {
        setSortOption(option);
        const sortedProducts = [...filteredProducts];
        if (option === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'highToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(option === '' ? products : sortedProducts);
    };

    const categoriesArray = [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
    ]
    useEffect(() => {
        filterProducts(categoryFilter, value);
    }, [value]);
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
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Shop</h1>

            {/* Category Filter */}
            <div className='flex gap-10'>
                <div className="mb-4">
                    <label className="font-semibold">Filter by Category:</label>
                    <select
                        value={categoryFilter}
                        onChange={(e) => filterProducts(e.target.value, value)}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">All Categories</option>
                        {categoriesArray.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Sort by Price:</label>
                    <div>
                        <button
                            onClick={() => handlePriceSort('lowToHigh')}
                            className={`mr-2 p-2 rounded-lg ${sortOption === 'lowToHigh' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            Low to High
                        </button>
                        <button
                            onClick={() => handlePriceSort('highToLow')}
                            className={`mr-2 p-2 rounded-lg ${sortOption === 'highToLow' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            High to Low
                        </button>
                        <button
                            onClick={() => handlePriceSort('')}
                            className={`mr-2 p-2 rounded-lg ${sortOption === '' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            No filter
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product: any) => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer">
                        <Link href={`/shop/${product.id}`}>
                            <img src={product.thumbnail} alt={product.title} className="w-full h-56 object-cover" />
                        </Link>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
                            </h3>
                            <p className="text-gray-600 mb-2">
                                {product.description.length > 20 ? `${product.description.substring(0, 20)}...` : product.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full"

                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="flex justify-center mt-16"
                pageClassName="inline-block mx-1"
                pageLinkClassName="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
                activeClassName="bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                previousClassName="inline-block mx-1 font-bold"
                nextClassName="inline-block mx-1 font-bold"
                previousLinkClassName="text-blue-500"
                nextLinkClassName="text-blue-500"
            />

        </div>
    );
};

export default ShopPage;

