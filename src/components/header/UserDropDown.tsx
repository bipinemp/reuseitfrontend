import { LifeBuoy, LogIn, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { FaRegistered } from "react-icons/fa6";
import Link from "next/link";
import { useUserProfile } from "@/apis/queries";
import Logout from "../auth/Logout";
import { Button } from "../ui/button";

export function UserDropDown() {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";

  if (isPending) {
    return (
      <div className="relative w-[40px] h-[40px] bg-gray-500 animate-pulse rounded-full"></div>
    );
  }

  if (!data?.id) {
    return (
      <Link href={"/login"}>
        <Button variant="outline">Login</Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative w-[40px] h-[40px] cursor-pointer">
          <Image
            fill
            src={imgurl + data?.Profile_image}
            alt=""
            className="w-[40px] h-[40px] rounded-full bg-gray-500"
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
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
