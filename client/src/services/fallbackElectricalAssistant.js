// Fallback Electrical Assistant - Works without OpenAI API
// Provides basic electrical advice when ChatGPT is unavailable

class FallbackElectricalAssistant {
  constructor() {
    this.storeInfo = {
      name: "Jaimaaruthi Electrical and Hardware Store",
      location: "Mettukadai",
      owner: "Prannav P",
      upi: "prannav2511@okhdfcbank",
      bank: "Karur Vysya Bank 1054"
    };

    // Common electrical FAQs and responses
    this.electricalFAQs = {
      // Switches and Sockets
      'switch': `🔌 **Electrical Switches at Jaimaaruthi Store**

**Types Available:**
- **Modular Switches**: Modern, safe, easy to install
- **Traditional Switches**: Cost-effective, reliable
- **Dimmer Switches**: For lighting control
- **Touch Switches**: Premium, modern design

**Popular Brands**: Legrand, Schneider, Anchor, Havells

**Safety Tip**: Always turn off main power before switch installation!`,

      'socket': `⚡ **Power Sockets & Outlets**

**Types We Stock:**
- **5A Sockets**: For small appliances
- **15A Sockets**: For heavy-duty equipment
- **USB Sockets**: Modern convenience
- **Weatherproof Sockets**: For outdoor use

**Installation**: Proper earthing is essential for safety!`,

      // Lighting
      'light': `💡 **Lighting Solutions**

**LED Options:**
- **LED Bulbs**: Energy-efficient, long-lasting
- **Tube Lights**: For offices and homes
- **Decorative Lights**: For ambiance
- **Street Lights**: Outdoor lighting

**Benefits**: 80% energy savings compared to traditional bulbs!

**Wattage Guide**:
- 9W LED = 60W Traditional
- 12W LED = 100W Traditional`,

      'led': `💡 **LED Lighting at Jaimaaruthi Store**

**Why Choose LED?**
✅ 80% energy saving
✅ 25,000+ hour lifespan  
✅ No heat generation
✅ Instant brightness

**Room Recommendations**:
- **Living Room**: 12W-15W LED
- **Bedroom**: 9W-12W LED
- **Kitchen**: 15W-20W LED
- **Bathroom**: 9W LED (waterproof)`,

      // Fans
      'fan': `🌀 **Ceiling Fans & Ventilation**

**Ceiling Fan Guide**:
- **Room Size 10x10**: 48" fan
- **Room Size 12x12**: 52" fan  
- **Room Size 15x15**: 56" fan

**Types Available**:
- **Regular Fans**: Cost-effective
- **Decorative Fans**: Stylish designs
- **BLDC Fans**: Energy-efficient
- **Exhaust Fans**: For ventilation

**Top Brands**: Bajaj, Crompton, Havells, Orient`,

      // Wiring and Safety
      'wire': `🔌 **Electrical Wiring & Cables**

**Cable Types**:
- **House Wire**: For internal wiring
- **Flexible Wire**: For appliances
- **Armoured Cable**: For underground
- **Coaxial Cable**: For TV/internet

**Wire Gauge Guide**:
- **Lights**: 1.5 sq mm
- **Fans/AC**: 2.5 sq mm
- **Geysers**: 4 sq mm

**Safety**: Always use ISI marked cables!`,

      'mcb': `⚡ **MCB & Circuit Protection**

**MCB (Miniature Circuit Breaker)**:
- **Single Pole**: For lights (6A, 10A, 16A)
- **Double Pole**: For appliances (20A, 25A, 32A)
- **Triple Pole**: For 3-phase (40A, 50A, 63A)

**Brands**: Schneider, L&T, Siemens, ABB

**Why MCB?**: Automatic protection from overload and short circuits!`,

      // Motors and Power
      'motor': `⚡ **Electric Motors**

**Types We Stock**:
- **Submersible Motors**: For bore wells
- **Monoblock Motors**: For water pumps
- **Centrifugal Motors**: For agriculture
- **Single Phase**: 0.5HP to 3HP
- **Three Phase**: 1HP to 10HP

**Brands**: Crompton, V-Guard, Kirloskar, CRI`,

      // Tools
      'tool': `🔧 **Power Tools & Equipment**

**Available Tools**:
- **Drill Machines**: For holes and screws
- **Angle Grinders**: For cutting/grinding
- **Soldering Irons**: For electronics
- **Voltage Testers**: For safety
- **Wire Strippers**: For wiring

**Brands**: Bosch, Black & Decker, Stanley

**Safety Gear**: Gloves, safety glasses, voltage testers always recommended!`,

      // General Safety
      'safety': `⚠️ **Electrical Safety Guidelines**

**Basic Safety Rules**:
1. **Turn OFF main power** before any work
2. **Use proper tools** - insulated handles
3. **Check voltage** with tester before touching
4. **Proper earthing** for all appliances
5. **NEVER work in wet conditions**

**Emergency**: If someone gets electric shock, turn off power FIRST, then help!

**Professional Help**: For major electrical work, always consult qualified electrician!`,

      // Store Information
      'store': `🏪 **Jaimaaruthi Electrical & Hardware Store**

📍 **Location**: Mettukadai
👤 **Owner**: Prannav P
💳 **UPI Payment**: prannav2511@okhdfcbank
🏦 **Bank**: Karur Vysya Bank 1054

**Our Specialties**:
✅ Complete electrical solutions
✅ Quality products from trusted brands
✅ Expert advice and support
✅ Competitive pricing
✅ Installation guidance

**Product Range**: Switches, lights, fans, wiring, motors, tools, safety equipment and much more!`
    };

    // Product recommendations
    this.productRecommendations = {
      'living room lighting': 'For living room, I recommend 12W-15W LED bulbs with warm white light (3000K). Consider decorative LED panels for modern look.',
      'bedroom fan': 'For bedroom, a 52" ceiling fan with 4-5 star rating works well. BLDC fans are energy-efficient and silent.',
      'kitchen wiring': 'Kitchen needs 2.5 sq mm wire for appliances and 1.5 sq mm for lights. Use 15A sockets for heavy appliances.',
      'bathroom exhaust': 'Install 6" exhaust fan (150mm) for standard bathroom. Ensure it\'s waterproof rated.',
      'home mcb': 'For home, use 10A MCB for lights, 16A for fans, and 20A-32A for heavy appliances like AC/geyser.'
    };
  }

  // Main method to handle electrical questions
  askElectricalQuestion(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Check for exact FAQ matches
    for (const [keyword, response] of Object.entries(this.electricalFAQs)) {
      if (lowerQuestion.includes(keyword)) {
        return {
          success: true,
          answer: response,
          source: 'Jaimaaruthi Store Knowledge Base'
        };
      }
    }

    // Check for product recommendations
    for (const [query, recommendation] of Object.entries(this.productRecommendations)) {
      if (lowerQuestion.includes(query)) {
        return {
          success: true,
          answer: `💡 **Product Recommendation**\n\n${recommendation}\n\n📞 **Need More Help?** Visit us at Jaimaaruthi Electrical Store, Mettukadai for personalized advice!`,
          source: 'Store Recommendations'
        };
      }
    }

    // Generic electrical response
    if (this.isElectricalQuestion(question)) {
      return {
        success: true,
        answer: `⚡ **Electrical Question Received**\n\nI understand you're asking about: "${question}"\n\n**For detailed technical advice**, please:\n\n1. 🏪 **Visit our store** at Mettukadai\n2. 📞 **Speak with our experts** for personalized solutions\n3. 🛒 **See our products** hands-on\n\n**Common Topics I Can Help With**:\n- Switches & Sockets\n- Lighting Solutions (LED)\n- Ceiling Fans\n- Electrical Wiring\n- MCBs & Safety\n- Motors & Pumps\n- Power Tools\n\n**Try asking**: "tell me about LED lights" or "ceiling fan guide"`,
        source: 'Fallback Assistant'
      };
    }

    // Non-electrical question
    return {
      success: true,
      answer: `🏪 **Welcome to Jaimaaruthi Electrical Store!**\n\nI specialize in electrical questions and products. \n\n**I can help you with**:\n- ⚡ Electrical products and advice\n- 💡 Lighting solutions\n- 🔌 Switches and wiring\n- 🌀 Fans and motors\n- 🔧 Tools and safety equipment\n\n**Try asking about**: switches, LED lights, ceiling fans, wiring, or electrical safety!\n\n📍 **Visit us**: Jaimaaruthi Electrical Store, Mettukadai\n💳 **UPI**: prannav2511@okhdfcbank`,
      source: 'Store Information'
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

  // Get store information
  getStoreInfo() {
    return this.storeInfo;
  }
}

export default FallbackElectricalAssistant;