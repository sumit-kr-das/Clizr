import { lazy } from 'react';

// project import
import Loadable from '@/components/global/Loadable';
import LoginLayout from '@/layout/AuthLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('@/pages/authentication/login')));
const AuthRegister = Loadable(
    lazy(() => import('@/pages/authentication/register'))
);

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <LoginLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin />,
        },
        {
            path: '/register',
            element: <AuthRegister />,
        },
    ],
};

export default LoginRoutes;
