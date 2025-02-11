import Sidebar from "~/components/sidebar";
import TopNav from "~/components/topnav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
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
