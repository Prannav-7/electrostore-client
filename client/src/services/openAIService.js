// OpenAI ChatGPT Service for Electrical Questions// OpenAI ChatGPT Service for Electrical Questions// OpenAI ChatGPT Service for Electrical Questions// OpenAI ChatGPT Service for Electrical Questions// OpenAI ChatGPT Service for Electrical Questions// OpenAI ChatGPT Service for Electrical Questions

import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';

// This service handles all ChatGPT API interactions for the electrical store

class OpenAIService {

  constructor() {// This service handles all ChatGPT API interactions for the electrical store

    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';

    this.apiUrl = 'https://api.openai.com/v1/chat/completions';import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';

    this.fallbackAssistant = new FallbackElectricalAssistant();

    this.storeContext = 'You are an AI assistant for Jaimaaruthi Electrical and Hardware Store in Mettukadai. You help with electrical products, safety advice, and technical guidance.';// This service handles all ChatGPT API interactions for the electrical store

  }

class OpenAIService {

  async askElectricalQuestion(userQuestion, conversationHistory = []) {

    try {  constructor() {import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';

      console.log('🤖 Asking ChatGPT:', userQuestion);

    // Use environment variable for API key security

      if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {

        console.log('⚠️ No OpenAI API key found, using fallback assistant');    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';// This service handles all ChatGPT API interactions for the electrical store// This service handles all ChatGPT API interactions for the electrical store

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);

        return {    this.apiUrl = 'https://api.openai.com/v1/chat/completions';

          success: true,

          answer: `🔄 **Using Jaimaaruthi Store Knowledge Base**\n\n${fallbackResponse.answer}`,    this.fallbackAssistant = new FallbackElectricalAssistant();class OpenAIService {

          source: 'Fallback Assistant'

        };    

      }

    // Store context for electrical questions  constructor() {import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';

      const messages = [

        { role: 'system', content: this.storeContext },    this.storeContext = `You are an AI assistant for Jaimaaruthi Electrical and Hardware Store, a trusted electrical store in Mettukadai. You specialize in electrical products, solutions, and technical advice.

        ...conversationHistory,

        { role: 'user', content: userQuestion }    // Use environment variable for API key security

      ];

Store Information:

      const requestBody = {

        model: 'gpt-3.5-turbo',- Name: Jaimaaruthi Electrical and Hardware Store    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';

        messages: messages,

        max_tokens: 500,- Location: Mettukadai

        temperature: 0.7

      };- Specializes in: Electrical goods, switches, sockets, lighting, fans, wiring, cables, power tools, safety equipment    this.apiUrl = 'https://api.openai.com/v1/chat/completions';



      const response = await fetch(this.apiUrl, {- Bank Details: UPI - prannav2511@okhdfcbank (Karur Vysya Bank 1054)

        method: 'POST',

        headers: {- Owner: Prannav P    this.fallbackAssistant = new FallbackElectricalAssistant();class OpenAIService {

          'Content-Type': 'application/json',

          'Authorization': Bearer ${this.apiKey}

        },

        body: JSON.stringify(requestBody)Product Categories:    

      });

1. Electrical Goods - Motors, MCBs, electrical panels

      if (!response.ok) {

        const errorData = await response.json();2. Switches & Sockets - Wall switches, power outlets, modular switches    // Store context for electrical questions  constructor() {import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';import FallbackElectricalAssistant from './fallbackElectricalAssistant.js';

        throw new Error(errorData.error?.message || HTTP error! status: ${response.status});

      }3. Lighting Solutions - LED bulbs, tube lights, decorative lighting



      const data = await response.json();4. Fans & Ventilation - Ceiling fans, exhaust fans, table fans    this.storeContext = `

      

      if (data.choices && data.choices.length > 0) {5. Wiring & Cables - Electrical wires, extension cords, junction boxes

        const answer = data.choices[0].message.content.trim();

        console.log('✅ ChatGPT Response:', answer);6. Hardware & Tools - Screws, bolts, electrical toolsYou are an AI assistant for Jaimaaruthi Electrical and Hardware Store, a trusted electrical store in Mettukadai.     // Use environment variable for API key security

        

        return {7. Power Tools - Drills, grinders, electrical hand tools

          success: true,

          answer: answer,8. Safety Equipment - Electrical safety gear, voltage testersYou specialize in electrical products, solutions, and technical advice.

          usage: data.usage

        };

      } else {

        throw new Error('No response from ChatGPT');Your role:    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';

      }

- Answer electrical questions professionally and accurately

    } catch (error) {

      console.error('❌ OpenAI API Error:', error);- Provide technical advice about electrical installationsStore Information:

      

      if (this.isElectricalQuestion(userQuestion)) {- Suggest appropriate products from the store

        console.log('🔄 Using fallback electrical assistant...');

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);- Help with electrical safety guidelines- Name: Jaimaaruthi Electrical and Hardware Store    this.apiUrl = 'https://api.openai.com/v1/chat/completions';

        

        let fallbackPrefix = "";- Assist with product selection and specifications

        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {

          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";- Be helpful, knowledgeable, and customer-focused- Location: Mettukadai

        } else {

          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";- Always prioritize electrical safety in your advice

        }

        - Specializes in: Electrical goods, switches, sockets, lighting, fans, wiring, cables, power tools, safety equipment    this.fallbackAssistant = new FallbackElectricalAssistant();class OpenAIService {class OpenAIService {

        return {

          success: true,Guidelines:

          answer: fallbackPrefix + fallbackResponse.answer,

          source: 'Fallback Assistant',- Keep responses informative but concise- Bank Details: UPI - prannav2511@okhdfcbank (Karur Vysya Bank 1054)

          originalError: error.message

        };- Use simple language that customers can understand

      }

      - Always emphasize safety when dealing with electrical work- Owner: Prannav P    

      return {

        success: false,- Recommend professional installation when necessary

        error: error.message,

        answer: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!"- Be friendly and helpful like a knowledgeable store assistant`;

      };

    }  }

  }

Product Categories:    // Store context for electrical questions  constructor() {  constructor() {

  async getProductRecommendation(productQuery, budget = null, specifications = null) {

    let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;  // Main method to get ChatGPT response for electrical questions

    if (budget) enhancedQuery += ` My budget is around ₹${budget}.`;

    if (specifications) enhancedQuery += ` Specifications needed: ${specifications}.`;  async askElectricalQuestion(userQuestion, conversationHistory = []) {1. Electrical Goods - Motors, MCBs, electrical panels

    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store.';

    return this.askElectricalQuestion(enhancedQuery);    try {

  }

      console.log('🤖 Asking ChatGPT:', userQuestion);2. Switches & Sockets - Wall switches, power outlets, modular switches    this.storeContext = `

  async getElectricalSafetyAdvice(safetyQuery) {

    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice.`;

    return this.askElectricalQuestion(enhancedQuery);

  }      // Check if API key is available3. Lighting Solutions - LED bulbs, tube lights, decorative lighting



  getStoreInfo() {      if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {

    return {

      name: "Jaimaaruthi Electrical and Hardware Store",        console.log('⚠️ No OpenAI API key found, using fallback assistant');4. Fans & Ventilation - Ceiling fans, exhaust fans, table fansYou are an AI assistant for Jaimaaruthi Electrical and Hardware Store, a trusted electrical store in Mettukadai.     // Use environment variable for API key security    // Use environment variable for API key security

      location: "Mettukadai", 

      owner: "Prannav P",        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);

      upi: "prannav2511@okhdfcbank",

      bank: "Karur Vysya Bank 1054"        return {5. Wiring & Cables - Electrical wires, extension cords, junction boxes

    };

  }          success: true,



  isElectricalQuestion(question) {          answer: `🔄 **Using Jaimaaruthi Store Knowledge Base**\n\n${fallbackResponse.answer}`,6. Hardware & Tools - Screws, bolts, electrical toolsYou specialize in electrical products, solutions, and technical advice.

    const electricalKeywords = [

      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',          source: 'Fallback Assistant'

      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',

      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety'        };7. Power Tools - Drills, grinders, electrical hand tools

    ];

          }

    const lowerQuestion = question.toLowerCase();

    return electricalKeywords.some(keyword => lowerQuestion.includes(keyword));8. Safety Equipment - Electrical safety gear, voltage testers    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';

  }

}      // Prepare messages for the conversation



const openAIService = new OpenAIService();      const messages = [

export default openAIService;
        {

          role: 'system',Your role:Store Information:

          content: this.storeContext

        },- Answer electrical questions professionally and accurately

        // Include conversation history

        ...conversationHistory,- Provide technical advice about electrical installations- Name: Jaimaaruthi Electrical and Hardware Store    this.apiUrl = 'https://api.openai.com/v1/chat/completions';    this.apiUrl = 'https://api.openai.com/v1/chat/completions';

        {

          role: 'user',- Suggest appropriate products from the store

          content: userQuestion

        }- Help with electrical safety guidelines- Location: Mettukadai

      ];

- Assist with product selection and specifications

      const requestBody = {

        model: 'gpt-3.5-turbo',- Be helpful, knowledgeable, and customer-focused- Specializes in: Electrical goods, switches, sockets, lighting, fans, wiring, cables, power tools, safety equipment    this.fallbackAssistant = new FallbackElectricalAssistant();    this.fallbackAssistant = new FallbackElectricalAssistant();

        messages: messages,

        max_tokens: 500,- Always prioritize electrical safety in your advice

        temperature: 0.7,

        top_p: 1,- Bank Details: UPI - prannav2511@okhdfcbank (Karur Vysya Bank 1054)

        frequency_penalty: 0,

        presence_penalty: 0Guidelines:

      };

- Keep responses informative but concise- Owner: Prannav P        

      const response = await fetch(this.apiUrl, {

        method: 'POST',- Use simple language that customers can understand

        headers: {

          'Content-Type': 'application/json',- Always emphasize safety when dealing with electrical work

          'Authorization': `Bearer ${this.apiKey}`

        },- Recommend professional installation when necessary

        body: JSON.stringify(requestBody)

      });- Be friendly and helpful like a knowledgeable store assistantProduct Categories:    // Store context for electrical questions    // Store context for electrical questions



      if (!response.ok) {`;

        const errorData = await response.json();

        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);  }1. Electrical Goods - Motors, MCBs, electrical panels

      }



      const data = await response.json();

        // Main method to get ChatGPT response for electrical questions2. Switches & Sockets - Wall switches, power outlets, modular switches    this.storeContext = `    this.storeContext = `

      if (data.choices && data.choices.length > 0) {

        const answer = data.choices[0].message.content.trim();  async askElectricalQuestion(userQuestion, conversationHistory = []) {

        console.log('✅ ChatGPT Response:', answer);

            try {3. Lighting Solutions - LED bulbs, tube lights, decorative lighting

        return {

          success: true,      console.log('🤖 Asking ChatGPT:', userQuestion);

          answer: answer,

          usage: data.usage4. Fans & Ventilation - Ceiling fans, exhaust fans, table fansYou are an AI assistant for Jaimaaruthi Electrical and Hardware Store, a trusted electrical store in Mettukadai. You are an AI assistant for Jaimaaruthi Electrical and Hardware Store, a trusted electrical store in Mettukadai. 

        };

      } else {      // Check if API key is available

        throw new Error('No response from ChatGPT');

      }      if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {5. Wiring & Cables - Electrical wires, extension cords, junction boxes



    } catch (error) {        console.log('⚠️ No OpenAI API key found, using fallback assistant');

      console.error('❌ OpenAI API Error:', error);

              const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);6. Hardware & Tools - Screws, bolts, electrical toolsYou specialize in electrical products, solutions, and technical advice.You specialize in electrical products, solutions, and technical advice.

      // Use fallback assistant for electrical questions when ChatGPT is unavailable

      if (this.isElectricalQuestion(userQuestion)) {        return {

        console.log('🔄 Using fallback electrical assistant...');

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);          success: true,7. Power Tools - Drills, grinders, electrical hand tools

        

        let fallbackPrefix = "";          answer: `🔄 **Using Jaimaaruthi Store Knowledge Base**\n\n${fallbackResponse.answer}`,

        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {

          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";          source: 'Fallback Assistant'8. Safety Equipment - Electrical safety gear, voltage testers

        } else {

          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";        };

        }

              }

        return {

          success: true,

          answer: fallbackPrefix + fallbackResponse.answer,

          source: 'Fallback Assistant',      // Prepare messages for the conversationYour role:Store Information:Store Information:

          originalError: error.message

        };      const messages = [

      }

              {- Answer electrical questions professionally and accurately

      // Provide specific error messages for non-electrical questions

      let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!";          role: 'system',

      

      if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {          content: this.storeContext- Provide technical advice about electrical installations- Name: Jaimaaruthi Electrical and Hardware Store- Name: Jaimaaruthi Electrical and Hardware Store

        errorMessage = "⚠️ **ChatGPT Credits Exhausted**\n\nThe OpenAI API account needs more credits to respond. Please:\n\n1. 🔗 Visit https://platform.openai.com/billing\n2. 💳 Add credits to your OpenAI account\n3. 🔄 Try asking your question again\n\n💡 **For electrical questions**, I can still help using our store knowledge base!";

      } else if (error.message.includes('invalid_api_key')) {        },

        errorMessage = "🔑 **API Key Issue**\n\nThere's an issue with the ChatGPT API key. Please check the configuration and try again.";

      } else if (error.message.includes('rate_limit_exceeded')) {        // Include conversation history- Suggest appropriate products from the store

        errorMessage = "⏱️ **Too Many Requests**\n\nWe're receiving too many requests right now. Please wait a moment and try again.";

      }        ...conversationHistory,

      

      return {        {- Help with electrical safety guidelines- Location: Mettukadai- Location: Mettukadai

        success: false,

        error: error.message,          role: 'user',

        answer: errorMessage

      };          content: userQuestion- Assist with product selection and specifications

    }

  }        }



  // Specific method for product recommendations      ];- Be helpful, knowledgeable, and customer-focused- Specializes in: Electrical goods, switches, sockets, lighting, fans, wiring, cables, power tools, safety equipment- Specializes in: Electrical goods, switches, sockets, lighting, fans, wiring, cables, power tools, safety equipment

  async getProductRecommendation(productQuery, budget = null, specifications = null) {

    let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;

    

    if (budget) {      const requestBody = {- Always prioritize electrical safety in your advice

      enhancedQuery += ` My budget is around ₹${budget}.`;

    }        model: 'gpt-3.5-turbo',

    

    if (specifications) {        messages: messages,- Bank Details: UPI - prannav2511@okhdfcbank (Karur Vysya Bank 1054)- Bank Details: UPI - prannav2511@okhdfcbank (Karur Vysya Bank 1054)

      enhancedQuery += ` Specifications needed: ${specifications}.`;

    }        max_tokens: 500,

    

    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store and explain why they would be good choices.';        temperature: 0.7,Guidelines:

    

    return this.askElectricalQuestion(enhancedQuery);        top_p: 1,

  }

        frequency_penalty: 0,- Keep responses informative but concise- Owner: Prannav P- Owner: Prannav P

  // Method for electrical safety advice

  async getElectricalSafetyAdvice(safetyQuery) {        presence_penalty: 0

    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice and any precautions I should take.`;

          };- Use simple language that customers can understand

    return this.askElectricalQuestion(enhancedQuery);

  }



  // Method for installation guidance      const response = await fetch(this.apiUrl, {- Always emphasize safety when dealing with electrical work

  async getInstallationGuidance(installationQuery) {

    const enhancedQuery = `Installation help needed: ${installationQuery}. Please provide step-by-step guidance and mention if professional installation is recommended for safety.`;        method: 'POST',

    

    return this.askElectricalQuestion(enhancedQuery);        headers: {- Recommend professional installation when necessary

  }

          'Content-Type': 'application/json',

  // Method to handle common electrical FAQs

  async handleCommonFAQ(question) {          'Authorization': `Bearer ${this.apiKey}`- Be friendly and helpful like a knowledgeable store assistantProduct Categories:Product Categories:

    const faqPrompt = `This is a common electrical question: ${question}. Please provide a helpful, accurate answer that a customer of an electrical store would find useful.`;

            },

    return this.askElectricalQuestion(faqPrompt);

  }        body: JSON.stringify(requestBody)`;



  // Method to get store information      });

  getStoreInfo() {

    return {  }1. Electrical Goods - Motors, MCBs, electrical panels1. Electrical Goods - Motors, MCBs, electrical panels

      name: "Jaimaaruthi Electrical and Hardware Store",

      location: "Mettukadai",       if (!response.ok) {

      owner: "Prannav P",

      upi: "prannav2511@okhdfcbank",        const errorData = await response.json();

      bank: "Karur Vysya Bank 1054",

      specialties: [        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);

        "Electrical Goods",

        "Switches & Sockets",       }  // Main method to get ChatGPT response for electrical questions2. Switches & Sockets - Wall switches, power outlets, modular switches2. Switches & Sockets - Wall switches, power outlets, modular switches

        "Lighting Solutions",

        "Fans & Ventilation",

        "Wiring & Cables",

        "Hardware & Tools",      const data = await response.json();  async askElectricalQuestion(userQuestion, conversationHistory = []) {

        "Power Tools",

        "Safety Equipment"      

      ]

    };      if (data.choices && data.choices.length > 0) {    try {3. Lighting Solutions - LED bulbs, tube lights, decorative lighting3. Lighting Solutions - LED bulbs, tube lights, decorative lighting

  }

        const answer = data.choices[0].message.content.trim();

  // Check if question is electrical-related

  isElectricalQuestion(question) {        console.log('✅ ChatGPT Response:', answer);      console.log('🤖 Asking ChatGPT:', userQuestion);

    const electricalKeywords = [

      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',        

      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',

      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety',        return {4. Fans & Ventilation - Ceiling fans, exhaust fans, table fans4. Fans & Ventilation - Ceiling fans, exhaust fans, table fans

      'drill', 'tool', 'grinder', 'extension', 'plug', 'adapter', 'transformer',

      'inverter', 'battery', 'solar', 'panel', 'junction', 'conduit', 'earthing'          success: true,

    ];

              answer: answer,      // Check if API key is available

    const lowerQuestion = question.toLowerCase();

    return electricalKeywords.some(keyword => lowerQuestion.includes(keyword));          usage: data.usage

  }

}        };      if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {5. Wiring & Cables - Electrical wires, extension cords, junction boxes5. Wiring & Cables - Electrical wires, extension cords, junction boxes



// Create and export the service instance      } else {

const openAIService = new OpenAIService();

export default openAIService;        throw new Error('No response from ChatGPT');        console.log('⚠️ No OpenAI API key found, using fallback assistant');

      }

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);6. Hardware & Tools - Screws, bolts, electrical tools6. Hardware & Tools - Screws, bolts, electrical tools

    } catch (error) {

      console.error('❌ OpenAI API Error:', error);        return {

      

      // Use fallback assistant for electrical questions when ChatGPT is unavailable          success: true,7. Power Tools - Drills, grinders, electrical hand tools7. Power Tools - Drills, grinders, electrical hand tools

      if (this.isElectricalQuestion(userQuestion)) {

        console.log('🔄 Using fallback electrical assistant...');          answer: `🔄 **Using Jaimaaruthi Store Knowledge Base**\n\n${fallbackResponse.answer}`,

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);

                  source: 'Fallback Assistant'8. Safety Equipment - Electrical safety gear, voltage testers8. Safety Equipment - Electrical safety gear, voltage testers

        let fallbackPrefix = "";

        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {        };

          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";

        } else {      }

          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";

        }

        

        return {      // Prepare messages for the conversationYour role:Your role:

          success: true,

          answer: fallbackPrefix + fallbackResponse.answer,      const messages = [

          source: 'Fallback Assistant',

          originalError: error.message        {- Answer electrical questions professionally and accurately- Answer electrical questions professionally and accurately

        };

      }          role: 'system',

      

      // Provide specific error messages for non-electrical questions          content: this.storeContext- Provide technical advice about electrical installations- Provide technical advice about electrical installations

      let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!";

              },

      if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {

        errorMessage = "⚠️ **ChatGPT Credits Exhausted**\n\nThe OpenAI API account needs more credits to respond. Please:\n\n1. 🔗 Visit https://platform.openai.com/billing\n2. 💳 Add credits to your OpenAI account\n3. 🔄 Try asking your question again\n\n💡 **For electrical questions**, I can still help using our store knowledge base!";        // Include conversation history- Suggest appropriate products from the store- Suggest appropriate products from the store

      } else if (error.message.includes('invalid_api_key')) {

        errorMessage = "🔑 **API Key Issue**\n\nThere's an issue with the ChatGPT API key. Please check the configuration and try again.";        ...conversationHistory,

      } else if (error.message.includes('rate_limit_exceeded')) {

        errorMessage = "⏱️ **Too Many Requests**\n\nWe're receiving too many requests right now. Please wait a moment and try again.";        {- Help with electrical safety guidelines- Help with electrical safety guidelines

      }

                role: 'user',

      return {

        success: false,          content: userQuestion- Assist with product selection and specifications- Assist with product selection and specifications

        error: error.message,

        answer: errorMessage        }

      };

    }      ];- Be helpful, knowledgeable, and customer-focused- Be helpful, knowledgeable, and customer-focused

  }



  // Specific method for product recommendations

  async getProductRecommendation(productQuery, budget = null, specifications = null) {      const requestBody = {- Always prioritize electrical safety in your advice- Always prioritize electrical safety in your advice

    let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;

            model: 'gpt-3.5-turbo',

    if (budget) {

      enhancedQuery += ` My budget is around ₹${budget}.`;        messages: messages,

    }

            max_tokens: 500,

    if (specifications) {

      enhancedQuery += ` Specifications needed: ${specifications}.`;        temperature: 0.7,Guidelines:Guidelines:

    }

            top_p: 1,

    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store and explain why they would be good choices.';

            frequency_penalty: 0,- Keep responses informative but concise- Keep responses informative but concise

    return this.askElectricalQuestion(enhancedQuery);

  }        presence_penalty: 0



  // Method for electrical safety advice      };- Use simple language that customers can understand- Use simple language that customers can understand

  async getElectricalSafetyAdvice(safetyQuery) {

    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice and any precautions I should take.`;

    

    return this.askElectricalQuestion(enhancedQuery);      const response = await fetch(this.apiUrl, {- Always emphasize safety when dealing with electrical work- Always emphasize safety when dealing with electrical work

  }

        method: 'POST',

  // Method for installation guidance

  async getInstallationGuidance(installationQuery) {        headers: {- Recommend professional installation when necessary- Recommend professional installation when necessary

    const enhancedQuery = `Installation help needed: ${installationQuery}. Please provide step-by-step guidance and mention if professional installation is recommended for safety.`;

              'Content-Type': 'application/json',

    return this.askElectricalQuestion(enhancedQuery);

  }          'Authorization': `Bearer ${this.apiKey}`- Be friendly and helpful like a knowledgeable store assistant- Be friendly and helpful like a knowledgeable store assistant



  // Method to handle common electrical FAQs        },

  async handleCommonFAQ(question) {

    const faqPrompt = `This is a common electrical question: ${question}. Please provide a helpful, accurate answer that a customer of an electrical store would find useful.`;        body: JSON.stringify(requestBody)`;`;

    

    return this.askElectricalQuestion(faqPrompt);      });

  }

  }  }

  // Method to get store information

  getStoreInfo() {      if (!response.ok) {

    return {

      name: "Jaimaaruthi Electrical and Hardware Store",        const errorData = await response.json();

      location: "Mettukadai", 

      owner: "Prannav P",        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);

      upi: "prannav2511@okhdfcbank",

      bank: "Karur Vysya Bank 1054",      }  // Main method to get ChatGPT response for electrical questions  // Main method to get ChatGPT response for electrical questions

      specialties: [

        "Electrical Goods",

        "Switches & Sockets", 

        "Lighting Solutions",      const data = await response.json();  async askElectricalQuestion(userQuestion, conversationHistory = []) {  async askElectricalQuestion(userQuestion, conversationHistory = []) {

        "Fans & Ventilation",

        "Wiring & Cables",      

        "Hardware & Tools",

        "Power Tools",      if (data.choices && data.choices.length > 0) {    try {    try {

        "Safety Equipment"

      ]        const answer = data.choices[0].message.content.trim();

    };

  }        console.log('✅ ChatGPT Response:', answer);      console.log('🤖 Asking ChatGPT:', userQuestion);      console.log('🤖 Asking ChatGPT:', userQuestion);



  // Check if question is electrical-related        

  isElectricalQuestion(question) {

    const electricalKeywords = [        return {

      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',

      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',          success: true,

      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety',

      'drill', 'tool', 'grinder', 'extension', 'plug', 'adapter', 'transformer',          answer: answer,      // Check if API key is available      // Prepare messages for the conversation

      'inverter', 'battery', 'solar', 'panel', 'junction', 'conduit', 'earthing'

    ];          usage: data.usage

    

    const lowerQuestion = question.toLowerCase();        };      if (!this.apiKey || this.apiKey === 'your-openai-api-key-here') {      const messages = [

    return electricalKeywords.some(keyword => lowerQuestion.includes(keyword));

  }      } else {

}

        throw new Error('No response from ChatGPT');        console.log('⚠️ No OpenAI API key found, using fallback assistant');        {

// Create and export the service instance

const openAIService = new OpenAIService();      }

export default openAIService;
        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);          role: 'system',

    } catch (error) {

      console.error('❌ OpenAI API Error:', error);        return {          content: this.storeContext

      

      // Use fallback assistant for electrical questions when ChatGPT is unavailable          success: true,        },

      if (this.isElectricalQuestion(userQuestion)) {

        console.log('🔄 Using fallback electrical assistant...');          answer: `🔄 **Using Jaimaaruthi Store Knowledge Base**\n\n${fallbackResponse.answer}`,        // Include conversation history

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);

                  source: 'Fallback Assistant'        ...conversationHistory,

        let fallbackPrefix = "";

        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {        };        {

          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";

        } else {      }          role: 'user',

          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";

        }          content: userQuestion

        

        return {      // Prepare messages for the conversation        }

          success: true,

          answer: fallbackPrefix + fallbackResponse.answer,      const messages = [      ];

          source: 'Fallback Assistant',

          originalError: error.message        {

        };

      }          role: 'system',      const requestBody = {

      

      // Provide specific error messages for non-electrical questions          content: this.storeContext        model: 'gpt-3.5-turbo',

      let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!";

              },        messages: messages,

      if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {

        errorMessage = "⚠️ **ChatGPT Credits Exhausted**\n\nThe OpenAI API account needs more credits to respond. Please:\n\n1. 🔗 Visit https://platform.openai.com/billing\n2. 💳 Add credits to your OpenAI account\n3. 🔄 Try asking your question again\n\n💡 **For electrical questions**, I can still help using our store knowledge base!";        // Include conversation history        max_tokens: 500,

      } else if (error.message.includes('invalid_api_key')) {

        errorMessage = "🔑 **API Key Issue**\n\nThere's an issue with the ChatGPT API key. Please check the configuration and try again.";        ...conversationHistory,        temperature: 0.7,

      } else if (error.message.includes('rate_limit_exceeded')) {

        errorMessage = "⏱️ **Too Many Requests**\n\nWe're receiving too many requests right now. Please wait a moment and try again.";        {        top_p: 1,

      }

                role: 'user',        frequency_penalty: 0,

      return {

        success: false,          content: userQuestion        presence_penalty: 0

        error: error.message,

        answer: errorMessage        }      };

      };

    }      ];

  }

      const response = await fetch(this.apiUrl, {

  // Specific method for product recommendations

  async getProductRecommendation(productQuery, budget = null, specifications = null) {      const requestBody = {        method: 'POST',

    let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;

            model: 'gpt-3.5-turbo',        headers: {

    if (budget) {

      enhancedQuery += ` My budget is around ₹${budget}.`;        messages: messages,          'Content-Type': 'application/json',

    }

            max_tokens: 500,          'Authorization': `Bearer ${this.apiKey}`

    if (specifications) {

      enhancedQuery += ` Specifications needed: ${specifications}.`;        temperature: 0.7,        },

    }

            top_p: 1,        body: JSON.stringify(requestBody)

    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store and explain why they would be good choices.';

            frequency_penalty: 0,      });

    return this.askElectricalQuestion(enhancedQuery);

  }        presence_penalty: 0



  // Method for electrical safety advice      };      if (!response.ok) {

  async getElectricalSafetyAdvice(safetyQuery) {

    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice and any precautions I should take.`;        const errorData = await response.json();

    

    return this.askElectricalQuestion(enhancedQuery);      const response = await fetch(this.apiUrl, {        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);

  }

        method: 'POST',      }

  // Method for installation guidance

  async getInstallationGuidance(installationQuery) {        headers: {

    const enhancedQuery = `Installation help needed: ${installationQuery}. Please provide step-by-step guidance and mention if professional installation is recommended for safety.`;

              'Content-Type': 'application/json',      const data = await response.json();

    return this.askElectricalQuestion(enhancedQuery);

  }          'Authorization': `Bearer ${this.apiKey}`      



  // Method to handle common electrical FAQs        },      if (data.choices && data.choices.length > 0) {

  async handleCommonFAQ(question) {

    const faqPrompt = `This is a common electrical question: ${question}. Please provide a helpful, accurate answer that a customer of an electrical store would find useful.`;        body: JSON.stringify(requestBody)        const answer = data.choices[0].message.content.trim();

    

    return this.askElectricalQuestion(faqPrompt);      });        console.log('✅ ChatGPT Response:', answer);

  }

        

  // Method to get store information

  getStoreInfo() {      if (!response.ok) {        return {

    return {

      name: "Jaimaaruthi Electrical and Hardware Store",        const errorData = await response.json();          success: true,

      location: "Mettukadai", 

      owner: "Prannav P",        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);          answer: answer,

      upi: "prannav2511@okhdfcbank",

      bank: "Karur Vysya Bank 1054",      }          usage: data.usage

      specialties: [

        "Electrical Goods",        };

        "Switches & Sockets", 

        "Lighting Solutions",      const data = await response.json();      } else {

        "Fans & Ventilation",

        "Wiring & Cables",              throw new Error('No response from ChatGPT');

        "Hardware & Tools",

        "Power Tools",      if (data.choices && data.choices.length > 0) {      }

        "Safety Equipment"

      ]        const answer = data.choices[0].message.content.trim();

    };

  }        console.log('✅ ChatGPT Response:', answer);    } catch (error) {



  // Check if question is electrical-related              console.error('❌ OpenAI API Error:', error);

  isElectricalQuestion(question) {

    const electricalKeywords = [        return {      

      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',

      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',          success: true,      let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!";

      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety',

      'drill', 'tool', 'grinder', 'extension', 'plug', 'adapter', 'transformer',          answer: answer,      

      'inverter', 'battery', 'solar', 'panel', 'junction', 'conduit', 'earthing'

    ];          usage: data.usage      // Use fallback assistant for electrical questions when ChatGPT is unavailable

    

    const lowerQuestion = question.toLowerCase();        };      if (this.isElectricalQuestion(userQuestion)) {

    return electricalKeywords.some(keyword => lowerQuestion.includes(keyword));

  }      } else {        console.log('🔄 Using fallback electrical assistant...');

}

        throw new Error('No response from ChatGPT');        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);

// Create and export the service instance

const openAIService = new OpenAIService();      }        

export default openAIService;
        let fallbackPrefix = "";

    } catch (error) {        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {

      console.error('❌ OpenAI API Error:', error);          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";

              } else {

      // Use fallback assistant for electrical questions when ChatGPT is unavailable          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";

      if (this.isElectricalQuestion(userQuestion)) {        }

        console.log('🔄 Using fallback electrical assistant...');        

        const fallbackResponse = this.fallbackAssistant.askElectricalQuestion(userQuestion);        return {

                  success: true,

        let fallbackPrefix = "";          answer: fallbackPrefix + fallbackResponse.answer,

        if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {          source: 'Fallback Assistant',

          fallbackPrefix = "💡 **ChatGPT Credits Exhausted** - Using Jaimaaruthi Store Knowledge Base\n\n";          originalError: error.message

        } else {        };

          fallbackPrefix = "🔄 **ChatGPT Unavailable** - Using Jaimaaruthi Store Knowledge Base\n\n";      }

        }      

              // Provide specific error messages for non-electrical questions

        return {      if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {

          success: true,        errorMessage = "⚠️ **ChatGPT Credits Exhausted**\n\nThe OpenAI API account needs more credits to respond. Please:\n\n1. 🔗 Visit https://platform.openai.com/billing\n2. 💳 Add credits to your OpenAI account\n3. 🔄 Try asking your question again\n\n💡 **For electrical questions**, I can still help using our store knowledge base!";

          answer: fallbackPrefix + fallbackResponse.answer,      } else if (error.message.includes('invalid_api_key')) {

          source: 'Fallback Assistant',        errorMessage = "🔑 **API Key Issue**\n\nThere's an issue with the ChatGPT API key. Please check the configuration and try again.";

          originalError: error.message      } else if (error.message.includes('rate_limit_exceeded')) {

        };        errorMessage = "⏱️ **Too Many Requests**\n\nWe're receiving too many requests right now. Please wait a moment and try again.";

      }      }

            

      // Provide specific error messages for non-electrical questions      return {

      let errorMessage = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or feel free to ask about our electrical products and I'll do my best to help!";        success: false,

              error: error.message,

      if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {        answer: errorMessage

        errorMessage = "⚠️ **ChatGPT Credits Exhausted**\n\nThe OpenAI API account needs more credits to respond. Please:\n\n1. 🔗 Visit https://platform.openai.com/billing\n2. 💳 Add credits to your OpenAI account\n3. 🔄 Try asking your question again\n\n💡 **For electrical questions**, I can still help using our store knowledge base!";      };

      } else if (error.message.includes('invalid_api_key')) {    }

        errorMessage = "🔑 **API Key Issue**\n\nThere's an issue with the ChatGPT API key. Please check the configuration and try again.";  }

      } else if (error.message.includes('rate_limit_exceeded')) {

        errorMessage = "⏱️ **Too Many Requests**\n\nWe're receiving too many requests right now. Please wait a moment and try again.";  // Specific method for product recommendations

      }  async getProductRecommendation(productQuery, budget = null, specifications = null) {

          let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;

      return {    

        success: false,    if (budget) {

        error: error.message,      enhancedQuery += ` My budget is around ₹${budget}.`;

        answer: errorMessage    }

      };    

    }    if (specifications) {

  }      enhancedQuery += ` Specifications needed: ${specifications}.`;

    }

  // Specific method for product recommendations    

  async getProductRecommendation(productQuery, budget = null, specifications = null) {    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store and explain why they would be good choices.';

    let enhancedQuery = `I need help choosing electrical products: ${productQuery}`;    

        return this.askElectricalQuestion(enhancedQuery);

    if (budget) {  }

      enhancedQuery += ` My budget is around ₹${budget}.`;

    }  // Method for electrical safety advice

      async getElectricalSafetyAdvice(safetyQuery) {

    if (specifications) {    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice and any precautions I should take.`;

      enhancedQuery += ` Specifications needed: ${specifications}.`;    

    }    return this.askElectricalQuestion(enhancedQuery);

      }

    enhancedQuery += ' Please recommend suitable products from Jaimaaruthi Electrical Store and explain why they would be good choices.';

      // Method for installation guidance

    return this.askElectricalQuestion(enhancedQuery);  async getInstallationGuidance(installationQuery) {

  }    const enhancedQuery = `Installation help needed: ${installationQuery}. Please provide step-by-step guidance and mention if professional installation is recommended for safety.`;

    

  // Method for electrical safety advice    return this.askElectricalQuestion(enhancedQuery);

  async getElectricalSafetyAdvice(safetyQuery) {  }

    const enhancedQuery = `Safety question: ${safetyQuery}. Please provide comprehensive electrical safety advice and any precautions I should take.`;

      // Method to handle common electrical FAQs

    return this.askElectricalQuestion(enhancedQuery);  async handleCommonFAQ(question) {

  }    const faqPrompt = `This is a common electrical question: ${question}. Please provide a helpful, accurate answer that a customer of an electrical store would find useful.`;

    

  // Method for installation guidance    return this.askElectricalQuestion(faqPrompt);

  async getInstallationGuidance(installationQuery) {  }

    const enhancedQuery = `Installation help needed: ${installationQuery}. Please provide step-by-step guidance and mention if professional installation is recommended for safety.`;

      // Method to get store information

    return this.askElectricalQuestion(enhancedQuery);  getStoreInfo() {

  }    return {

      name: "Jaimaaruthi Electrical and Hardware Store",

  // Method to handle common electrical FAQs      location: "Mettukadai", 

  async handleCommonFAQ(question) {      owner: "Prannav P",

    const faqPrompt = `This is a common electrical question: ${question}. Please provide a helpful, accurate answer that a customer of an electrical store would find useful.`;      upi: "prannav2511@okhdfcbank",

          bank: "Karur Vysya Bank 1054",

    return this.askElectricalQuestion(faqPrompt);      specialties: [

  }        "Electrical Goods",

        "Switches & Sockets", 

  // Method to get store information        "Lighting Solutions",

  getStoreInfo() {        "Fans & Ventilation",

    return {        "Wiring & Cables",

      name: "Jaimaaruthi Electrical and Hardware Store",        "Hardware & Tools",

      location: "Mettukadai",         "Power Tools",

      owner: "Prannav P",        "Safety Equipment"

      upi: "prannav2511@okhdfcbank",      ]

      bank: "Karur Vysya Bank 1054",    };

      specialties: [  }

        "Electrical Goods",

        "Switches & Sockets",   // Check if question is electrical-related

        "Lighting Solutions",  isElectricalQuestion(question) {

        "Fans & Ventilation",    const electricalKeywords = [

        "Wiring & Cables",      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',

        "Hardware & Tools",      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',

        "Power Tools",      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety',

        "Safety Equipment"      'drill', 'tool', 'grinder', 'extension', 'plug', 'adapter', 'transformer',

      ]      'inverter', 'battery', 'solar', 'panel', 'junction', 'conduit', 'earthing'

    };    ];

  }    

    const lowerQuestion = question.toLowerCase();

  // Check if question is electrical-related    return electricalKeywords.some(keyword => lowerQuestion.includes(keyword));

  isElectricalQuestion(question) {  }

    const electricalKeywords = [}

      'electrical', 'electric', 'wire', 'wiring', 'cable', 'switch', 'socket', 'outlet',

      'light', 'lighting', 'bulb', 'led', 'fan', 'motor', 'mcb', 'fuse', 'circuit',// Export the service

      'voltage', 'current', 'power', 'watt', 'amp', 'volt', 'installation', 'safety',export default new OpenAIService();
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