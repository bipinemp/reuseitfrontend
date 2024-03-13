import AdminDashSidebar from "@/components/admin/AdminDashSidebar";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <AdminDashSidebar />
      {children}
    </section>
  );
}
