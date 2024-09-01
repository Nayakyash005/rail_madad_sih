import React, { useState } from "react";
import ComplaintForm from "./ComplaintForm";
import { BG_URL } from "./auth/Signin";
// import { toast } from "react-toastify";

// import ChatBot from "./ChatBot";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function showChatbot(complaintId) {
    navigate("/complaint/" + complaintId);
  }

  return (
    <main
      style={{ backgroundImage: `url(${BG_URL})` }}
      className="w-full bg-zinc-700 bg-blend-soft-light h-[calc(100svh-60px)] flex flex-col overflow-y-scroll"
    >
      <div className="w-full flex-grow mx-auto max-w-4xl sm:px-4 md:px-8">
        <ComplaintForm setShowChatbot={showChatbot} />
      </div>
    </main>
  );
}
