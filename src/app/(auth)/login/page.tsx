import Container from "@/components/Container";
import LoginForm from "@/components/auth/forms/LoginForm";
import React from "react";

const page: React.FC = () => {
  return (
    <Container>
      <div className="w-[900px] h-[500px] mx-auto flex flex-col gap-5 mb-20">
        <LoginForm />
      </div>
    </Container>
  );
};

export default page;
