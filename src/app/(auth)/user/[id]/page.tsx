"use client";

import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import {
  useGetLatestMessages,
  useGetUserDataInInterval,
  useUserProfile,
} from "@/apis/queries";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ImagePlus, Loader2, Send, X } from "lucide-react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { MessageChatSchema, TMsgType } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useShowUsers } from "@/store/store";

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
  msg_image: File;
};

const Page: React.FC<UserProps> = ({ params }) => {
  const router = useRouter();
  const { showUsers, users } = useShowUsers();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { register, handleSubmit, control, reset, getValues } =
    useForm<TMsgType>({
      resolver: zodResolver(MessageChatSchema),
    });

  const { id } = params;
  const { data } = useUserProfile();
  const inputImgRef = useRef<HTMLInputElement>(null);

  const { data: userDetails, isPending: userDetailPending } =
    useGetUserDataInInterval(parseInt(id));

  const { data: msgData, isPending } = useGetLatestMessages(
    data?.id || 0,
    parseInt(id) || 0,
  );

  const [messages, setMessages] = useState<MsgData[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (msgData) {
      setMessages(msgData);
    }
  }, [msgData]);

  const bottomOfChatsRef = useRef<HTMLSpanElement>(null);
  const senderId = data?.id;

  const roomId = createRoomId(senderId, id);
  function createRoomId(user1: any, user2: any) {
    const sortedIds = [user1, user2].sort();
    return sortedIds.join("_");
  }

  // pusher logic for sending and receiving message in Real-Time
  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: "ap2",
      },
    );

    const channel = pusher.subscribe(`user.${roomId}`);

    channel.bind("message", function (data: any) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    channel.bind("isTyping", function (value: any) {
      // Check if the typing status is for the current user
      if (value.sender_id !== data?.id) {
        setIsTyping(value.status);
      }
    });

    return () => {
      pusher.unsubscribe(`user.${roomId}`);
    };
  }, [senderId, id, data?.id]);

  // for scrolling to bottom of chats
  useEffect(() => {
    if (bottomOfChatsRef.current) {
      bottomOfChatsRef.current.scrollIntoView();
    }
  }, [messages]);

  // for chat sidebar responsive
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // for submitting message
  const onSubmit = async (data: TMsgType) => {
    const actual_Data = {
      ...data,
      id,
    };
    try {
      if (data.message || data.msg_image) {
        await axios.post("http://localhost:8000/api/messages", actual_Data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setSelectedImage(undefined);
    }
  };

  const imgurl = "http://127.0.0.1:8000/images/";
  const msgimgurl = "http://127.0.0.1:8000/msg_images/";

  if (isPending) {
    return (
      <div className="flex h-[80%] w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const handletyping = () => {
    fetch("http://localhost:8000/api/typing", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id, // Adjusted to match your Laravel API expectations
      }),
    });
  };
  const handlenottyping = () => {
    fetch("http://localhost:8000/api/notTyping", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id, // Adjusted to match your Laravel API expectations
      }),
    });
  };

  return (
    <div
      className={cn("relative hidden h-full w-full flex-col md:flex", {
        flex: users,
      })}
    >
      <div className="z-20 flex items-center gap-2 rounded-tl-md rounded-tr-md border-b border-primary bg-zinc-200 px-4 py-3 shadow">
        <span
          onClick={() => {
            router.push("/user");
            showUsers(false);
          }}
          className="cursor-pointer rounded-full p-3 transition hover:bg-primary/20 md:hidden"
        >
          <ChevronLeft className="h-7 w-7 stroke-primary" strokeWidth={3} />
        </span>

        <div className="relative flex h-[40px] w-[40px] flex-col">
          <Image
            src={imgurl + userDetails?.Profile_image}
            fill
            className="z-10 rounded-full border border-content object-cover object-top"
            alt=""
          />
          {userDetails?.ActiveStatus === 1 && (
            <span className="absolute -right-1 bottom-0 z-20 h-[15px] w-[15px] rounded-full border-[1px] border-white bg-green-600"></span>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-gray-700">
            {userDetails?.name}
          </h3>
          <p className="text-xs font-semibold">
            {userDetails?.ActiveStatus === 1
              ? "Online"
              : `Active ${userDetails?.Timeago}`}
          </p>
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-10 overflow-y-auto overflow-x-hidden rounded-bl-md rounded-br-md bg-zinc-50 px-2 pt-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-[100px] w-[100px]">
            <Image
              src={imgurl + userDetails?.Profile_image}
              fill
              className="rounded-full border border-black object-cover object-top"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-sm font-bold text-gray-500">
              {userDetails?.name}
            </h3>
            {userDetails?.District ||
            userDetails?.Municipality ||
            userDetails?.Province ? (
              <p className="text-xs text-gray-500">
                Lives in {userDetails?.District}, {userDetails?.Municipality}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {messages.map((message: any) => {
            return (
              <div key={message.id} className="flex w-full flex-col">
                {message.sender_id === senderId ? (
                  <div className="flex max-w-[350px] flex-col justify-end gap-2 self-end">
                    <p className="text-[0.7rem] text-gray-700">
                      {message.timeago}
                    </p>
                    <div className="flex flex-col items-end gap-3">
                      <div className="w-fit rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                        {message.message}
                      </div>
                      {message.msg_image && (
                        <Image
                          src={msgimgurl + message.msg_image}
                          width={200}
                          height={150}
                          alt=""
                          className="rounded-lg border border-content"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[350px]">
                    <div className="flex items-center gap-2">
                      <div className="relative h-[50px] w-[60px]">
                        <Image
                          src={imgurl + userDetails?.Profile_image}
                          fill
                          alt=""
                          className="rounded-full object-cover object-top"
                        />
                        {userDetails?.ActiveStatus === 1 && (
                          <span className="absolute bottom-0 right-0 z-20 h-[15px] w-[15px] rounded-full border-[1px] border-white bg-green-600"></span>
                        )}
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex justify-between">
                          <p className="text-xs font-bold text-gray-700">
                            {message.username.split(" ")[0]}
                          </p>
                          <p className="text-xs text-gray-700">
                            {message.timeago}
                          </p>
                        </div>
                        <div className="w-full rounded-lg bg-zinc-200 px-3 py-2 text-sm">
                          {message.message}
                        </div>
                        {message.msg_image && (
                          <Image
                            src={msgimgurl + message.msg_image}
                            width={200}
                            height={150}
                            alt=""
                            className="rounded-lg border border-content"
                          />
                        )}
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

      {isTyping && (
        <div className="flex h-[30px] w-[100px] items-center justify-center space-x-2">
          <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
        </div>
      )}

      {/* Form  */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex w-full items-center gap-3"
      >
        <div className="flex w-full items-center gap-3">
          <Controller
            name="msg_image"
            control={control}
            render={({ field }) => {
              return (
                <div className="relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => inputImgRef?.current?.click()}
                  >
                    <ImagePlus className="h-10 w-10 text-gray-700 transition hover:text-gray-900" />
                  </div>
                  <input
                    ref={inputImgRef}
                    type="file"
                    name="msg_image"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                      setSelectedImage(e.target.files?.[0]);
                    }}
                    hidden
                    accept="image/jpg, image/jpeg, image/png, image/webp"
                  />
                </div>
              );
            }}
          />
          {selectedImage && (
            <div className="relative h-[50px] w-[55px]">
              <Image
                src={URL.createObjectURL(selectedImage)}
                fill
                alt=""
                className="z-10 rounded-md border-[2px] border-primary object-contain p-1"
              />
              <span
                onClick={() => setSelectedImage(undefined)}
                className="absolute -right-1 -top-1 z-20 flex cursor-pointer items-center justify-center rounded-full bg-gray-700 p-1 transition hover:bg-black"
              >
                <X className="h-3 w-3 text-center text-white" />
              </span>
            </div>
          )}

          <Input
            {...register("message")}
            name="message"
            placeholder="Write a message"
            type="text"
            className="border-content"
            onFocus={handletyping}
            onBlur={handlenottyping}
          />

          <Button>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
