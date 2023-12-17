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
import { ImagePlus, Loader2, Send, X } from "lucide-react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { MessageChatSchema, TMsgType } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";

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
    parseInt(id) || 0
  );

  const [messages, setMessages] = useState<MsgData[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();

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

  useEffect(() => {
    const pusher = new Pusher("ebf38d954ac2b949a6ca", {
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

  // for scrolling to bottom of chats
  useEffect(() => {
    if (bottomOfChatsRef.current) {
      bottomOfChatsRef.current.scrollIntoView();
    }
  }, [messages]);

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
                    <div className="flex flex-col gap-3 items-end">
                      <div className="w-fit px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
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
                    <div className="flex gap-2 items-center">
                      <div className="relative w-[60px] h-[50px]">
                        <Image
                          src={imgurl + userDetails?.Profile_image}
                          fill
                          alt=""
                          className="rounded-full object-cover object-top"
                        />
                        {userDetails?.ActiveStatus === 1 && (
                          <span className="absolute w-[15px] h-[15px] bg-green-600 bottom-0 right-0 z-20 rounded-full border-[1px] border-white"></span>
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
                        <div className="w-full px-3 py-2 bg-zinc-200 rounded-lg text-sm">
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

      {/* Form  */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-3 mt-4"
      >
        <div className="w-full flex items-center gap-3">
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
                    <ImagePlus className="w-8 h-8 text-gray-700 hover:text-gray-900 transition" />
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
            <div className="relative w-[55px] h-[50px]">
              <Image
                src={URL.createObjectURL(selectedImage)}
                fill
                alt=""
                className="object-contain border-[2px] border-primary rounded-md p-1 z-10"
              />
              <span
                onClick={() => setSelectedImage(undefined)}
                className="absolute flex items-center justify-center z-20 cursor-pointer -top-1 -right-1 p-1 rounded-full bg-gray-700 hover:bg-black transition"
              >
                <X className="w-3 h-3 text-white text-center" />
              </span>
            </div>
          )}

          <Input
            {...register("message")}
            name="message"
            placeholder="Write a message"
            type="text"
            className="border-content"
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
