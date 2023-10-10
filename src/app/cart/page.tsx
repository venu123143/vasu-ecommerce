"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/features/auth-slice';
import { RootState } from '@/redux/store';
import Link from 'next/link';

const Cart = () => {
    const { cart } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id: number) => {
        dispatch(removeFromCart({ id }));
    };

    const cartTotal = cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

    if (typeof window !== 'undefined' ) {
        var userIsAuthenticated = localStorage.getItem("currentUser") === null

        if (userIsAuthenticated) {
            return (
                <div className="flex flex-col gap-4 justify-center items-center text-center">
                    <h1 className="text-xl font-semibold mb-4">
                        Please log in to view your cart.
                    </h1>
                    <Link
                        href="/login"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full inline-block text-center text-lg font-semibold transition duration-300"
                    >
                        Go to Login
                    </Link>
                </div>
            )
        }
    }
    return (
        <div>
            {cart.length === 0 ? (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-500">Looks like you havent added any items to your cart yet.</p>
                    <div className="mt-6">
                        <Link href="/shop" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cart.map((item: any) => (
                                    <li key={item.id} className="flex py-6 cart-item">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <h4>{item.title}</h4>
                                                    </h3>
                                                    <p className="ml-4 mr-5">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm mr-4">
                                                <p className="text-gray-500">Qty {item.quantity}</p>
                                                <div className="flex">
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <p className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</p>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or
                                <Link href="/shop" type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
