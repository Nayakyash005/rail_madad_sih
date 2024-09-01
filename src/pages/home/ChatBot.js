import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const sample_chats = [
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
  {
    role: "user",
    message: "hello",
  },
  {
    role: "model",
    message: "Hi! How's it going?",
  },
];

function ChatBot({chats = sample_chats}) {
  const [messages, setMesseges] = useState(chats);
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");

  return (
    <>
      <div className="min-h-screen space-y-2 px-2 py-4">
        <div className="space-y-4">
          {messages.map((chat) => (
            <div
              className={cn(
                "px-4 py-3 w-fit max-w-[80%] text-black rounded-2xl",
                chat.role === "user"
                  ? "bg-zinc-300 rounded-br-none ml-auto"
                  : "bg-blue-700 text-white rounded-bl-none"
              )}
            >
              {chat.message}
            </div>
          ))}
        </div>
      </div>
      <form className="sticky bottom-1 flex w-full items-center rounded-[28px] bg-zinc-800 p-2 focus-within:shadow-md">
        <textarea
          className="w-full bg-transparent text-wrap text-white py-2 px-4 outline-none h-10 resize-none"
          placeholder="Message Gemini"
        />
        <button className="size-10 text-nowrap rounded-full bg-zinc-100 px-2 mb-0.5 text-lg font-bold text-black hover:bg-zinc-300">
          {"->"}
        </button>
      </form>
    </>
  );
}

export default ChatBot;
