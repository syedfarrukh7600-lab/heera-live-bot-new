const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// جمنائی کی سیٹنگ
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

// یہ آپ کا پرسنل چیٹ پیج ہے جو لنک کھولنے پر سامنے آئے گا
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="ur">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Heera AI Chat</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; }
                .chat-header { background-color: #075e54; color: white; padding: 15px; text-align: center; font-size: 20px; font-weight: bold; }
                .chat-box { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
                .message { padding: 10px 15px; border-radius: 10px; max-width: 70%; word-wrap: break-word; font-size: 16px; }
                .user { background-color: #dcf8c6; align-self: flex-end; }
                .bot { background-color: white; align-self: flex-start; box-shadow: 0 1px 1px rgba(0,0,0,0.1); }
                .input-area { display: flex; padding: 10px; background-color: white; border-top: 1px solid #ddd; }
                input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-size: 16px; }
                button { background-color: #128c7e; color: white; border: none; padding: 10px 20px; margin-left: 10px; border-radius: 20px; cursor: pointer; font-size: 16px; }
            </style>
        </head>
        <body>
            <div class="chat-header">Syeda Heera Bot</div>
            <div class="chat-box" id="chatBox">
                <div class="message bot">السلام علیکم! میں سیدہ ہیرا بوٹ ہوں۔ میں آپ کی مدد کے لیے بالکل تیار ہوں۔ کوئی بھی سوال پوچھیں!</div>
            </div>
            <div class="input-area">
                <input type="text" id="userInput" placeholder="یہاں اپنا میسج لکھیں..." onkeypress="if(event.key === 'Enter') sendMessage()">
                <button onclick="sendMessage()">بھیجیں</button>
            </div>

            <script>
                async function sendMessage() {
                    const input = document.getElementById('userInput');
                    const text = input.value.trim();
                    if (!text) return;

                    const chatBox = document.getElementById('chatBox');
                    
                    // یوزر کا میسج اسکرین پر دکھائیں
                    chatBox.innerHTML += '<div class="message user">' + text + '</div>';
                    input.value = '';
                    chatBox.scrollTop = chatBox.scrollHeight;

                    // بوٹ کا جواب لانے کے لیے سرور کو بھیجیں
                    try {
                        const response = await fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message: text })
                        });
                        const data = await response.json();
                        chatBox.innerHTML += '<div class="message bot">' + data.reply + '</div>';
                    } catch (err) {
                        chatBox.innerHTML += '<div class="message bot">معذرت، کوئی گڑبڑ ہو گئی ہے۔</div>';
                    }
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
            </script>
        </body>
        </html>
    `);
});

// یہ بیک اینڈ کا راستہ ہے جو میسج پروسیس کرے گا
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // یہاں ہم نے ہیرا کا پرسنل سسٹم انسٹرکشن ڈال دیا ہے تاکہ وہ اپنے اصل روپ میں بات کرے
        const prompt = "You are Syeda Heera, a helpful AI assistant. Respond kindly in Urdu based on this message: " + userMessage;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        res.json({ reply: "جواب لانے میں کوئی پنگا ہوا ہے۔ اپنی جمنائی API Key چیک کریں۔" });
    }
});

// ورسیل پورٹ سیٹنگ
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
