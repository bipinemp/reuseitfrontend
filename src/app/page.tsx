"use client";

import { makeOffline, makeOnline } from "@/apis/apicalls";
import Products from "@/components/home/Products";
import { useSearchStore } from "@/store/store";
import { useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000", { autoConnect: false });

export default function Home() {
  const { setSearch } = useSearchStore();

  useEffect(() => {
    setSearch("");
  }, []);

  useEffect(() => {
    // Connect to the server when the component mounts
    socket.connect();

    // Send an API request when the user opens the website
    makeOnline()
      .then((response: any) => {
        socket.emit("apiRequest", {
          type: "open",
          data: response?.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // Listen for the 'beforeunload' event
    window.addEventListener("beforeunload", () => {
      // Send an API request when the user closes the website
      makeOffline()
        .then((response: any) => {
          socket.emit("apiRequest", { type: "close", data: response?.data });
        })
        .catch((error) => {
          console.error(error);
        });

      // Disconnect from the server
      socket.disconnect();
    });

    // Cleanup function
    return () => {
      window.removeEventListener("beforeunload", makeOffline);
    };
  }, []); // Empty dependency array ensures that this effect runs once

  // Rest of your component code

  // useEffect(() => {
  // makeOnline();
  // window.onbeforeunload = () => makeOffline();
  // window.addEventListener("beforeunload", () => {
  //   makeOffline();
  // });
  // return () => {
  //   window.removeEventListener("beforeunload", () => {
  //     makeOffline();
  //   });
  // };
  // }, []);

  return <main>{/* <Products /> */}</main>;
}
