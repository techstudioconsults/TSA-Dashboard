"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "~/constants/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-32 bg-high-blue py-7 text-white">
      <div className="flex items-center justify-center">
        <Link className="hover:animate-pulse" href="/">
          <Image width={45} height={45} src="/icons/logo.png" alt="logo" />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-12 px-4 pt-12">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <div key={item.path} className="flex flex-col items-center gap-6">
              <Link
                href={item.path}
                className={`flex flex-col items-center justify-center gap-3 transition-opacity hover:opacity-80 ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              >
                <Icon size={24} /> {/* Render the icon component */}
                <span className="text-xs">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
