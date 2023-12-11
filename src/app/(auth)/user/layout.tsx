import Container from "@/components/Container";
import UserLists from "@/components/auth/chat/UserLists";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <section className="relative w-full flex gap-5 h-[80vh]">
        <UserLists />
        {children}
      </section>
    </Container>
  );
}
