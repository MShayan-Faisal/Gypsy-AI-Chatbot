import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "./openai";

const App = () => {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I assist you today?", isBot: true },
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text) return;

    setMessages((prev) => [...prev, { text, isBot: false }]);
    setInput("");

    const res = await sendMessage(text);

    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend(input);
    }
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-4">Gypsy CodeArt</h2>

        <button
          className="bg-blue-500 px-3 py-2 rounded mb-4"
          onClick={() => window.location.reload()}
        >
          New Chat
        </button>

        <button
          className="block mb-2"
          onClick={() => handleSend("What is Programming?")}
        >
          What is Programming?
        </button>

        <button
          onClick={() => handleSend("How does React work?")}
        >
          How does React work?
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${msg.isBot ? "text-blue-500" : "text-black"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={msgEnd}></div>
        </div>

        <div className="p-4 border-t flex">
          <input
            className="flex-1 border p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type a message..."
          />

          <button
            className="ml-2 bg-blue-500 text-white px-4"
            onClick={() => handleSend(input)}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;