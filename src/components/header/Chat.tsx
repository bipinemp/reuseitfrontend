import { RiChat3Line } from "react-icons/ri";

const Chat: React.FC = () => {
  return (
    <div className="cursor-pointer p-2 rounded-full transition hover:bg-primary/20">
      <RiChat3Line size={25} />
    </div>
  );
};

export default Chat;
