"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      body: JSON.stringify({ content: message }),
      headers: { "Content-Type": "application/json" },
    });
    const newMessage = await res.json();
    setConversation([...conversation, newMessage]);
    setMessage("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Help Chat</h1>
      <div className="space-y-4">
        {conversation.map((msg, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded">
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mt-4"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Send
      </button>
    </div>
  );
}
