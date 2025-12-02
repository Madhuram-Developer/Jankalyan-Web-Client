'use client'

import Card from "@/components/Card";
import Image from "next/image";
import { LayoutDashboard, UserPlus, ChartPie, CircleUserRound } from 'lucide-react';
import Button from "@/components/Button";
import Logout from "@/components/Logout";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Dashboard from "@/components/Dashboard";
import QuestionView from "@/components/QuestionView";
import AddAdmin from "@/components/AddAdmin";


const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Admin', icon: UserPlus },
  { name: 'Analytics', icon: ChartPie },
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : 'Dashboard');

  const handleTabClick = (itemName) => {
    setActiveTab(itemName);
    router.push(`/?tab=${itemName.toLowerCase()}`);
  };

  return (
    <div className="flex p-10 gap-8 min-h-screen overflow-y-hidden">
      <Card className="flex-1 min-h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Image src={'/png/logo.png'} width={0} height={0} alt="Logo" className="h-auto w-full -mt-12 border-b border-b-[#0000001C]" unoptimized />
            {navItems.map((item) => (
              <div key={item.name} className={`p-3 text-text-primary font-semibold hover:bg-[#0000000A] cursor-pointer flex items-center px-6 ${item.name === activeTab ? 'bg-[#742B0021]' : ''}`} onClick={() => handleTabClick(item.name)}>
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
        { tab === 'dashboard' && <Dashboard /> }
        { tab === 'admin' && <AddAdmin /> }
      </Card>
    </div>
  );
}
