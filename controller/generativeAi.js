import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import aqiService from "../services/aqiService.js"; 

dotenv.config();
console.log("API Key:", process.env.GENAI_API_KEY); 

// Initialize GoogleGenerativeAI with API Key
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

async function getAIResponse(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" }); // ✅ Use a supported model

        const response = await model.generateContent(userMessage);
        const textResponse = response; 

        console.log("AI Response:", textResponse);
        return textResponse;
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "Sorry, I couldn't generate a response.";
    }
}

async function chatbotResponse(req, res) {
    try {
        const weatherInfo = JSON.stringify(req.body.weather);
        console.log({ body: weatherInfo });
        const userMessage = req.body.message || "Hello how are you!";
        
        // OPTIONAL: Fetch AQI and weather data
        const aqiData = await aqiService();
        console.log("AQI Data:", aqiData);
        
        const prompt = `The user asked: '${userMessage}'.

Here’s the latest real-time data:

🌡️ Current Weather information: ${weatherInfo}
🌫️ AQI: ${aqiData.aqi} (Air Quality Index)
📍 City: ${aqiData.city}
📌 Guidelines for Response:

If the question is about AQI, weather, or health, provide a short, clear, and useful answer.
If the question is off-topic, politely respond and guide the user back.
⚡ Example Responses:

If the user asks about AQI:
"The AQI in ${aqiData.city} is ${aqiData.aqi}, which is [AQI category]. If you have respiratory issues, consider staying indoors and wearing a mask outside."
If the user asks about the bot itself (e.g., "Tell me about yourself?"):
"I'm here to provide insights on air quality, weather, and health. Feel free to ask me anything related to these topics!"

If the user asks about the weather understand the provided current weather information and generate a response based on that.
If the user asks a completely random question:
"That’s interesting! But my main focus is helping you with AQI, weather, and health-related advice. Let me know if you need insights on these topics!"
🙌 How Can I Assist You Today?`;

        const aiResponse = await getAIResponse(prompt);
        console.log(aiResponse.response.text());
        res.send(aiResponse.response.text() );
    } catch (error) {
        console.error("Error in chatbot response:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default chatbotResponse;

