const express = require('express');
const app = express();

app.use(express.json());

// ہیرا بوٹ کا لائیو سٹیٹس چیک کرنے کے لیے مین ہوم پیج
app.get('/', (req, res) => {
    res.send('Heera Live Bot is running successfully!');
});

// یہاں نیچے آپ کا واٹس ایپ (WhatsApp/Webhook) کا باقی سارا کوڈ ائے گا
// app.post('/webhook', (req, res) => { ... });

// ورسیل (Vercel) کے لیے سب سے ضروری پورٹ سیٹنگ
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
