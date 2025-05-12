import { generateText } from "ai"

export async function queryGemini(prompt: string, maxTokens = 500) {
  try {
    const { text } = await generateText({
      model: "gemini-pro",
      prompt,
      maxTokens,
      apiKey: process.env.GEMINI_API_KEY,
    })

    return { text, error: null }
  } catch (error) {
    console.error("Error querying Gemini:", error)
    return {
      text: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export function parseFilmRecommendations(text: string) {
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
          id: `ai-${filmRecommendations.length + 1}`,
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

  return {
    introduction,
    filmRecommendations,
    suggestions,
  }
}
