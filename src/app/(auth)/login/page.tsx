import Container from "@/components/Container";
import LoginForm from "@/components/auth/forms/LoginForm";
import React from "react";

const page: React.FC = () => {
  return (
    <Container>
      <div className="w-[450px] mx-auto flex flex-col gap-5 mb-20">
        <h1 className="font-semibold underline underline-offset-4">
          Login Form :
        </h1>
        <LoginForm />
      </div>
    </Container>
  );
};

export default page;
