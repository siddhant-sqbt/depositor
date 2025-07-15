import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import { HIDE_SIDEBAR_ROUTES, ROUTES } from "./lib/constants";
import RegisterDepositorPage from "./pages/RegisterDepositor";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Header from "./components/Common/Header";
import LoginPage from "./pages/Login";
import CustomerOverview from "./pages/CustomerOverview";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ViewRegisterDepositor from "./pages/ViewRegisterDepositor";
import EmpPendingPage from "./pages/Employee/Pending";
import OverviewPage from "./pages/CustomerOverview";
import EmpViewRegisterDepositor from "./pages/Employee/ViewRegisterDepositor";
import EmpRegisterDepositorPage from "./pages/Employee/RegisterDepositor";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const isHidden = HIDE_SIDEBAR_ROUTES?.includes(location?.pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster position="top-right" expand={false} richColors />
      <div className="min-h-screen w-[inherit] font-sans antialiased">
        <Header />

        <SidebarProvider>
          {!isHidden && <AppSidebar />}
          <Routes>
            <Route path={ROUTES?.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES?.C_OVERVIEW} element={<CustomerOverview />} />
            <Route path={`${ROUTES?.C_VIEW}/:id`} element={<ViewRegisterDepositor />} />
            <Route path={ROUTES?.C_REGISTER_DEPOSITOR} element={<RegisterDepositorPage />} />

            <Route path={ROUTES?.E_PENDING} element={<EmpPendingPage />} />
            <Route path={ROUTES?.E_OVERVIEW} element={<OverviewPage />} />
            <Route path={`${ROUTES?.E_VIEW}/:id`} element={<EmpViewRegisterDepositor />} />
            <Route path={ROUTES?.E_REGISTER_DEPOSITOR} element={<EmpRegisterDepositorPage />} />

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </SidebarProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
