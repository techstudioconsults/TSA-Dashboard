import { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./setup.ts";

import AuthProvider from "~/components/AuthProvider";
import LenisProvider from "~/components/lenis-provider";
import Progress_Bar from "~/components/progress-bar";
import { cn } from "~/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techstudio Academy",
  description: "TSA",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={cn(openSans.className, "bg-gray-50")}>
//         <Progress_Bar />
//         <AuthProvider>
//           <LenisProvider>{children}</LenisProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(openSans.className, "bg-gray-50")}>
        <Progress_Bar />
        <AuthProvider>
          <LenisProvider>
            {/* Show actual content only on desktop (lg and up) */}
            <div className="hidden lg:block">{children}</div>

            {/* Show fallback message on mobile/tablet */}
            <div className="block h-screen w-full items-center justify-center px-4 text-center lg:hidden">
              <p className="pt-24 text-lg font-semibold text-gray-700">
                This dashboard is only available on desktop devices (screen
                width ≥ 1024px).
              </p>
            </div>
          </LenisProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
