'use client'

import Card from "@/components/Card";
import Image from "next/image";
import { LayoutDashboard, UserPlus, ChartPie, CircleUserRound, Settings } from 'lucide-react';
import Logout from "@/components/Logout";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', tab : '/dashboard' , icon: LayoutDashboard },
  { name: 'Admin', tab : '/dashboard/admin', icon: UserPlus },
  { name: 'Analytics', tab : '/dashboard/analytics', icon: ChartPie },
  { name: 'App Settings', tab : '/dashboard/appsettings', icon: Settings },
];

const Layout = ({ children }) => {
  
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  const handleTabClick = (itemName) => {
    setActiveTab(itemName);
    router.push(itemName);
  };

  return (
    <div className="flex p-10 gap-8 min-h-screen overflow-y-hidden">
      <Card className="flex-1 min-h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Image src={'/png/logo.png'} width={0} height={0} alt="Logo" className="h-auto w-full -mt-12 border-b border-b-[#0000001C]" unoptimized />
            {navItems.map((item) => (
              <div key={item.name} className={`p-3 text-text-primary font-semibold hover:bg-[#0000000A] cursor-pointer flex items-center px-6 ${item.tab === activeTab ? 'bg-[#742B0021]' : ''}`} onClick={() => handleTabClick(item.tab)}>
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center px-3 gap-2 mb-6">
            <div className="flex gap-2">
              <CircleUserRound className="text-text-primary" />
              <span className="text-text-primary font-bold">Full Name</span>
            </div>
            <Logout />
          </div>
        </div>
      </Card>
      <Card className="flex-4 bg-card min-h-full">
        {children}
      </Card>
    </div>
  );
}

export default Layout   
