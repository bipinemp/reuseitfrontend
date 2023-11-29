import DashSidebar from "@/components/auth/dashboard/DashSidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-10">
      <DashSidebar />
      {children}
    </section>
  );
}
