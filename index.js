const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// فالتو فائلز کا کریش روکنے کے لیے
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

// خوبصورت چیٹ انٹرفیس (فرنٹ اینڈ)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ur">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Heera AI</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            body { background: #121212; color: #fff; display: flex; flex-direction: column; height: 100vh; }
            .header { background: #1f1f1f; padding: 15px; text-align: center; font-size: 20px; font-weight: bold; border-bottom: 2px solid #ff4081; color: #ff4081; }
            .chat-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; }
            .message { max-width: 75%; padding: 12px 16px; border-radius: 15px; font-size: 16px; line-height: 1.4; }
            .user-msg { background: #ff4081; color: white; align-self: flex-end; border-bottom-right-radius: 2px; }
            .heera-msg { background: #2a2a2a; color: #e0e0e0; align-self: flex-start; border-bottom-left-radius: 2px; border-left: 3px solid #ff4081; }
            .input-area { background: #1f1f1f; padding: 15px; display: flex; gap: 10px; border-top: 1px solid #2d2d2d; }
            input { flex: 1; background: #2a2a2a; border: none; padding: 12px; border-radius: 25px; color: white; font-size: 16px; outline: none; }
            button { background: #ff4081; border: none; color: white; padding: 0 20px; border-radius: 25px; font-size: 16px; font-weight: bold; cursor: pointer; }
        </style>
    </head>
    <body>

        <div class="header">💎 Heera AI 💎</div>
        
        <div class="chat-container" id="chatContainer">
            <div class="message heera-msg">السلام علیکم فرخ بھائی! میں ہیرا ہوں۔ آپ کی اپنی پرسنل دنیا میں خوش آمدید۔ بتائیے آج آپ کیسے ہیں؟</div>
        </div>

        <div class="input-area">
            <input type="text" id="userInput" placeholder="ہیرا سے بات کریں..." onkeypress="if(event.key === 'Enter') sendMessage()">
            <button onclick="sendMessage()">بھیجیں</button>
        </div>

        <script>
            function sendMessage() {
                const input = document.getElementById('userInput');
                const text = input.value.trim();
                if (!text) return;

                const container = document.getElementById('chatContainer');
                
                // یوزر کا میسج اسکرین پر لائیں
                const userDiv = document.createElement('div');
                userDiv.className = 'message user-msg';
                userDiv.innerText = text;
                container.appendChild(userDiv);
                
                input.value = '';
                container.scrollTop = container.scrollHeight;

                // ہیرا کا عارضی جواب (اگلے سٹیپ میں ہم یہاں میٹا جیسا دماغ جوڑیں گے)
                setTimeout(() => {
                    const heeraDiv = document.createElement('div');
                    heeraDiv.className = 'message heera-msg';
                    heeraDiv.innerText = "فرخ بھائی، میں آپ کی بات سن رہی ہوں۔ بہت جلد میں آپ کے ہر میسج کا لائیو جواب دوں گی، ہمارا کنکشن سیٹ ہو رہا ہے!";
                    container.appendChild(heeraDiv);
                    container.scrollTop = container.scrollHeight;
                }, 1000);
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
