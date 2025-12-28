import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the public directory (use site files there)
app.use(express.static(path.join(__dirname,)));

app.post('/ai', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'No message provided' });

  if (!process.env.HF_TOKEN) {
    console.error('HF_TOKEN not set');
    return res.status(500).json({ error: 'Server not configured (missing HF_TOKEN)' });
  }

  try {
    const hfRes = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: message })
    });

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.error('HuggingFace error:', errText);
      return res.status(502).json({ error: 'AI service error', details: errText });
    }

    const data = await hfRes.json();

    let reply = '';
    if (Array.isArray(data)) {
      // many HF text-generation models return [{generated_text: '...'}]
      if (data[0] && data[0].generated_text) reply = data[0].generated_text;
      else reply = JSON.stringify(data);
    } else if (data.generated_text) {
      reply = data.generated_text;
    } else {
      reply = JSON.stringify(data);
    }

    return res.json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => console.log(`🔥 Server running on http://localhost:${port}`));
