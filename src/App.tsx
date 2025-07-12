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

function App() {
  const location = useLocation();
  const isHidden = HIDE_SIDEBAR_ROUTES?.includes(location?.pathname);
  return (
    <>
      <Toaster />
      <div className="min-h-screen w-[inherit] font-sans antialiased">
        <Header />

        <SidebarProvider>
          {!isHidden && <AppSidebar />}
          <Routes>
            <Route path={ROUTES?.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES?.C_OVERVIEW} element={<CustomerOverview />} />
            <Route path={ROUTES?.C_PENDING} element={<CustomerOverview />} />
            <Route path={ROUTES?.C_REGISTER_DEPOSITOR} element={<RegisterDepositorPage />} />

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </SidebarProvider>
      </div>
    </>
  );
}

export default App;
