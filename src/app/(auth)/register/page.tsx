import Container from "@/components/Container";
import RegisterForm from "@/components/auth/forms/RegisterForm";
import React from "react";

const page: React.FC = () => {
  return (
    <Container>
      <div className="w-[900px] h-[500px] mx-auto flex flex-col gap-5 mb-20">
        <RegisterForm />
      </div>
    </Container>
  );
};

export default page;
