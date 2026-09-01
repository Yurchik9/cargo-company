
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { category, car, phone, date, time, comments } = req.body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const text = `🔥 Нова заявка з сайту!
  
🛠 Категорія: ${category || 'Не вказано'}
🚘 Авто: ${car || 'Не вказано'}
📞 Телефон: ${phone || 'Не вказано'}
📅 Дата: ${date || 'Не вказано'}
⏰ Час: ${time || 'Не вказано'}
💬 Коментар: ${comments || 'Немає'}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: text }),
        });

        if (response.ok) {
            res.status(200).json({ success: true, message: 'Order sent successfully' });
        } else {
            res.status(500).json({ error: 'Failed to send message to Telegram' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}