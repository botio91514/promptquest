import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export async function POST(request: NextRequest) {
  let userPrompt = '';
  let questTitle = '';
  let questDescription = '';
  let userId = '';
  try {
    ({ userPrompt, questTitle, questDescription, userId } = await request.json());

    if (!userPrompt) {
      return NextResponse.json({ error: 'User prompt is required' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not found in environment variables');
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    console.log('Gemini API Key exists:', !!GEMINI_API_KEY);
    console.log('User prompt:', userPrompt);

    // Enhanced system prompt for scoring and detailed feedback
    const systemPrompt = `You are an expert AI prompt engineering coach evaluating student responses. 

    Your task is to:
    1. Score the prompt quality from 1-10 (where 10 is exceptional)
    2. Provide detailed, constructive feedback
    3. Suggest specific improvements
    4. Be encouraging but honest

    SCORING CRITERIA (be strict and accurate):
    - 1-2: Random characters, no meaningful content (e.g., "asdf", "12345")
    - 3-4: Very basic attempts, minimal effort (e.g., "write something", "help me")
    - 5-6: Basic prompts with some structure (e.g., "write a story", "create a function")
    - 7-8: Good prompts with specific details (e.g., "Write a story about a robot learning to paint")
    - 9-10: Exceptional prompts with clear instructions, context, and specificity

    SCORING FACTORS:
    - Length and detail (longer, more specific = higher score)
    - Use of action words (create, write, generate, analyze, etc.)
    - Specificity and clarity of instructions
    - Context and examples provided
    - Technical accuracy (for technical prompts)
    - Creativity and originality
    - Appropriate tone and style

    EXAMPLES:
    - "asdf" → Score 1 (random characters)
    - "write something" → Score 3 (too vague)
    - "write a story" → Score 5 (basic but clear)
    - "Write a story about a robot learning to paint" → Score 7 (specific and creative)
    - "Create a Python function that sorts a list of numbers and returns the result" → Score 8 (technical and specific)

    Respond in this exact JSON format:
    {
      "score": number (1-10),
      "scoreBreakdown": {
        "clarity": number (1-10),
        "specificity": number (1-10),
        "creativity": number (1-10),
        "effectiveness": number (1-10)
      },
      "strengths": ["strength1", "strength2", "strength3"],
      "improvements": ["improvement1", "improvement2", "improvement3"],
      "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
      "overall": "encouraging summary with emoji",
      "nextSteps": "specific action items for improvement"
    }`;

    const userMessage = `QUEST: ${questTitle || 'Daily Quest'}
DESCRIPTION: ${questDescription || 'Creative prompt challenge'}

USER RESPONSE: ${userPrompt}

Please analyze this response and provide detailed feedback in the specified JSON format.`;

    const geminiRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `SYSTEM: ${systemPrompt}\n\n${userMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.8,
        topK: 40
      }
    };

    console.log('Sending request to Gemini API...');
    console.log('Request URL:', `${GEMINI_API_URL}?key=${GEMINI_API_KEY.substring(0, 10)}...`);

    // Try with explicit DNS settings
    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'PromptQuest/1.0'
      },
      body: JSON.stringify(geminiRequest),
    });

    console.log('Gemini API response status:', geminiRes.status);
    console.log('Gemini API response headers:', Object.fromEntries(geminiRes.headers.entries()));

    const geminiData = await geminiRes.json();
    console.log('Gemini API response data:', JSON.stringify(geminiData, null, 2));

    const feedbackText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!feedbackText) {
      console.error('No feedback text found in Gemini response');
      throw new Error('No response from Gemini');
    }

    console.log('Feedback text received:', feedbackText.substring(0, 200) + '...');

    // Try to parse JSON response
    let feedback;
    try {
      // Clean up the response text - remove markdown code blocks if present
      let cleanFeedbackText = feedbackText.trim();
      if (cleanFeedbackText.startsWith('```json')) {
        cleanFeedbackText = cleanFeedbackText.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (cleanFeedbackText.startsWith('```')) {
        cleanFeedbackText = cleanFeedbackText.replace(/^```\n/, '').replace(/\n```$/, '');
      }
      
      feedback = JSON.parse(cleanFeedbackText);
      console.log('Successfully parsed feedback JSON');
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw feedback text:', feedbackText);
      // Fallback feedback if JSON parsing fails
      feedback = {
        score: 6,
        scoreBreakdown: {
          clarity: 6,
          specificity: 5,
          creativity: 7,
          effectiveness: 6
        },
        strengths: ["Creative thinking", "Clear expression"],
        improvements: ["Could be more specific", "Consider adding context"],
        suggestions: ["Try using examples", "Be more descriptive"],
        overall: "🌟 Good effort! Keep practicing your prompt skills.",
        nextSteps: "Focus on being more specific and adding relevant context"
      };
    }

    // Calculate XP based on score (score × 10)
    const earnedXP = feedback.score * 10;

    // Add XP calculation to response
    const enhancedFeedback = {
      ...feedback,
      earnedXP,
      questTitle: questTitle || 'Daily Quest',
      submittedAt: new Date().toISOString()
    };

    console.log('Returning enhanced feedback:', JSON.stringify(enhancedFeedback, null, 2));

    return NextResponse.json(enhancedFeedback);

  } catch (error) {
    console.error('Gemini Feedback Error:', error);
    
    // If it's a network error, provide a more helpful fallback
    let errMsg = '';
    if (typeof error === 'object' && error && 'message' in error && typeof (error as any).message === 'string') {
      errMsg = (error as any).message;
    }
    if (errMsg.includes('fetch failed')) {
      console.error('Network connectivity issue detected. Using fallback feedback.');
      return NextResponse.json({
        score: 7,
        scoreBreakdown: {
          clarity: 7,
          specificity: 6,
          creativity: 8,
          effectiveness: 7
        },
        strengths: ["Good attempt at the prompt", "Shows understanding of the task"],
        improvements: ["Could provide more specific details", "Consider the target audience"],
        suggestions: ["Try being more descriptive", "Add context when helpful"],
        overall: "🌟 Good work! Keep practicing your prompt skills.",
        nextSteps: "Focus on being more specific and adding relevant context",
        earnedXP: 70,
        questTitle: 'Daily Quest',
        submittedAt: new Date().toISOString(),
        note: "Network issue prevented AI feedback. This is a fallback response."
      });
    }
    
    // Enhanced fallback feedback with basic prompt analysis
    const promptLength = userPrompt.length;
    const wordCount = userPrompt.trim().split(/\s+/).length;
    const hasWords = wordCount > 1;
    const hasSpecificWords = /create|write|generate|make|build|design|analyze|explain|describe|show|tell|help|develop|implement|solve|calculate|compute|process|organize|structure/i.test(userPrompt);
    const hasQuestionWords = /\b(what|how|why|when|where|who|which)\b/i.test(userPrompt);
    const hasTechnicalTerms = /\b(function|code|algorithm|data|analysis|system|process|method|technique|approach|program|script|application|database|api|framework|library|module|class|object)\b/i.test(userPrompt);
    const hasContextWords = /\b(about|regarding|concerning|related to|involving|featuring|including|with|for|to|from|by|through|using|via|throughout|within|among|between)\b/i.test(userPrompt);
    const hasDetailWords = /\b(specific|detailed|comprehensive|thorough|complete|full|extensive|elaborate|precise|exact|accurate|clear|explicit|definite|particular|certain|specific|concrete|tangible|measurable)\b/i.test(userPrompt);
    
    // Calculate score based on prompt quality indicators (more accurate)
    let score = 1; // Start with lowest score
    let clarity = 1, specificity = 1, creativity = 1, effectiveness = 1;
    
    // Random characters or very short responses
    if (promptLength < 10 || /^[a-z]{1,5}$/i.test(userPrompt.trim())) {
      score = 1;
      clarity = 1; specificity = 1; creativity = 1; effectiveness = 1;
    } else {
      // Basic scoring based on content quality
      if (promptLength >= 20) score += 1;
      if (promptLength >= 50) score += 1;
      if (promptLength >= 100) score += 1;
      
      if (wordCount >= 3) score += 1;
      if (wordCount >= 5) score += 1;
      
      if (hasSpecificWords) score += 1;
      if (hasQuestionWords) score += 1;
      if (hasTechnicalTerms) score += 1;
      if (hasContextWords) score += 1;
      if (hasDetailWords) score += 1;
      
      // Cap score at 8 for fallback (never give perfect score without AI)
      score = Math.min(score, 8);
      
      // Adjust breakdown based on score
      if (score >= 7) {
        clarity = 7; specificity = 6; creativity = 8; effectiveness = 7;
      } else if (score >= 5) {
        clarity = 5; specificity = 4; creativity = 6; effectiveness = 5;
      } else if (score >= 3) {
        clarity = 3; specificity = 2; creativity = 4; effectiveness = 3;
      } else {
        clarity = 2; specificity = 1; creativity = 2; effectiveness = 2;
      }
    }
    
    const strengths = [];
    const improvements = [];
    const suggestions = [];
    
    if (promptLength > 20) strengths.push("Shows effort in writing a longer response");
    if (hasSpecificWords) strengths.push("Uses action-oriented language");
    if (hasQuestionWords) strengths.push("Attempts to ask for specific information");
    if (hasTechnicalTerms) strengths.push("Includes technical terminology");
    if (hasContextWords) strengths.push("Provides some context");
    
    if (promptLength < 20) improvements.push("Could provide much more detail and context");
    if (!hasSpecificWords) improvements.push("Try using more specific action words (create, write, generate, etc.)");
    if (!hasQuestionWords) improvements.push("Consider asking specific questions to clarify your request");
    if (!hasTechnicalTerms && /function|code|data/i.test(userPrompt)) improvements.push("Use more specific technical terms");
    if (!hasContextWords) improvements.push("Add context about what you want to achieve");
    
    suggestions.push("Be more descriptive about what you want to create or achieve");
    suggestions.push("Add specific examples or context to clarify your request");
    suggestions.push("Specify the format, style, or approach you prefer");
    suggestions.push("Consider the audience and purpose of your prompt");
    
    let overall = "";
    if (score >= 7) {
      overall = "🌟 Good work! Your prompt shows understanding of effective prompting.";
    } else if (score >= 5) {
      overall = "👍 Nice effort! Keep practicing to improve your prompt skills.";
    } else if (score >= 3) {
      overall = "🔍 Basic attempt. Focus on being more specific and detailed.";
    } else {
      overall = "📝 Try writing a more complete prompt with clear instructions.";
    }
    
    // Fallback feedback if API fails
    return NextResponse.json({
      score,
      scoreBreakdown: {
        clarity,
        specificity,
        creativity,
        effectiveness
      },
      strengths,
      improvements,
      suggestions,
      overall,
      nextSteps: "Practice writing more detailed and specific prompts",
      earnedXP: score * 10,
      questTitle: questTitle || 'Daily Quest',
      submittedAt: new Date().toISOString(),
      note: "AI feedback unavailable. This is an automated analysis."
    });
  }
} 