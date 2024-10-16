import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import React from "react";

import "./setup.ts";

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
      <body className={cn(openSans.className)}>{children}</body>
    </html>
  );
}
