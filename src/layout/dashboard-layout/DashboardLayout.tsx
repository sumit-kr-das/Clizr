import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar from './components/AppSidebar';

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full px-5">
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;
