import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/constants";
import { Home, UserPlus } from "lucide-react";

export function AppSidebar() {
  const items = [
    {
      title: "Overview",
      url: ROUTES?.C_OVERVIEW,
      icon: Home,
    },
    {
      title: "Pending",
      url: ROUTES?.C_PENDING,
      icon: Home,
    },
    {
      title: "Register Depositor",
      url: ROUTES?.C_REGISTER_DEPOSITOR,
      icon: UserPlus,
    },
    // {
    //   title: "Profile",
    //   url: ROUTES?.PROFILE,
    //   icon: Inbox,
    // },
    // {
    //   title: "Annunity Form",
    //   url: ROUTES?.ANNUNITY_FORM,
    //   icon: Inbox,
    // },
    // {
    //   title: "Form 4",
    //   url: ROUTES?.FORM4,
    //   icon: Inbox,
    // },
    // {
    //   title: "Form 41",
    //   url: ROUTES?.FORM41,
    //   icon: Inbox,
    // },
    // {
    //   title: "NEFT",
    //   url: ROUTES?.NEFT,
    //   icon: Inbox,
    // },
    // {
    //   title: "Form 6A",
    //   url: ROUTES?.FORM6A,
    //   icon: Inbox,
    // },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-sidebar">
          <SidebarGroupLabel>Depositor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
