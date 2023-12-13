"use client";
import { usePathname } from "next/navigation";
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from "./utils/navigation";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ProtectedAdmin from "./protected";
import Sidebar from "@/components/adminComponents/sidebar/Sidebar";
import AdminNavbar from "@/components/adminComponents/AdminNavbar/AdminNavbar";
import routes from "@/components/adminComponents/routes/routes";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = "ltr";
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      {/* <ProtectedAdmin> */}
      <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
        <Sidebar
          routes={routes}
          open={open}
          setOpen={setOpen}
          variant="admin"
        />
        {/* Navbar & Main Content */}
        <div className="h-full w-full font-dm bg-[#F5F8FE] dark:bg-navy-900">
          {/* Main Content */}
          <main
            className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[280px]`}
          >
            {/* Routes */}
            <div>
              <AdminNavbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={getActiveRoute(routes, pathname)}
                secondary={getActiveNavbar(routes, pathname)}
              />
              <div className="mx-auto container min-h-[90vh] p-2 !pt-[10px] md:p-2">
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </div>
            </div>
          </main>
          <Toaster />
        </div>
      </div>
      {/* </ProtectedAdmin> */}
    </SessionProvider>
  );
};

export default AdminLayout;
