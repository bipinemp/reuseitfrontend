import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const Search: React.FC = () => {
  return (
    <div className="flex w-full max-w-sm items-center gap-1">
      <Input
        className="w-[370px] rounded-tr-none rounded-br-none ring-2 ring-ring outline-primary ring-offset-2"
        type="text"
        placeholder="Find Cars, Mobile Phones and more..."
      />
      <Button
        variant="default"
        type="submit"
        className="rounded-tl-none rounded-bl-none h-[3rem]"
      >
        <IoSearch size={30} />
      </Button>
    </div>
  );
};

export default Search;
