import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { questTitle, questChallenge, questDifficulty, hintHistory } = await request.json();

    // Check if GPT API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (openaiApiKey) {
      // Use real GPT API
      return await generateRealAIHint(questTitle, questChallenge, questDifficulty, hintHistory);
    } else {
      // Fallback to scripted hints
      return await generateScriptedHint(questTitle, questChallenge, questDifficulty);
    }
  } catch (error) {
    console.error('Error generating AI hint:', error);
    return NextResponse.json(
      { error: 'Failed to generate hint' },
      { status: 500 }
    );
  }
}

async function generateRealAIHint(
  questTitle: string,
  questChallenge: string,
  questDifficulty: string,
  hintHistory: string[]
) {
  try {
    // Import OpenAI dynamically to avoid issues if not installed
    const { OpenAI } = await import('openai');
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are an expert AI prompt engineering tutor. Your job is to provide helpful, specific hints to help users write better prompts.

Context:
- Quest: ${questTitle}
- Challenge: ${questChallenge}
- Difficulty: ${questDifficulty}
- Previous hints given: ${hintHistory.length > 0 ? hintHistory.join(', ') : 'None'}

Guidelines:
1. Provide specific, actionable advice
2. Give concrete examples when possible
3. Focus on the current quest's requirements
4. Don't give away the complete answer
5. Be encouraging and supportive
6. Keep hints concise but helpful

Respond with a JSON object containing:
- hint: The helpful hint text
- confidence: A number between 0.7 and 0.95 indicating your confidence
- reasoning: Brief explanation of why this hint is helpful`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Please provide a helpful hint for this quest. Make it specific and actionable.`
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(content);
      return NextResponse.json({
        hint: parsed.hint,
        confidence: parsed.confidence || 0.85,
        reasoning: parsed.reasoning || 'AI-generated hint based on quest requirements'
      });
    } catch {
      // If not JSON, treat as plain text
      return NextResponse.json({
        hint: content,
        confidence: 0.85,
        reasoning: 'AI-generated hint'
      });
    }

  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to scripted hints
    return generateScriptedHint(questTitle, questChallenge, questDifficulty);
  }
}

function generateScriptedHint(
  questTitle: string,
  questChallenge: string,
  questDifficulty: string
) {
  // Scripted hints that look intelligent
  const scriptedHints = {
    'Prompt Basics': [
      "Start with a clear subject and ask for specific details. Try: 'Write a paragraph about the solar system, focusing on the planets and their unique characteristics.'",
      "Example structure: [Topic] + [Specific request] + [Desired output format]. Like: 'Explain the solar system in a paragraph suitable for middle school students.'",
      "Be specific about what you want. Instead of 'tell me about space', try 'describe the solar system's planets in order from the sun.'"
    ],
    'Creative Writing': [
      "Set the mood and emotion first. Try: 'Write a nostalgic poem about childhood memories of playing in the rain, using vivid sensory details.'",
      "Include emotional triggers: 'Create a poem that captures the innocence of childhood and the magic of rain, with imagery of puddles and laughter.'",
      "Mention the desired tone and style. Specify if you want it rhyming, free verse, or a particular length."
    ],
    'Image Prompting': [
      "Include visual elements: lighting, style, mood, and composition. Try: 'A neon-lit cyberpunk cityscape at night with flying cars, rain-slicked streets, and towering skyscrapers.'",
      "Add artistic style: 'Cyberpunk city at night, neon lights reflecting in puddles, cinematic lighting, detailed architecture, 4K quality.'",
      "Specify the art style, lighting, and mood. Include details about colors, atmosphere, and perspective."
    ],
    'Math Mage Challenge': [
      "Ask for step-by-step explanation: 'Solve this quadratic equation step by step, showing your work and explaining each step clearly.'",
      "Include the equation: 'Solve x² + 5x + 6 = 0 step by step, showing the factoring process and explaining why each step works.'",
      "Request detailed explanations and ask for the reasoning behind each mathematical step."
    ],
    'AI Dungeon Explorer': [
      "Set the scene and character: 'Start an epic fantasy adventure where I play as a time-traveling knight with a magical sword that glows in the presence of danger.'",
      "Include setting details: 'Begin a fantasy adventure in a mystical forest where ancient ruins hold secrets, and I'm a hero with unique abilities.'",
      "Describe your character's abilities, the setting, and what kind of adventure you want to experience."
    ]
  };

  const hints = scriptedHints[questTitle as keyof typeof scriptedHints] || [
    "Be specific about what you want. Include details about format, length, style, and target audience.",
    "Use this structure: [What you want] + [How you want it] + [For whom/why]. Example: 'Write a [description] in [format] for [audience].'",
    "Start with the main request, then add context and specifications. Be clear about your expectations."
  ];

  const randomHint = hints[Math.floor(Math.random() * hints.length)];
  const confidence = 0.8 + Math.random() * 0.15; // 0.8 to 0.95

  return NextResponse.json({
    hint: randomHint,
    confidence: confidence,
    reasoning: 'Scripted hint based on quest requirements and difficulty level'
  });
} 