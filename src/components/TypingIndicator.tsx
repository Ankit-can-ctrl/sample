import { useState, useEffect } from "react";

export default function TypingIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const [dots, setDots] = useState([false, false, false]);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Staggered dot animation
    const dotTimer = setInterval(() => {
      setDots((prev) => {
        const newDots = [...prev];
        const nextIndex = newDots.findIndex((dot) => !dot);
        if (nextIndex !== -1) {
          newDots[nextIndex] = true;
        } else {
          // Reset all dots
          return [false, false, false];
        }
        return newDots;
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <div
      className="typing-indicator position-relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Animated background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)",
          opacity: 0.3,
          animation: "backgroundShift 4s ease-in-out infinite",
        }}
      />

      <div className="d-flex align-items-center gap-2 position-relative">
        {/* AI Avatar */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #00d4ff, #667eea)",
            boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            animation: "pulse 2s infinite",
          }}
        >
          <span className="text-white fw-bold" style={{ fontSize: "0.8rem" }}>
            AI
          </span>
        </div>

        {/* Typing dots */}
        <div className="d-flex align-items-center gap-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="typing-dot"
              style={{
                opacity: dots[index] ? 1 : 0.3,
                transform: dots[index] ? "scale(1.2)" : "scale(0.8)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Typing text */}
        <span
          className="text-muted d-flex align-items-center gap-1"
          style={{ fontSize: "0.85rem" }}
        >
          <span>AI is typing</span>
          <span
            style={{
              animation: "blink 1.5s infinite",
              opacity: dots.some((dot) => dot) ? 1 : 0.5,
            }}
          >
            ...
          </span>
        </span>
      </div>
    </div>
  );
}
