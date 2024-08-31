import React, { useState } from "react";
import ComplaintForm from "./ComplaintForm";
import { BG_URL } from "./auth/Signin";
import { toast } from "react-toastify";

import ChatBot from "./ChatBot";

export default function Home() {
  const [ShowChatbot, setShowChatbot] = useState(false);
  return (
    <main
      style={{ backgroundImage: `url(${BG_URL})` }}
      className="w-full bg-zinc-700 bg-blend-soft-light min-h-screen flex flex-col"
    >
      <div className="w-full flex-grow mx-auto max-w-4xl sm:px-4 md:px-8">
        {!ShowChatbot ? (
          <ComplaintForm setShowChatbot={setShowChatbot} />
        ) : (
          <ChatBot />
        )}
      </div>
    </main>
  );
}
