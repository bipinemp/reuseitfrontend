import { FaRegBell } from "react-icons/fa";

const Notification = () => {
  return (
    <div className="cursor-pointer p-2 rounded-full transition hover:bg-primary/20">
      <FaRegBell size={25} />
    </div>
  );
};

export default Notification;
