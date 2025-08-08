import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "pulse" | "dots";
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
  variant = "default",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const renderSpinner = () => {
    switch (variant) {
      case "pulse":
        return (
          <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse`}
          />
        );
      case "dots":
        return (
          <div className="flex space-x-1">
            <div
              className={`${sizeClasses.sm} rounded-full bg-blue-400 animate-bounce`}
              style={{ animationDelay: "0ms" }}
            />
            <div
              className={`${sizeClasses.sm} rounded-full bg-purple-400 animate-bounce`}
              style={{ animationDelay: "150ms" }}
            />
            <div
              className={`${sizeClasses.sm} rounded-full bg-pink-400 animate-bounce`}
              style={{ animationDelay: "300ms" }}
            />
          </div>
        );
      default:
        return (
          <div
            className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin`}
            style={{
              borderTopColor: "#00d4ff",
              borderRightColor: "#667eea",
              borderBottomColor: "#667eea",
              borderLeftColor: "#00d4ff",
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        {renderSpinner()}
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-30"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
      {message && (
        <div className="text-center">
          <p className="text-white font-medium text-lg mb-2">{message}</p>
          <div className="flex space-x-1 justify-center">
            <div
              className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <div
              className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
