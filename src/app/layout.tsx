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
          <LenisProvider>{children}</LenisProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
