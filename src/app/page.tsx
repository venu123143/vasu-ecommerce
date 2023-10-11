"use client";
// import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic'

export const DynamicHeader = dynamic(() => import('../components/Navbar'), {
  ssr: false,
})
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from "react"
const HomePage = () => {
  const [products, setProducts] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://fakestoreapi.com/products?limit=5")
      setProducts(res.data);
      return res.data
    }
    fetchData()
  }, [])


  return (
    <div>
      <DynamicHeader />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold mb-4">Welcome to MyShop</h1>
          <p className="text-lg mb-8">Discover the best deals and products.</p>
          <Link href="/shop" className="bg-gradient-to-r from-red-500  text-white py-2 px-6 rounded-full text-lg">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products && products?.map((product: any) => (
              <div key={product.id}  className="bg-white rounded-lg overflow-hidden shadow-md cursor-none">
                <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.title.length > 20
                    ? `${product.title.substring(0, 20)}...`
                    : product.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {product.description.length > 20
                      ? `${product.description.substring(0, 20)}...`
                      : product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
