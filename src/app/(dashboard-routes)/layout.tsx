// import { Open_Sans } from "next/font/google";

// import LenisProvider from "~/components/lenis-provider";
// // import GotoTop from "~/components/miscellaneous/goto-top";
// import Progress_Bar from "~/components/progress-bar";
// import { cn } from "~/lib/utils";

// const openSans = Open_Sans({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className={cn(openSans.className)}>
//       <Progress_Bar />
//       <LenisProvider>
//         <section>{children}</section>
//       </LenisProvider>
//     </main>
//   );
// }

// app/(dashboard)/layout.tsx

// import Sidebar from "~/components/sidebar";
// import TopNav from "~/components/topnav";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex flex-1 flex-col">
//         <TopNav />
//         <main className="container mx-auto flex-1 p-6">
//           <section>{children}</section>
//         </main>
//       </div>
//     </div>
//   );
// }

import Sidebar from "~/components/sidebar";
import TopNav from "~/components/topnav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed positioning */}
      <Sidebar />
      <div className="ml-32 flex flex-1 flex-col">
        <TopNav />
        <main className="w-full flex-1 p-8">
          <section className="container mx-auto">{children}</section>
        </main>
      </div>
    </div>
  );
}
