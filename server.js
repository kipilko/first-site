import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Раздаём статические файлы из текущей папки
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(express.json());

app.post('/ai', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.deepai.org/api/text-generator', {
      method: 'POST',
      headers: { 'Api-Key': process.env.DEEP_AI_KEY },
      body: new URLSearchParams({ text: message })
    });
    const data = await response.json();
    console.log(data)
    res.json({ reply: data.output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка от ИИ' });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${3000}`));
