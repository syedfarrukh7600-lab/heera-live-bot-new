const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const path = require('path');

const app = express();
app.use(express.json());

// جمنائی کا سیٹ اپ
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ہوم پیج پر خوبصورت چیٹ انٹرفیس (HTML/CSS)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ur">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Heera AI Chat</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #efeae2; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; }
            .chat-header { background-color: #075e54; color: white; padding: 15px; text-align: center; font-size: 20px; font-weight: bold; }
            .chat-container { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
            .message { max-width: 70%; padding: 10px 15px; border-radius: 10px; font-size: 16px; margin: 5px 0; line-height: 1.4; }
            .user-msg { background-color: #d9fdd3; align-self: flex-end; border-top-right-radius: 0; }
            .bot-msg { background-color: white; align-self: flex-start; border-top-left-radius: 0; direction: rtl; }
            .input-area { background-color: #f0f0f0; padding: 10px; display: flex; gap: 10px; align-items: center; }
            input { flex: 1; padding: 12px; border: none; border-radius: 20px; font-size: 16px; outline: none; }
            button { background-color: #00a884; color: white; border: none; padding: 12px 20px; border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="chat-header">ہیرا اے آئی (Heera AI)</div>
        <div class="chat-container" id="chatContainer">
            <div class="message bot-msg">سلام فرخ بھائی! میں ہیرا ہوں۔ آپ کیسے ہیں؟ آج ہم کس موضوع پر بات کریں؟</div>
        </div>
        <div class="input-area">
            <input type="text" id="userInput" placeholder="یہاں اپنا پیغام لکھیں..." onkeypress="if(event.key === 'Enter') sendMessage()">
            <button onclick="sendMessage()">بھیجیں</button>
        </div>

        <script>
            async function sendMessage() {
                const input = document.getElementById('userInput');
                const text = input.value.trim();
                if (!text) return;

                // صارف کا میسج اسکرین پر دکھائیں
                appendMessage(text, 'user-msg');
                input.value = '';

                // بوٹ کا جواب لینے کے لیے سرور کو بھیجیں
                try {
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { '腔ontent-Type': 'application/json' },
                        body: JSON.stringify({ message: text })
                    });
                    const data = await response.json();
                    appendMessage(data.reply, 'bot-msg');
                } catch (error) {
                    appendMessage('معذرت، کچھ خرابی ہو گئی ہے۔ دوبارہ کوشش کریں۔', 'bot-msg');
                }
            }

            function appendMessage(text, className) {
                const container = document.getElementById('chatContainer');
                const msgDiv = document.createElement('div');
                msgDiv.className = 'message ' + className;
                msgDiv.innerText = text;
                container.appendChild(msgDiv);
                container.scrollTop = container.scrollHeight;
            }
        </script>
    </body>
    </html>
    `);
});

// چیٹ کی API جو جمنائی سے جواب لائے گی
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });
        res.json({ reply: response.text });
    } catch (error) {
        res.status(500).json({ reply: "خرابی: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
