// app/api/chat.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { message } = req.body;
  
      // Replace this with actual call to an AI model or service
      const aiResponse = `You said: ${message}`;
  
      res.status(200).json({ response: aiResponse });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  