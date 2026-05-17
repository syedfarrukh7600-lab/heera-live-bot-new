const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// یہ لائن کسی بھی فالتو فائل کی ریکوئسٹ پر کریش ہونے سے بچائے گی
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

// مین ہوم پیج کا روٹ
app.get('/', (req, res) => {
    res.send('Heera AI Bot is Live and Running Perfectly!');
});

// آپ کا بوٹ کا مین لاجک والا روٹ
app.post('/webhook', (req, res) => {
    res.send('Webhook received');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
