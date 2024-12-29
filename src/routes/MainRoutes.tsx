import { lazy } from 'react';

// project import
import DashboardLayout from '@/layout/DashboardLayout';
import Loadable from '@/components/global/Loadable';

const DashboardDefault = Loadable(
    lazy(() => import('@/pages/dashboard/index'))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
        },
    ],
};

export default MainRoutes;
