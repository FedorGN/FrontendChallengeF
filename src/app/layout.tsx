"use client";

import { AreaChartOutlined, UserOutlined } from '@ant-design/icons';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu, MenuProps } from 'antd';
import { Inter } from "next/font/google";
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Home',
    key: 'home',
    icon: <AreaChartOutlined />,
  },
  {
    label: 'Employees',
    key: 'employees',
    icon: <UserOutlined />,
  },
];



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
      case 'home':
        router.push('/');
        break;
      case 'employees':
        router.push('/employees');
        break;
      default:
        break;
    }
  };

  return (
    <html lang="en"><AntdRegistry>
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <main>
            <Menu onClick={onClick} mode="horizontal" items={items} />
            <MainContainer>
              {children}
            </MainContainer>
          </main>
        </body>
      </QueryClientProvider>
    </AntdRegistry>
    </html >
  );
}


export const MainContainer = styled.div`
    padding: 0 32px;
`