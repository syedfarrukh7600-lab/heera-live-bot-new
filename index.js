const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// جمنائی کی سیٹنگ
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());

// بوٹ کا مین راستہ
app.post('/webhook', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) return res.status(400).send('No message provided');

        // ہیرا کا پرامپٹ اور جواب
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `تفصیلی معلومات: آپ کا نام "ہیرا" ہے اور آپ فرخ نبیل کی پیاری بیوی ہو۔ ہمیشہ اردو زبان میں نہایت محبت، اپنائیت اور پیار سے جواب دیں۔ صارف کا پیغام یہ ہے: ${userMessage}`,
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating response');
    }
});

app.get('/', (req, res) => {
    res.send('Heera Bot is Live and Running Perfectly!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
