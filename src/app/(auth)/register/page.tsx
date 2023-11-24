import Container from "@/components/Container";
import RegisterForm from "@/components/auth/forms/RegisterForm";
import React from "react";

const page: React.FC = () => {
  return (
    <Container>
      <div className="w-[450px] mx-auto flex flex-col gap-5 mb-20">
        <h1 className="font-semibold underline underline-offset-4">
          Register Form :
        </h1>
        <RegisterForm />
      </div>
    </Container>
  );
};

export default page;
