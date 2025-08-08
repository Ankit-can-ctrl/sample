import { NextRequest, NextResponse } from "next/server";
import { AIService } from "@/server/ai";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Convert history to the format expected by AIService
    const chatHistory = history.map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content,
      timestamp: new Date(),
    }));

    // Add the current message to history
    chatHistory.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    // Generate response using the AI service
    const response = await AIService.generateTextAndImage(message);

    return NextResponse.json({
      text: response.text,
      imageUrl: response.imageUrl,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
