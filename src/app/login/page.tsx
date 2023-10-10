"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter()
    const { allUsers } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            var storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            }
        }
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = allUsers.find(
            (user: any) => user.email === formData.email && user.password === formData.password
        );
        if (user && typeof window !== 'undefined') {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            router.refresh()
            router.push("/")
        } else {
            toast.error('Invalid credentials');
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            var userIsAuthenticated = localStorage.getItem('currentUser') !== null;
            if (userIsAuthenticated) {
                router.push('/');
            }
        }

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
                        Login
                    </button>
                    <div className="mt-2 text-center">
                        <span className="text-gray-600">Dont have an account?</span>
                        <Link href="/signup" className="text-blue-500 ml-2 hover:underline">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
