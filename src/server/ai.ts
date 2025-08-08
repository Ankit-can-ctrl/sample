import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if Gemini API key is available
const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;

// Initialize Gemini only if API key is available
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;
const textModel = genAI?.getGenerativeModel({ model: "gemini-1.5-flash" });
const imageModel = genAI?.getGenerativeModel({ model: "gemini-1.5-pro" });

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  text: string;
  imageUrl?: string;
}

export class AIService {
  static async generateText(messages: ChatMessage[]): Promise<string> {
    if (!textModel) {
      // Fallback response when API key is not available
      return "I'm currently in development mode. Please set up your Google Gemini API key to enable AI responses. You can get one at https://ai.google.dev/";
    }

    try {
      const chat = textModel.startChat({
        history: messages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(
        messages[messages.length - 1].content
      );
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating text:", error);
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    }
  }

  static async generateImage(prompt: string): Promise<string | null> {
    if (!imageModel) {
      return null;
    }

    try {
      // Note: Gemini 1.5 Pro is multimodal but doesn't generate images like DALL-E
      // This is a placeholder for when you want to integrate a proper image generation service
      const result = await imageModel.generateContent([
        prompt,
        "Please describe an image based on this prompt.",
      ]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  }

  static async generateTextAndImage(prompt: string): Promise<AIResponse> {
    const text = await this.generateText([
      {
        role: "user",
        content: prompt,
        timestamp: new Date(),
      },
    ]);

    // Check if the prompt is asking for an image
    const imageKeywords = [
      "image",
      "picture",
      "photo",
      "draw",
      "generate image",
      "create image",
    ];
    const isImageRequest = imageKeywords.some((keyword) =>
      prompt.toLowerCase().includes(keyword)
    );

    let imageUrl: string | undefined;
    if (isImageRequest) {
      const imageDescription = await this.generateImage(prompt);
      if (imageDescription) {
        // For now, return a placeholder image URL
        // In a real app, you'd integrate with an image generation service
        imageUrl = `https://via.placeholder.com/400x300/10a37f/ffffff?text=${encodeURIComponent(
          imageDescription
        )}`;
      }
    }

    return {
      text,
      imageUrl,
    };
  }
}
