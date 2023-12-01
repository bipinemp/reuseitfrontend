"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useUserProfile } from "@/apis/queries";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";

interface Props {
  id: string;
}

interface UserProps {
  params: Props;
}

const Page: React.FC<UserProps> = ({ params }) => {
  const { id } = params;
  const { data } = useUserProfile();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const senderId = data?.id;
  const receiverId = id;

  const roomId = createRoomId(senderId, receiverId);
  function createRoomId(user1: any, user2: any) {
    const sortedIds = [user1, user2].sort();
    return sortedIds.join("_");
  }

  useEffect(() => {
    const pusher = new Pusher("ebf38d954ac2b949a6ca", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe(`user.${roomId}`); // Adjusted channel name to match Laravel setup
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    channel.bind("message", handleMessage);
    const fetchMessages = async () => {
      const response = await fetch(`http://localhost:8000/api/messages/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      setMessages(data.messages);
    };
    fetchMessages();
    return () => {
      channel.unbind("message", handleMessage);
      pusher.unsubscribe(`user.${roomId}`);
    };
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/messages", {
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
    setMessage("");
  };

  return (
    <Container>
      <div className="mt-10 w-[500px] mx-auto mb-20">
        <div>
          {messages.map((message: any) => (
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
          ))}
        </div>

        {/* Form  */}
        <form onSubmit={(e) => submit(e)}>
          <Input
            placeholder="Write a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </Container>
  );
};

export default Page;
