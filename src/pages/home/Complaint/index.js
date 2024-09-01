import React, { useEffect, useState } from "react";
import { BG_URL } from "../auth/Signin";
// import ChatBot from "../ChatBot";
import Markdown from "react-markdown";
import { useLoaderData } from "react-router-dom";
import { cn } from "../../../lib/utils";
import styles from "./index.module.css";

function Complaint() {
  const complaintId = useLoaderData();
  const [messages, setMessages] = useState([]);
  // const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setMsg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();

    // if (!socket) {
    //   console.log("socket is null");
    //   return;
    // }

    // socket.send(msg);

    const newMsg = {
      role: "user",
      message: msg,
    };

    setMessages((prev) => [...prev, newMsg]);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/complaints/${complaintId}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.success) {
          setMessages(response.data);
        }
      })
      .catch(console.log);

    // const socket = new WebSocket("ws://localhost:8800");

    // socket.onmessage = (response) => {
    //   const newMsg = {
    //     role: "model",
    //     message: response.data,
    //   };
    //   setMessages((p) => [...p, newMsg]);
    //   console.log(newMsg);
    // };

    // setSocket(socket);

    // return () => socket?.close();
  }, []);

  return (
    <main
      style={{ backgroundImage: `url(${BG_URL})` }}
      className="w-full bg-zinc-700 bg-blend-soft-light h-[calc(100svh-60px)] flex flex-col overflow-y-scroll"
    >
      <div className="w-full flex-grow mx-auto max-w-4xl sm:px-4 md:px-8">
        <div className="min-h-screen space-y-2 px-2 py-4">
          <div className="space-y-4">
            {messages.map((chat, i) => (
              <div
                key={i}
                className={cn(
                  styles.hideScrollar,
                  "px-4 py-3 w-fit max-w-[80%] text-black rounded-2xl overflow-x-scroll",
                  chat.role === "user"
                    ? "bg-zinc-300 rounded-br-none ml-auto"
                    : "bg-blue-700 text-white rounded-bl-none"
                )}
              >
                <Markdown className="text-wrap">{chat.message}</Markdown>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-1 flex w-full items-center rounded-[28px] bg-zinc-800 p-2 focus-within:shadow-md"
        >
          <input
            className="w-full bg-transparent text-wrap text-white py-2 px-4 outline-none h-10 resize-none"
            type="text"
            placeholder="Message Gemini"
            onChange={handleChange}
          />
          <button className="size-10 text-nowrap rounded-full bg-zinc-100 px-2 mb-0.5 text-lg font-bold text-black hover:bg-zinc-300">
            {"->"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Complaint;
