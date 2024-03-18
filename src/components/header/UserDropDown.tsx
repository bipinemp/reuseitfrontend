import {
  DollarSign,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  User,
} from "lucide-react";

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
import Link from "next/link";
import { useUserProfile } from "@/apis/queries";
import Logout from "../auth/Logout";
import { Button } from "../ui/button";

export function UserDropDown() {
  const { data, isPending } = useUserProfile();
  const imgurl = "http://127.0.0.1:8000/images/";

  if (isPending) {
    return (
      <div className="relative h-[40px] w-[40px] animate-pulse rounded-full bg-gray-500"></div>
    );
  }

  if (!data?.id) {
    return (
      <Link href={"/login"}>
        <Button variant="outline">Login</Button>
      </Link>
    );
  }

  let isAdmin = true;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative h-[40px] w-[40px] cursor-pointer">
          <Image
            fill
            src={imgurl + data?.Profile_image}
            alt=""
            className="h-[40px] w-[40px] rounded-full bg-gray-500"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[15rem]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/profile"} className="flex w-full items-center gap-1">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/dashboard"}
              className="flex w-full items-center gap-1"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href={"/admin"} className="flex w-full items-center gap-1">
              <LayoutDashboard className="mr-2 h-5 w-5 font-semibold text-destructive" />
              <span className="font-semibold text-destructive">
                Admin Dashboard
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/business_packages"}
              className="flex w-full items-center gap-1"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Buy Business Packages</span>
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

        {/* <DropdownMenuItem> */}
        <Logout />
        {/* </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
