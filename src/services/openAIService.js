// OpenAI ChatGPT Service for Electrical Questions
import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';

class OpenAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPEN_AI_API_KEY || '';
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    this.fallbackAssistant = new FallbackElectricalAssistant();
    this.storeContext = `You are an AI assistant for Jaimaaruthi Electrical and Hardware Store, a trusted electrical store in Mettukadai. You specialize in electrical products, solutions, and technical advice.

Store Information:
- Name: Jaimaaruthi Electrical and Hardware Store
- Location: Mettukadai
- Owner: Prannav P
- Specializes in: Electrical goods, switches, sockets, lighting, fans, wiring, cables, power tools, safety equipment
- Bank Details: UPI - prannav2511@okhdfcbank (Karur Vysya Bank 1054)

Product Categories:
1. Electrical Goods - Motors, MCBs, electrical panels
2. Switches & Sockets - Wall switches, power outlets, modular switches
3. Lighting Solutions - LED bulbs, tube lights, decorative lighting
4. Fans & Ventilation - Ceiling fans, exhaust fans, table fans
5. Wiring & Cables - Electrical wires, extension cords, junction boxes
6. Hardware & Tools - Screws, bolts, electrical tools
7. Power Tools - Drills, grinders, electrical hand tools
8. Safety Equipment - Electrical safety gear, voltage testers

Your role:
- Answer electrical questions professionally and accurately
- Provide technical advice about electrical installations
- Suggest appropriate products from the store
- Help with electrical safety guidelines
- Assist with product selection and specifications
- Be helpful, knowledgeable, and customer-focused
- Always prioritize electrical safety in your advice

Guidelines:
- Keep responses informative but concise
- Use simple language that customers can understand
- Always emphasize safety when dealing with electrical work
- Recommend professional installation when necessary
- Be friendly and helpful like a knowledgeable store assistant`;
  }

  // Main method to get ChatGPT response for electrical questions
  async askElectricalQuestion(userQuestion, conversationHistory = []) {
    try {
      console.log('🤖 Asking ChatGPT:', userQuestion);

      // Check if API key is available
      if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {
        console.log('⚠️ No OpenAI API key found, using fallback assistant');
        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);
        return {
          success: true,
          answer: `🔄 **Using Jaimaaruthi Store Knowledge Base**\n\n${fallbackResponse.answer}`,
          source: 'Fallback Assistant'
        };
      }

      // Prepare messages for the conversation
      const messages = [
        {
          role: 'system',
          content: this.storeContext
        },
        // Include conversation history
        ...conversationHistory,
        {
          role: 'user',
          content: userQuestion
        }
      ];

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const answer = data.choices[0].message.content.trim();
        console.log('✅ ChatGPT Response:', answer);

        return {
          success: true,
          answer: answer,
          usage: data.usage
        };
      } else {
        throw new Error('No response from ChatGPT');
      }

    } catch (error) {
      console.error('❌ OpenAI API Error:', error);

      // Use fallback assistant for electrical questions when ChatGPT is unavailable
      if (this.isElectricalQuestion(userQuestion)) {
        console.log('🔄 Using fallback electrical assistant...');
        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);

        let fallbackPrefix = "";
        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {
          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";
        } else {
          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";
        }

        return {
          success: true,
          answer: fallbackPrefix + fallbackResponse.answer,
          source: 'Fallback Assistant',
          originalError: error.message
        };
      }

      // Provide specific error messages for non-electrical questions
      let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!";

      if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {
        errorMessage = "⚠️ **ChatGPT Credits Exhausted**\n\nThe OpenAI API account needs more credits to respond. Please:\n\n1. 🔗 Visit https://platform.openai.com/billing\n2. 💳 Add credits to your OpenAI account\n3. 🔄 Try asking your question again\n\n💡 **For electrical questions**, I can still help using our store knowledge base!";
      } else if (error.message.includes('invalid_api_key')) {
        errorMessage = "🔑 **API Key Issue**\n\nThere's an issue with the ChatGPT API key. Please check the configuration and try again.";
      } else if (error.message.includes('rate_limit_exceeded')) {
        errorMessage = "⏱️ **Too Many Requests**\n\nWe're receiving too many requests right now. Please wait a moment and try again.";
      }

      return {
        success: false,
        error: error.message,
        answer: errorMessage
      };
    }
  }

  // Specific method for product recommendations
  async getProductRecommendation(productQuery, budget = null, specifications = null) {
    let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;

    if (budget) {
      enhancedQuery += ` My budget is around ₹${budget}.`;
    }

    if (specifications) {
      enhancedQuery += ` Specifications needed: ${specifications}.`;
    }

    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store and explain why they would be good choices.';

    return this.askElectricalQuestion(enhancedQuery);
  }

  // Method for electrical safety advice
  async getElectricalSafetyAdvice(safetyQuery) {
    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice and any precautions I should take.`;
    return this.askElectricalQuestion(enhancedQuery);
  }

  // Method for installation guidance
  async getInstallationGuidance(installationQuery) {
    const enhancedQuery = `Installation help needed: ${installationQuery}. Please provide step-by-step guidance and mention if professional installation is recommended for safety.`;
    return this.askElectricalQuestion(enhancedQuery);
  }

  // Method to handle common electrical FAQs
  async handleCommonFAQ(question) {
    const faqPrompt = `This is a common electrical question: ${question}. Please provide a helpful, accurate answer that a customer of an electrical store would find useful.`;
    return this.askElectricalQuestion(faqPrompt);
  }

  // Method to get store information
  getStoreInfo() {
    return {
      name: "Jaimaaruthi Electrical and Hardware Store",
      location: "Mettukadai",
      owner: "Prannav P",
      upi: "prannav2511@okhdfcbank",
      bank: "Karur Vysya Bank 1054",
      specialties: [
        "Electrical Goods",
        "Switches & Sockets",
        "Lighting Solutions",
        "Fans & Ventilation",
        "Wiring & Cables",
        "Hardware & Tools",
        "Power Tools",
        "Safety Equipment"
      ]
    };
  }

  // Check if question is electrical-related
  isElectricalQuestion(question) {
    const electricalKeywords = [
      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',
      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',
      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety',
      'drill', 'tool', 'grinder', 'extension', 'plug', 'adapter', 'transformer',
      'inverter', 'battery', 'solar', 'panel', 'junction', 'conduit', 'earthing'
    ];

    const lowerQuestion = question.toLowerCase();
    return electricalKeywords.some(keyword => lowerQuestion.includes(keyword));
  }
}

// Create and export the service instance
const openAIService = new OpenAIService();
export default openAIService;