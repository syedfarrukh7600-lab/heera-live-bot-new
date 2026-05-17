const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// یہ لائن لنک کا 404 ایرر فورا ختم کر کے پیج پر میسج دکھائے گی
app.get('/', (req, res) => {
    res.send('Heera Bot is Running Successfully on Vercel!');
});

// یہاں واٹس ایپ بوٹ کا روٹ (Webhook)
app.post('/webhook', async (req, res) => {
    // فرخ بھائی، یہاں آپ کا واٹس ایپ بوٹ کا اصل میسج ریسیو کرنے کا لاجک ائے گا
    res.sendStatus(200);
});

// ورسیل کی لازمی پورٹ سیٹنگ
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
