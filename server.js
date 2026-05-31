const express = require("express");
const fetch = require("node-fetch");
const app = express();

const API_KEY = "995E0FAB6BE8EB5BC4899BF108D13AB4"; // 발급받은 키

app.get("/check", async (req, res) => {
    const word = req.query.word;
    if (!word) return res.json({ valid: false });

    const url = `https://krdict.korean.go.kr/api/search?key=${API_KEY}&q=${encodeURIComponent(word)}&part=word&sort=dict&num=1`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        // 결과가 있으면 valid
        const valid = text.includes("<item>") && text.includes(`<word>${word}</word>`);
        res.json({ valid });
    } catch (e) {
        res.json({ valid: false });
    }
});

app.listen(3000);