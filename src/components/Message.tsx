"use client";

import { useState, useEffect } from "react";

interface MessageProps {
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  imageUrl?: string;
}

export default function Message({
  content,
  role,
  timestamp,
  imageUrl,
}: MessageProps) {
  const [formattedTime, setFormattedTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setFormattedTime(
      timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [timestamp]);

  return (
    <div
      className={`message ${role} d-flex ${
        role === "user" ? "justify-content-end" : "justify-content-start"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.95)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="rounded p-3 position-relative overflow-hidden"
        style={{
          maxWidth: "80%",
          // borderRadius: "16px",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(255, 255, 255, 0.05)",
          color: "white",
          boxShadow:
            role === "user"
              ? "0 4px 15px rgba(102, 126, 234, 0.2)"
              : "0 4px 15px rgba(44, 62, 80, 0.2)",
        }}
      >
        {/* Shimmer effect on hover */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
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

        <div className="mb-2 d-flex align-items-center gap-2">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "24px",
              height: "24px",
              fontSize: "0.7rem",
              fontWeight: "bold",
              background:
                role === "user"
                  ? "rgba(102, 126, 234, 0.8)"
                  : "rgba(0, 212, 255, 0.8)",
              color: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {role === "user" ? "U" : "AI"}
          </div>
          <small className=" align-items-center gap-1">
            <span style={{ fontSize: "0.75rem" }}>
              {role === "user" ? "You" : "AI Assistant"}
            </span>
            <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>•</span>
            <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>
              {formattedTime}
            </span>
          </small>
        </div>

        <div
          className="message-content"
          style={{
            lineHeight: "1.5",
            wordBreak: "break-word",
          }}
        >
          {content}
        </div>

        {imageUrl && role === "assistant" && (
          <div
            className="mt-3 position-relative"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={imageUrl}
              alt="AI Generated"
              className="img-fluid"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "12px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
