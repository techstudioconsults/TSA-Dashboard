// import { Metadata } from "next";
// import { Open_Sans } from "next/font/google";
// import React from "react";

// import "./setup.ts";

// import Sidebar from "~/components/sidebar/index.tsx";
// import TopNav from "~/components/topnav/index.tsx";
// import { cn } from "~/lib/utils";

// const openSans = Open_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Techstudio Academy",
//   description: "TSA",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link
//           href="https://fonts.googleapis.com/icon?family=Material+Icons"
//           rel="stylesheet"
//         />
//       </head>
//       <body className={cn(openSans.className, "bg-gray-50")}>
//         <div className="flex">
//           <Sidebar />
//           <main className="mx-auto 2xl:w-4/5 pl-20 min-h-screen flex-1 container ">
//             <TopNav />
//             <div className="p-6">{children}</div>
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./setup.ts";

import LenisProvider from "~/components/lenis-provider";
import Progress_Bar from "~/components/progress-bar";
import { cn } from "~/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techstudio Academy",
  description: "TSA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(openSans.className, "bg-gray-50")}>
        <Progress_Bar />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
