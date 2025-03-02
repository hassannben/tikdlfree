const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.json({ success: false, message: "يرجى إدخال رابط" });
    }

    try {
        const response = await axios.get(`https://api.snaptik.app/v1?url=${url}`);
        const downloadLink = response.data.url;
        
        if (downloadLink) {
            res.json({ success: true, downloadLink });
        } else {
            res.json({ success: false, message: "الرابط غير صالح" });
        }
    } catch (error) {
        res.json({ success: false, message: "حدث خطأ أثناء التحميل" });
    }
});

app.listen(PORT, () => {
    console.log(`السيرفر شغال على http://localhost:${PORT}`);
});
