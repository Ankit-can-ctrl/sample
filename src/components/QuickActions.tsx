import { useState, useEffect } from 'react';

interface QuickActionsProps {
  onSelectPrompt: (prompt: string) => void;
  isVisible: boolean;
}

const quickPrompts = [
  "Write a professional email",
  "Explain a complex topic",
  "Help me brainstorm ideas",
  "Write a short story",
  "Analyze this text",
  "Create a to-do list"
];

export default function QuickActions({ onSelectPrompt, isVisible }: QuickActionsProps) {
  const [visibleButtons, setVisibleButtons] = useState<boolean[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Staggered animation for buttons
      quickPrompts.forEach((_, index) => {
        setTimeout(() => {
          setVisibleButtons(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 100);
      });
    } else {
      setVisibleButtons([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="quick-actions mb-3"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div className="d-flex flex-wrap gap-2">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            className="btn btn-outline-light btn-sm position-relative overflow-hidden"
            onClick={() => onSelectPrompt(prompt)}
            style={{
              fontSize: '0.85rem',
              opacity: visibleButtons[index] ? 1 : 0,
              transform: visibleButtons[index] ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
              transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
              borderRadius: "20px",
              padding: "0.75rem 1.25rem",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "var(--text-secondary)",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 212, 255, 0.3)";
              e.currentTarget.style.borderColor = "var(--accent-color)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            }}
          >
            {/* Shimmer effect */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                backgroundSize: "200% 100%",
                opacity: 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none"
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
            
            {/* Icon based on prompt type */}
            <span className="me-2" style={{ fontSize: "0.8rem" }}>
              {prompt.includes("email") && "📧"}
              {prompt.includes("explain") && "📚"}
              {prompt.includes("brainstorm") && "💡"}
              {prompt.includes("story") && "📖"}
              {prompt.includes("analyze") && "🔍"}
              {prompt.includes("to-do") && "✅"}
            </span>
            
            <span style={{ position: "relative", zIndex: 1 }}>
              {prompt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
