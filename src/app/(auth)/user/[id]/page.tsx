"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useUserProfile } from "@/apis/queries";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

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
  const senderId = data?.id;
  const receiverId = id;

  // const roomId = createRoomId(senderId, receiverId);
  // function createRoomId(user1: any, user2: any) {
  //   const sortedIds = [user1, user2].sort();
  //   return sortedIds.join("_");
  // }

  const fetchMessages = async () => {
    const response = await fetch(
      `http://localhost:8000/api/messages/${senderId}/${receiverId}`
    );
    const data = await response.json();

    setMessages(data.messages);
  };

  useEffect(() => {
    fetchMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("1f64b5d90f191ce43622", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chat");

    channel.bind("hello", function (data: MsgData) {
      console.log(data);
      // setMessages((prevMessages) => [...prevMessages, data]);
    });

    // return () => {
    //   pusher.unsubscribe("user");
    // };
  }, []);

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
      await fetchMessages();
    }
  };

  return (
    <Container>
      <div className="mt-10 w-[500px] mx-auto mb-20">
        <div>
          {messages.map((message: any) => {
            return (
              <div key={message.id}>
                {message.sender_id === senderId ? (
                  <div className="bg-primary/20 py-1 px-3 rounded-lg mb-3">
                    <div className="flex w-[200px] items-center justify-between ">
                      <strong className="mb-1">
                        {message.username}
                        {/* sender  */}
                      </strong>
                    </div>
                    <div className="">{message.message}</div>
                    <div className="">{message.timeago}</div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <div className="flex w-[200px] items-center justify-between ">
                      <strong className="mb-1">{message.username}</strong>
                    </div>
                    <div className="">{message.message}</div>
                    <div className="">{message.timeago}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form  */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex items-center gap-3"
        >
          {/* <div className="flex items-center gap-3"> */}
          <Input
            placeholder="Write a message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <Button onClick={handleSubmit}>Submit</Button> */}
          {/* </div> */}
        </form>
      </div>
    </Container>
  );
};

export default Page;
