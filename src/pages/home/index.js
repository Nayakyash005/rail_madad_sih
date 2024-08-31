import React from "react";
import ComplaintForm from "./ComplaintForm";
import { BG_URL } from "./auth/Signin";
import ChatBot from "./ChatBot";

export default function Home() {
  return (
    <main
      style={{ backgroundImage: `url(${BG_URL})` }}
      className="w-full bg-zinc-700 bg-blend-soft-light h-[calc(100svh-60px)] flex flex-col overflow-y-scroll"
    >
      <div className="w-full flex-grow mx-auto max-w-4xl sm:px-4 md:px-8">
        <ComplaintForm />
        <ChatBot />
      </div>
    </main>
  );
}
