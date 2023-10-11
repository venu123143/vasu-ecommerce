"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

type InitialState = {
    value: string
    allUsers: any
    cart: any
}

const getInitialState = (): InitialState => {
    if (typeof window !== "undefined") {
        return {
            value: "",
            allUsers: localStorage.getItem("allUsers")
                ? JSON.parse(localStorage.getItem("allUsers") as string)
                : [],
            cart: localStorage.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart") as string)
                : [],
        };
    }
    return {
        value: "",
        allUsers: [],
        cart: [],
    };
};
export const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        handleValueChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        storingAllUsers: (state, action) => {
            const userExists = state.allUsers.some((user: any) => user.email === action.payload.email);
            if (userExists) {
                toast.error("user already exists")
            }
            else {
                if (typeof window !== 'undefined') {
                    state.allUsers.push(action.payload)
                    localStorage.setItem("allUsers", JSON.stringify(state.allUsers))
                    toast.success("user registered succesfully")
                }
            }
        },
        addToCart: (state, action) => {
            const { id, title, price, thumbnail } = action.payload;
            const existingItem = state.cart.find((item: any) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
                if (typeof window !== 'undefined') {
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }   
            } else {
                if (typeof window !== 'undefined') {
                    state.cart.push({ id, title, price, quantity: 1, thumbnail });
                    localStorage.setItem("cart", JSON.stringify(state.cart))
                }
            }
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.cart.findIndex((item: any) => item.id === id);

            if (itemIndex !== -1) {
                if (state.cart[itemIndex].quantity > 1) {
                    state.cart[itemIndex].quantity -= 1;
                    if (typeof window !== 'undefined') {
                        localStorage.setItem("cart", JSON.stringify(state.cart))
                    }
                } else {
                    if (typeof window !== 'undefined') {
                        state.cart.splice(itemIndex, 1);
                        localStorage.setItem("cart", JSON.stringify(state.cart))
                    }
                }
            }
        }
    }
})
export const { handleValueChange, storingAllUsers, addToCart, removeFromCart } = authSlice.actions
export default authSlice.reducer