import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./Chatbot.css";

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ text: string; type: "user" | "bot" }[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.message;
    const userMessage = input.value.trim();

    if (!userMessage) return;

    // Add user message
    setMessages((prev) => [...prev, { text: userMessage, type: "user" }]);
    input.value = "";

    try {
      const res = await fetch("http://localhost:3000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: userMessage })
      });

      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [...prev, { text: `Error: ${data.error}`, type: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: JSON.stringify(data, null, 2), type: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Request failed", type: "bot" }]);
    }
  };

  return (
    <div className="chatbot-container card shadow">
      <div className="chatbot-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
        <h6 className="m-0">Travel Assistant</h6>
        <button className="btn btn-sm btn-light" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="chatbot-body p-2" ref={chatRef}>
        {messages.length === 0 ? (
          <p className="text-muted">Hello! How can I assist you?</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbot-message p-2 rounded mb-1 ${msg.type === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      <form className="chatbot-footer p-2 d-flex" onSubmit={handleSendMessage}>
        <input type="text" name="message" className="form-control" placeholder="Type a message..." />
        <button type="submit" className="btn btn-primary ms-2">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
