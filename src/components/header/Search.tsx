import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const Search: React.FC = () => {
  return (
    <div className="relative w-full flex items-center gap-1">
      <Input
        className="w-full text-xs sm:text-sm xl:w-[600px] border-gray-400 py-6 pl-11 rounded-lg"
        type="text"
        placeholder="Find Cars, Mobile Phones and more..."
      />
      <Button variant="ghost" type="submit" className="absolute p-0 left-2">
        <IoSearch size={30} color="gray" />
      </Button>
    </div>
  );
};

export default Search;
