"use client";

import { TsaButton } from "@strategic-dot/components";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"; // Add useState

import { NAV_ITEMS } from "~/constants/navigation";
import CreateSheetModal from "../modals/response-modal/CreateSheetModal";

interface RouteButton {
  label: string;
  path: string;
}

const ROUTE_BUTTONS: Record<string, RouteButton> = {
  "/courses": {
    label: "Create Course",
    path: "/createcourse",
  },
  "/classes": {
    label: "Create Class",
    path: "/createclass",
  },
  "/sheets": {
    label: "Create Sheet",
    path: "/createsheet",
  },
};

const TopNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCreateSheetModalOpen, setIsCreateSheetModalOpen] = useState(false); // State for modal

  const currentNavItem = NAV_ITEMS.find(
    (item) => item.path === pathname || item.subPath === pathname,
  ) || {
    label: "Dashboard",
  };

  const routeButton = ROUTE_BUTTONS[pathname];

  // Check if current path is one of the main routes
  const isMainRoute = ["/courses", "/classes", "/sheets"].includes(pathname);

  // Common components
  const TitleSection = (
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold capitalize">
        {currentNavItem.label}
      </h1>
    </div>
  );

  const SearchSection = (
    <form className="relative hidden md:block" role="search">
      <input
        type="search"
        placeholder="Search..."
        aria-label="Search for courses, classes, students and more"
        className="w-64 rounded-lg border px-4 py-2 pr-10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-96"
      />
      <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </form>
  );

  const ProfileSection = (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 rounded-full bg-gray-200 ring-2 ring-transparent ring-offset-2 transition-all hover:ring-blue-500"
        role="img"
        aria-label="Admin profile picture"
      />
      <span className="hidden font-medium sm:inline-block">Admin</span>
    </div>
  );

  // Handle Create Sheet button click
  const handleCreateSheetClick = () => {
    if (pathname === "/sheets") {
      setIsCreateSheetModalOpen(true); // Open the modal
    } else {
      router.push(routeButton.path); // Navigate to other routes
    }
  };

  return (
    <section className="border-b bg-white px-8 py-5">
      {isMainRoute ? (
        // Layout for main routes (courses, classes, sheets)
        <header className="container sticky top-0 z-40 mx-auto flex items-center justify-between">
          {TitleSection}

          <div className="flex items-center gap-3">
            {SearchSection}
            {routeButton && (
              <TsaButton
                variant="primary"
                className="bg-mid-blue py-3"
                onClick={handleCreateSheetClick}
              >
                {routeButton.label}
              </TsaButton>
            )}
          </div>

          {ProfileSection}
        </header>
      ) : (
        // Layout for other routes
        <header className="container sticky top-0 z-40 mx-auto flex items-center justify-between">
          {TitleSection}

          <div className="flex items-center gap-8">
            {SearchSection}
            {ProfileSection}
          </div>
        </header>
      )}

      {/* Render the CreateSheetModal */}
      <CreateSheetModal
        isOpen={isCreateSheetModalOpen}
        onClose={() => setIsCreateSheetModalOpen(false)}
      />
    </section>
  );
};

export default TopNav;
