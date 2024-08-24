import { NextResponse } from "next/server";
import OpenAI from 'openai'; 

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.

1. **Input Processing**:
   - Carefully read the provided text and identify key concepts, definitions, terms, or important information.
   
2. **Flashcard Creation**:
   - Generate exactly 10 flashcards based on the most important content from the text.
   - Each flashcard should consist of a front and a back. 
   - The front should contain a question, term, or concept (one sentence long).
   - The back should provide a definition, explanation, or answer (one sentence long).

3. **Content Guidelines**:
   - Ensure each flashcard is clear, concise, and focused on a single idea.
   - Avoid overly complex sentences. Stick to one idea per flashcard.
   - Balance the information: make sure all 10 flashcards are spread across different key points of the text.
   
4. **Structure**:
   - Front: Write a prompt or term related to the content (e.g., "What is photosynthesis?" or "Definition of entropy").
   - Back: Provide a direct answer or brief explanation (e.g., "Photosynthesis is the process by which plants convert sunlight into energy." or "Entropy is a measure of disorder in a system.").

5. **Output**:
   - Return the 10 flashcards in a structured format, ready for use in a study tool or application.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    })

    console.log(completion.choices[0].message.content)
  
    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)
  
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }

