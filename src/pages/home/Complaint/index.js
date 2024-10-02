import React, { useEffect, useState } from "react";
// import ChatBot from "../ChatBot";
import Markdown from "react-markdown";
import { useLoaderData } from "react-router-dom";
import { cn } from "../../../lib/utils";
import styles from "./index.module.css";

function Complaint() {
  const complaintId = useLoaderData();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    e.target.rows = 2;
    const newRows = Math.floor(e.target.scrollHeight / 24);
    e.target.rows = Math.min(5, newRows);

    setMsg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();

    if (!socket) {
      console.log("socket is null");
      return;
    }

    socket.send(msg);

    const newMsg = {
      role: "user",
      message: msg,
    };

    setMessages((prev) => [...prev, newMsg]);
    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    },100);
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

    const socket = new WebSocket("ws://localhost:8800");

    socket.onmessage = (response) => {
      const newMsg = {
        role: "model",
        message: response.data,
      };
      setMessages((p) => [...p, newMsg]);

      setTimeout(() => {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
      },100);
    };

    setSocket(socket);

    return () => socket?.close();
  }, []);

  return (
    <>
      <main className="w-full mb-16 bg-blend-soft-light flex flex-col">
        <div className="w-full flex-grow mx-auto max-w-4xl sm:px-4 md:px-8">
          <div className="space-y-2 px-2 py-4">
            <div className="space-y-4">
              {messages.map((chat, i) => (
                <div
                  key={i}
                  className={cn(
                    styles.hideScrollar,
                    "px-4 py-3 w-fit max-w-[80%] text-black rounded-2xl overflow-x-scroll",
                    chat.role === "user"
                      ? "bg-white rounded-br-none ml-auto"
                      : "bg-rail-light text-white rounded-bl-none"
                  )}
                >
                  <Markdown className="text-wrap">{chat.message}</Markdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-1 w-full">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex w-full items-center rounded-3xl bg-gray-100 p-1 focus-within:shadow-md"
        >
          <textarea
            className="w-full bg-transparent text text-wrap py-2 px-4 outline-none resize-none"
            type="text"
            placeholder="Message Gemini"
            onChange={handleChange}
          />
          <button className="size-11 self-end text-nowrap rounded-full bg-black px-2 mb-0.5 text-lg font-bold text-white hover:bg-zinc-700">
            {"->"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Complaint;
