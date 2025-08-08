"use client";

import { useState, useRef, useEffect } from "react";
import Message from "@/components/Message";
import TypingIndicator from "@/components/TypingIndicator";
import ChatHeader from "@/components/ChatHeader";
import QuickActions from "@/components/QuickActions";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  imageUrl?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setIsClient(true);
    // Add welcome message
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your AI assistant powered by Google Gemini. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleNewChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your AI assistant powered by Google Gemini. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
    setIsTyping(false);
    setShowQuickActions(true);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowQuickActions(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.text,
        role: "assistant",
        timestamp: new Date(),
        imageUrl: data.imageUrl,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    setShowQuickActions(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show loading screen for client initialization
  if (!isClient) {
    return (
      <div className="chat-container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <LoadingSpinner
            message="Initializing AI Assistant..."
            size="lg"
            variant="default"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <ChatHeader onNewChat={handleNewChat} />

      {/* Messages Container */}
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            role={message.role}
            timestamp={message.timestamp}
            imageUrl={message.imageUrl}
          />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <QuickActions
        onSelectPrompt={handleQuickPrompt}
        isVisible={showQuickActions && messages.length === 1}
      />

      {/* Input Container */}
      <div className="input-container">
        <div className="d-flex align-items-end gap-2">
          <div className="flex-grow-1">
            <input
              ref={inputRef}
              type="text"
              className="form-control message-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
          <button
            className="btn send-button position-relative overflow-hidden"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            style={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Shimmer effect on hover */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                backgroundSize: "200% 100%",
                opacity: 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.animation = "shimmer 1.5s ease-in-out";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0";
                e.currentTarget.style.animation = "none";
              }}
            />

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "relative",
                zIndex: 1,
                transition: "transform 0.3s ease",
              }}
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div
          className="mt-3 text-center"
          style={{
            animation: "fadeIn 0.8s ease-out 0.5s both",
          }}
        >
          <small
            className="text-muted d-flex align-items-center justify-content-center gap-2"
            style={{ fontSize: "0.8rem" }}
          >
            <span className="text-white">ChatGPT Clone</span>
            <span style={{ opacity: 0.5, color: "white" }}>•</span>
            <span className="text-white">Powered by Google Gemini AI</span>
            <div
              className="rounded-circle"
              style={{
                width: "4px",
                height: "4px",
                background: "var(--accent-color)",
                animation: "pulse 2s infinite",
              }}
            />
          </small>
        </div>
      </div>
    </div>
  );
}
