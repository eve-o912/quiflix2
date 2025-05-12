import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || query.trim() === "") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Prompt for AI to understand the context
    const systemPrompt = `
      You are a film recommendation assistant for Quiflix, a blockchain-based streaming platform.
      Users can purchase films with cryptocurrency or subscribe to the platform.
      When a user searches for films, provide thoughtful recommendations based on their query.
      Format your response as follows:
      1. A brief introduction explaining your recommendations (2-3 sentences)
      2. List 4-5 relevant films with their genres and years
      3. Suggest 3-4 related search terms they might be interested in
    `

    // Generate recommendations using AI
    const { text } = await generateText({
      model: "gemini-pro",
      prompt: `${systemPrompt}\n\nUser search query: "${query}"`,
      maxTokens: 500,
      apiKey: process.env.GEMINI_API_KEY,
    })

    // Parse the AI response to extract structured data
    // This is a simplified approach - in production you might want to use a more robust parsing method
    // or have the AI return structured JSON directly

    const lines = text.split("\n").filter((line) => line.trim() !== "")

    // Extract introduction (first paragraph)
    const introduction = lines[0]

    // Extract film recommendations
    const filmRecommendations = []
    const filmRegex = /[•\-*]\s*(.*?)(?:\s*$$(\d{4})$$)?(?:\s*-\s*(.*?))?$/

    let i = 1
    while (i < lines.length && filmRecommendations.length < 5) {
      const match = lines[i].match(filmRegex)
      if (match) {
        const [_, title, year, genre] = match
        if (title) {
          filmRecommendations.push({
            id: `ai-${filmRecommendations.length + 1}`, // Generate placeholder IDs
            title: title.trim(),
            year: year || "2023",
            genre: genre || "Film",
            thumbnail: "/placeholder.svg?height=169&width=300",
            price: (0.00049 + Math.random() * 0.0005).toFixed(5),
            relevance: `${Math.floor(85 + Math.random() * 15)}% match`,
          })
        }
      }
      i++
    }

    // Extract related search suggestions
    const suggestions = []
    const suggestionRegex = /[•\-*]\s*(.*?)$/

    while (i < lines.length && suggestions.length < 4) {
      const match = lines[i].match(suggestionRegex)
      if (match && match[1]) {
        suggestions.push(match[1].trim())
      }
      i++
    }

    // If we couldn't extract enough suggestions, generate some based on the query
    if (suggestions.length < 3) {
      suggestions.push(`More films like "${query}"`, `${query} documentaries`, `Best rated ${query} films`)
    }

    return NextResponse.json({
      text: introduction,
      results: filmRecommendations,
      suggestions,
    })
  } catch (error) {
    console.error("Error in search API:", error)
    return NextResponse.json({ error: "Failed to process search request" }, { status: 500 })
  }
}
