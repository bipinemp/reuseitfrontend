import Container from "@/components/Container";
import { Loader2 } from "lucide-react";

export function ProductDetailsLoading() {
  return (
    <Container>
      <div className="flex items-center justify-center mt-20">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    </Container>
  );
}
