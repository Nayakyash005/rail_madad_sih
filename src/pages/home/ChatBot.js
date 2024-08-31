import React from "react";

const chats = [
  {
    from: "me",
    message: "hello",
  },
  {
    from: "me",
    message: "Hi! How's it going?",
  },
];

function ChatBot() {
  return (
    <div className="h-full min-h-screen relative">

        {chats.map(chat => (
            <div>
                {chat.message}
            </div>
        ))}

      <form className="absolute bottom-1 flex w-full items-center rounded-[28px] bg-zinc-800 p-2 focus-within:shadow-md">
        <textarea
          className="w-full bg-transparent text-wrap text-white py-2 px-4 outline-none h-10 resize-none"
          placeholder="Message Gemini"
        />
        <button className="size-10 text-nowrap rounded-full bg-zinc-100 px-2 mb-0.5 text-lg font-bold text-black hover:bg-zinc-300">
          {"->"}
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
