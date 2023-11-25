import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profile from "./Profile";
import Image from "next/image";
import { FaRegistered } from "react-icons/fa6";
import Link from "next/link";
import { useUserProfile } from "@/apis/queries";
import { logoutCall } from "@/apis/apicalls";

export function UserDropDown() {
  const { data } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";
  const fallbackimage = "http://127.0.0.1:8000/images/Default_profile.jpg";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative w-[40px] h-[40px] cursor-pointer">
          <Image
            fill
            // src={fallbackimage}
            src={
              data?.Profile_image === undefined ||
              data?.Profile_image === null ||
              data?.Profile_image === undefined
                ? fallbackimage
                : imgurl + data.Profile_image
            }
            alt="@shadcn"
            className="w-[40px] h-[40px] rounded-full bg-gray-400"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/login"}
              className="w-full flex gap-[0.2rem] items-center"
            >
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/register"}
              className="w-full flex gap-[0.2rem] items-center"
            >
              <FaRegistered className="mr-2 h-4 w-4" /> Register
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span onClick={() => logoutCall()}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
