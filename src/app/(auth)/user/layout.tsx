import Container from "@/components/Container";
import UserLists from "@/components/auth/chat/UserLists";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <section className="relative flex h-[80vh] w-full gap-5">
        <UserLists />
        {children}
      </section>
    </Container>
  );
}
