"use client"
import { store } from "./store"
import { Provider } from "react-redux"

type ReduxProviderProps = {
    children: React.ReactNode;
};
const ReduxProvider = ({ children }: ReduxProviderProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider