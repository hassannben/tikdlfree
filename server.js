const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3000;

require("dotenv").config();
console.log("TIKAPI_KEY:", process.env.TIKAPI_KEY); // لتتأكد أن المفتاح موجود


app.use(cors());
app.use(express.json());

app.post("/api/download", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "الرجاء إدخال الرابط" });
  }

  try {
    const response = await axios.get(`https://api.tikapi.io/fetch?url=${url}`, {
      headers: {
        "X-API-Key": process.env.TIKAPI_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "حدث خطأ أثناء التحميل" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
