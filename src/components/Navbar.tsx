"use client"
import Link from 'next/link'
import { AiOutlineUser } from "react-icons/ai"
import { usePathname } from 'next/navigation'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { handleValueChange } from '@/redux/features/auth-slice'




const Navbar = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathName = usePathname()
    const [isHovered, setIsHovered] = useState(false);
    const [active, setActive] = useState(false)
    const { value } = useSelector((state: RootState) => state.auth)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string)

    console.log(value, "val");

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        toast.success("logged out")
        router.refresh()
    };
    window.addEventListener('scroll', () => {
        if (window.scrollY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })
    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(handleValueChange(value));
        router.push("/shop");
    };
    const handleInputChange = (e: any) => {
        console.log(e.target.value, "e");

        dispatch(handleValueChange(e.target.value));
    };
    return (

        <nav className={`${active === true ? "shadow-sm fixed top-0 left-0 w-full z-10 transition-all ease-in-out " : null} bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-4 w-full`}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/" className="text-white font-bold text-xl">MyShop</a>
                        <form className="ml-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="border-2 border-gray-300 rounded-md py-1 px-2"
                                value={value}
                                onChange={
                                    handleInputChange
                                }
                            />
                            <button type="submit" style={{ display: 'none' }}></button>
                        </form>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/" className={`text-white hover:text-gray-300 ${pathName === '/' ? 'underline' : ''
                            }`}>Home</Link>
                        <Link href="/shop" className={`text-white hover:text-gray-300 ${pathName === '/shop' ? 'underline' : ''
                            }`}>Shop</Link>
                        <Link href="/cart" className={`text-white hover:text-gray-300 ${pathName === '/cart' ? 'underline' : ''
                            }`}>Cart</Link>
                        {currentUser ? (
                            <div
                                className="group relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <p className="text-white cursor-pointer">
                                    Welcome {currentUser.firstName}
                                </p>
                                {isHovered && (
                                    <button
                                        onClick={handleLogout}
                                        className="absolute top-full left-0 bg-white text-blue-500 py-1 px-4 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="text-white hover:text-gray-300 mb-2" passHref>
                                <AiOutlineUser size={25} />
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar

