"use client";

import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import {
  useGetLatestMessages,
  useGetUserDataInInterval,
  useGetUserDetails,
  useUserProfile,
} from "@/apis/queries";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface Props {
  id: string;
}

interface UserProps {
  params: Props;
}

export type MsgData = {
  message: string;
  roomId: string;
  sender_id: string;
  timeago: string;
  username: string;
};

const Page: React.FC<UserProps> = ({ params }) => {
  const { id } = params;
  const { data } = useUserProfile();

  const { data: userDetails, isPending: userDetailPending } =
    useGetUserDataInInterval(parseInt(id));

  const { data: msgData, isPending } = useGetLatestMessages(
    data?.id || 0,
    parseInt(id) || 0
  );

  const [messages, setMessages] = useState<MsgData[]>([]);

  useEffect(() => {
    if (msgData) {
      setMessages(msgData);
    }
  }, [msgData]);

  const [message, setMessage] = useState("");
  const bottomOfChatsRef = useRef<HTMLSpanElement>(null);
  const senderId = data?.id;

  const roomId = createRoomId(senderId, id);
  function createRoomId(user1: any, user2: any) {
    const sortedIds = [user1, user2].sort();
    return sortedIds.join("_");
  }

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("1f64b5d90f191ce43622", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe(`user.${roomId}`);

    channel.bind("message", function (data: any) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`user.${roomId}`);
    };
  }, [senderId, id, data?.id]);

  useEffect(() => {
    if (bottomOfChatsRef.current) {
      bottomOfChatsRef.current.scrollIntoView();
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id, // Adjusted to match your Laravel API expectations
        message,
      }),
    });
    if (response.ok) {
      setMessage("");
    }
  };

  const imgurl = "http://127.0.0.1:8000/images/";

  if (isPending) {
    return (
      <div className="w-full h-[80%] flex justify-center items-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="flex gap-2 py-3 px-4 bg-zinc-200 shadow z-20 rounded-tl-md rounded-tr-md items-center border-b border-primary">
        <div className="relative flex flex-col w-[40px] h-[40px]">
          <Image
            src={imgurl + userDetails?.Profile_image}
            fill
            className="object-cover rounded-full object-top border z-10 border-content"
            alt=""
          />
          {userDetails?.ActiveStatus === 1 && (
            <span className="absolute w-[15px] h-[15px] bg-green-600 bottom-0 -right-1 z-20 rounded-full border-[1px] border-white"></span>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-gray-700 text-sm">
            {userDetails?.name}
          </h3>
          <p className="text-xs font-semibold">
            {userDetails?.ActiveStatus === 1
              ? "Online"
              : `Active ${userDetails?.Timeago}`}
          </p>
        </div>
      </div>

      <div className="w-full h-full bg-zinc-50 overflow-y-auto overflow-x-hidden rounded-bl-md rounded-br-md flex flex-col gap-10 justify-between px-2 pt-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={imgurl + userDetails?.Profile_image}
              fill
              className="object-cover rounded-full object-top border border-black"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h3 className="font-bold text-gray-500 text-sm">
              {userDetails?.name}
            </h3>
            <p className="text-gray-500 text-xs">
              Lives in {userDetails?.District}, {userDetails?.Municipality}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {messages.map((message: any) => {
            return (
              <div key={message.id} className="w-full flex flex-col">
                {message.sender_id === senderId ? (
                  <div className="max-w-[350px] self-end flex justify-end">
                    <div className="flex gap-3 ">
                      <div className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                        {message.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[350px]">
                    <div className="flex gap-2 items-center">
                      <div className="relative w-[60px] h-[50px]">
                        <Image
                          src={imgurl + userDetails?.Profile_image}
                          fill
                          alt=""
                          className="rounded-full object-cover object-top"
                        />
                        {userDetails?.ActiveStatus === 1 && (
                          <span className="absolute w-[15px] h-[15px] bg-green-600 bottom-0 -right-1 z-20 rounded-full border-[1px] border-white"></span>
                        )}
                      </div>
                      <div className="flex w-full flex-col gap-3">
                        <div className="flex justify-between">
                          <p className="text-xs font-bold text-gray-700">
                            {message.username.split(" ")[0]}
                          </p>
                          <p className="text-xs text-gray-700">
                            {message.timeago}
                          </p>
                        </div>
                        <div className="w-full px-3 py-2 bg-zinc-200 rounded-lg text-sm">
                          {message.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <span ref={bottomOfChatsRef}></span>
        </div>
      </div>

      {/* Form  */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full flex items-center gap-3 mt-4"
      >
        <div className="w-full flex items-center gap-3">
          <Input
            placeholder="Write a message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-content"
          />
          <Button disabled={message === ""}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
