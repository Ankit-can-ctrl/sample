# Deployment Guide - Simplified Chat Application

## Overview

This is a simplified ChatGPT clone that uses only Google Gemini API for AI responses. All Auth0, Supabase, and tRPC dependencies have been removed.

## Environment Variables

You only need to set one environment variable:

```
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

## Deployment Steps

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Create a new API key
3. Copy the API key

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `GOOGLE_GEMINI_API_KEY`
   - Value: Your Google Gemini API key
6. Click "Deploy"

#### Option B: Deploy via CLI

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --env GOOGLE_GEMINI_API_KEY=your_api_key_here --prod`

### 3. Local Development

1. Copy `env.template` to `.env.local`
2. Add your Google Gemini API key
3. Run: `npm run dev`

## Features

- ✅ Simple chat interface
- ✅ Google Gemini AI integration
- ✅ Real-time typing indicators
- ✅ Message history
- ✅ New chat functionality
- ✅ Mobile-responsive design

## Troubleshooting

- If you see the default Next.js page, check that your environment variables are set correctly
- Make sure your Google Gemini API key is valid and has proper permissions
- Check the Vercel deployment logs for any errors
