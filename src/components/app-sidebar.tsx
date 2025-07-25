import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/constants";
import type { RootState } from "@/store/store";
import { Home, ListTodo, LogOut, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const { userRole } = useSelector((state: RootState) => state.auth);
  const isEmployee = userRole === "E";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTES?.LOGIN);
  };

  const customerItems = [
    {
      title: "Overview",
      url: ROUTES?.C_OVERVIEW,
      icon: Home,
    },
    {
      title: "Register Depositor",
      url: ROUTES?.C_REGISTER_DEPOSITOR,
      icon: UserPlus,
    },
    {
      title: "Logout",
      url: ROUTES?.LOGIN,
      onClick: handleLogout,
      icon: LogOut,
    },
  ];

  const employeeItems = [
    {
      title: "Pending",
      url: ROUTES?.E_PENDING,
      icon: ListTodo,
    },
    {
      title: "Overview",
      url: ROUTES?.E_OVERVIEW,
      icon: Home,
    },
    {
      title: "Register Depositor",
      url: ROUTES?.E_REGISTER_DEPOSITOR,
      icon: UserPlus,
    },
    {
      title: "Logout",
      url: ROUTES?.LOGIN,
      onClick: handleLogout,
      icon: LogOut,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-sidebar">
          <SidebarGroupLabel>{isEmployee ? "Employee" : "Customer"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(isEmployee ? employeeItems : customerItems).map((item) => (
                <SidebarMenuItem key={item?.title}>
                  <SidebarMenuButton asChild>
                    {item?.onClick ? (
                      <button onClick={item.onClick} className="flex items-center gap-2 cursor-pointer">
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a onClick={() => navigate(item?.url)} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
