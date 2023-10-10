
import React from 'react';
import { DynamicHeader } from '../page';

const LoginLayout = ({ children }: any) => {
    return (
        <div>
            <DynamicHeader />
            {children}
        </div>
    );
};

export default LoginLayout;
