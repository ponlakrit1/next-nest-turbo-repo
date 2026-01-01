"use client"

import { AuthGuard } from "@/components/shared/AuthGuard";
import { Divider, Layout, Menu } from "antd";
import { Home, MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  border: '1px solid #f5f5f5',
};

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: "/profile",
    label: "หน้าแรก",
    title: "",
    url: "/profile",
    icon: <Home size={16} />,
  },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle} theme='light' className='hidden md:block'>
        <div className="flex flex-col h-full">
          <div className="flex items-center mx-2 mt-4">
            {
              !collapsed &&
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Home className="size-4" /> 
              </div>
            }
            {
              !collapsed ?
              <div className="flex flex-1 justify-between text-left text-sm leading-tight ml-2">
                <span className="truncate font-medium">Title</span>
                <MenuIcon size={18} onClick={() => setCollapsed(!collapsed)} />
              </div>
              : (
                <div className="flex flex-1 justify-center items-center">
                  <MenuIcon size={18} onClick={() => setCollapsed(!collapsed)} />
                </div>
              )
            }
          </div>
          <Divider className='my-2!' />
          <Menu
            theme='light'
            mode="inline" 
            selectedKeys={[pathname]}
            onClick={({ key }) => router.push(key)}
            items={menuItems}
          >
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Content className="bg-white">
          <AuthGuard>{children}</AuthGuard>
        </Content>
      </Layout>
    </Layout>
  );
}
