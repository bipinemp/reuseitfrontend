import Link from "next/link";
import { RiChat3Line } from "react-icons/ri";

const Chat: React.FC = () => {
  return (
    <Link
      href={"/user"}
      className="cursor-pointer p-2 rounded-full transition hover:bg-primary/20"
    >
      <RiChat3Line size={25} />
    </Link>
  );
};

export default Chat;
