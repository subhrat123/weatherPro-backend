import express from 'express';
import getAqi from '../server/controller/aqiController.js';
// import chatWithAI from './controller/chatController.js';
import chatbotResponse from './controller/generativeAi.js';
const routes= express.Router();

routes.get('/aqi',getAqi);
routes.get('/', (req, res) => res.json({love: "happy"}));
routes.post('/chat', chatbotResponse);

export default routes;