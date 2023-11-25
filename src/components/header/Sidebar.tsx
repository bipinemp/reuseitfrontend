import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import Profile from "./Profile";
import { RiChat3Line } from "react-icons/ri";
import { FaPlus, FaRegBell } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "../ui/button";
import SidebarLogout from "../auth/SidebarLogout";

const Sidebar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <IoMenu size={30} />
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-3/4 p-0">
        <SheetHeader>
          <SheetDescription className="flex flex-col">
            <div className="p-4 border-b-[1px] border-gray-400 flex items-center gap-4">
              <Profile />
              <Button
                size="lg"
                variant="outline"
                className="px-2 sm:px-8 border-gray-400"
              >
                View Dashboard
              </Button>
            </div>
            <div className="p-4 flex items-center gap-2 cursor-pointer rounded transition hover:bg-neutral-100">
              <RiChat3Line size={25} />
              <h3>Chat</h3>
            </div>
            <div className="p-4 flex items-center gap-2 cursor-pointer rounded transition hover:bg-neutral-100">
              <FaRegBell size={25} />
              <h3>Notifications</h3>
            </div>

            <SidebarLogout />

            <div className="p-4">
              <Link href={"/post"}>
                <Button
                  size="lg"
                  className="w-full text-xl rounded-full flex items-center gap-2 font-black tracking-wide"
                >
                  <FaPlus /> $ELL
                </Button>
              </Link>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
