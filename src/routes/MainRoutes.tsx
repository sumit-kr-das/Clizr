import { lazy } from 'react';

// project import
import DashboardLayout from '@/layout/dashboard-layout/DashboardLayout';
import Loadable from '@/components/global/Loadable';
import InboxPage from '@/pages/dashboard/inbox';

const DashboardDefault = Loadable(
    lazy(() => import('@/pages/dashboard/index'))
);
const MyIssuesPage = Loadable(
    lazy(() => import('@/pages/dashboard/my-issues/index'))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: [
        {
            path: '/',
            element: <InboxPage />,
        },
        {
            path: '/issues',
            element: <MyIssuesPage />,
        },
    ],
};

export default MainRoutes;
