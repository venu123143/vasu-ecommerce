
import Navbar from '@/components/Navbar';
import React from 'react';

const LoginLayout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default LoginLayout;
