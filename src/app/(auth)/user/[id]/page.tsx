"use client";

import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { useUserProfile } from "@/apis/queries";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface Props {
  id: string;
}

interface UserProps {
  params: Props;
}

type MsgData = {
  message: string;
  roomId: string;
  sender_id: string;
  timeago: string;
  username: string;
};

const Page: React.FC<UserProps> = ({ params }) => {
  const { id } = params;
  const { data } = useUserProfile();
  const [messages, setMessages] = useState<MsgData[]>([]);
  const [message, setMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState<boolean>(false);
  const bottomOfChatsRef = useRef<HTMLDivElement>(null);
  const senderId = data?.id;
  const receiverId = id;

  const roomId = createRoomId(senderId, receiverId);
  function createRoomId(user1: any, user2: any) {
    const sortedIds = [user1, user2].sort();
    return sortedIds.join("_");
  }

  useEffect(() => {
    setMsgLoading(true);
    Pusher.logToConsole = true;
    const pusher = new Pusher("1f64b5d90f191ce43622", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe(`user.${roomId}`);

    channel.bind("message", function (data: any) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    const fetchMessages = async () => {
      const response = await fetch(
        `http://localhost:8000/api/messages/${senderId}/${receiverId}`
      );
      const data = await response.json();

      setMessages(data.messages);
      setMsgLoading(false);
    };

    fetchMessages();

    return () => {
      pusher.unsubscribe(`user.${roomId}`);
    };
  }, [senderId, receiverId]);

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

  if (msgLoading) {
    return (
      <div className="w-full h-[80%] flex justify-center items-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    // <Container>
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="w-full h-full bg-zinc-50 overflow-y-auto overflow-x-hidden flex flex-col gap-5 border border-content p-2">
        {messages.map((message: any) => {
          return (
            <div key={message.id} className="w-full flex flex-col gap-3">
              {message.sender_id === senderId ? (
                <div className="w-[250px] self-end flex justify-end">
                  <div className="flex gap-3 ">
                    <div className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                      {message.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-[250px]">
                  <div className="w-full flex gap-3 items-center">
                    <div className="relative w-[18%] h-[35px]">
                      <Image
                        src={imgurl + message.receiver_image}
                        fill
                        alt=""
                        className="rounded-full object-cover object-top"
                      />
                    </div>
                    <div className="w-full px-3 py-2 bg-zinc-200 rounded-lg text-sm">
                      {message.message}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomOfChatsRef}></div>
      </div>

      {/* Form  */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full flex items-center gap-3"
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
    // </Container>
  );
};

export default Page;
