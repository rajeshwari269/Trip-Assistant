import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import "./chatbot.css";
import { handleError } from "../utils/errorHandlerToast";

interface Message {
  text: string;
  type: "user" | "bot";
  isLoading?: boolean;
  isError?: boolean;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const userMessage = input?.value?.trim();

    if (!userMessage) return;

    // Add user message
    setMessages((prev: Message[]) => [...prev, { text: userMessage, type: "user" }]);
    input.value = "";

    try {
      const res = await fetch(`${apiBaseUrl}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      // Add loading state for UI feedback
      setMessages((prev: Message[]) => [
        ...prev,
        { text: "Thinking...", type: "bot", isLoading: true }
      ]);

      const data = await res.json();
      
      // Remove the loading message
      setMessages((prev: Message[]) => prev.filter(msg => !msg.isLoading));
      
      if (data.error) {
        setMessages((prev: Message[]) => [
          ...prev,
          { text: `Sorry, I couldn't process your request: ${data.error}`, type: "bot" },
        ]);
      } else {
        setMessages((prev: Message[]) => [
          ...prev,
          { text: data.message || "No response from bot.", type: "bot" },
        ]);
      }
    } catch (error) {
      // Remove the loading message if it exists
      setMessages((prev: Message[]) => prev.filter(msg => !msg.isLoading));
      
      // Get a user-friendly error message
      const errorMsg = handleError(
        error, 
        "Sorry, I couldn't connect to my brain right now. Please try again in a moment."
      );
      
      setMessages((prev: Message[]) => [
        ...prev, 
        { text: errorMsg, type: "bot", isError: true }
      ]);
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
          messages.map((msg: Message, index: number) => (
            <div
              key={`${msg.type}-${index}-${msg.text.substring(0, 10)}`}
              className={`chatbot-message p-2 rounded mb-1 ${
                msg.type === "user" ? "user-message" : "bot-message"
              } ${msg.isError ? "error-message" : ""} ${msg.isLoading ? "loading-message" : ""}`}
            >
              {msg.isLoading ? (
                <div className="d-flex align-items-center">
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  {msg.text}
                </div>
              ) : msg.isError ? (
                <div className="d-flex align-items-center text-danger">
                  <span className="me-2">⚠️</span>
                  {msg.text}
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))
        )}
      </div>

      <form className="chatbot-footer p-2 d-flex" onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          className="form-control"
          placeholder="Type a message..."
        />
        <button type="submit" className="btn btn-primary ms-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
