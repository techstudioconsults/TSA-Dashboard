import { Open_Sans } from "next/font/google";

import { Layout } from "~/components/layout";
import LenisProvider from "~/components/lenis-provider";
import GotoTop from "~/components/miscellaneous/goto-top";
import Progress_Bar from "~/components/progress-bar";
import { cn } from "~/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={cn(openSans.className)}>
      <Progress_Bar />
      <LenisProvider>
        <Layout>
          <GotoTop />
          {children}
        </Layout>
      </LenisProvider>
    </main>
  );
}
