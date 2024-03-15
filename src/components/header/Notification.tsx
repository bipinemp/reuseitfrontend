"use client";

import { useUserProfile } from "@/apis/queries";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";

import Pusher from "pusher-js";
import axios from "axios";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

const Notification = () => {
  const { data } = useUserProfile();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState(false);

  const fetchNotifications = async () => {
    try {
      await axios.get("http://localhost:8000/api/getNotification", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: SendNotify } = useQuery({
    queryKey: ["sendnotify"],
    queryFn: fetchNotifications,
    refetchInterval: 2000,
  });

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: "ap2",
      },
    );

    const channel = pusher.subscribe(`user.${data?.id}`);

    channel.bind("notification", function (notifications: TNotification) {
      setNotificationCount(notifications.notify.count);
      setNotifications(notifications.notify.data);
    });

    return () => {
      pusher.unsubscribe(`user.${data?.id}`);
    };
  }, [notifications, notificationCount, data?.id]);

  const onReadNotifications = async () => {
    try {
      await axios.get("http://localhost:8000/api/markasread", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!data?.id) {
    return null;
  }

  return (
    <DropdownMenu
      open={openMenu}
      onOpenChange={() => {
        setOpenMenu(!openMenu);
        onReadNotifications();
      }}
    >
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer rounded-full p-2 transition hover:bg-primary/20">
          <FaRegBell size={25} />
          {notificationCount > 0 && (
            <span
              className={cn(
                "absolute -right-1 -top-1 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-destructive text-white",
                {
                  "h-[25px] w-[40px]": notificationCount >= 10,
                },
              )}
            >
              {notificationCount > 0 && notificationCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3 w-[400px]">
        {/* {notifications?.map((notify, i) => (
          <DropdownMenuItem key={i}>{notify}</DropdownMenuItem>
        ))} */}
        <DropdownMenuItem>one</DropdownMenuItem>
        <DropdownMenuItem>one</DropdownMenuItem>
        <DropdownMenuItem>one</DropdownMenuItem>
        <DropdownMenuItem>one</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
