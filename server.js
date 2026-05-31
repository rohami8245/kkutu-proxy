const express = require("express");
const fetch = require("node-fetch");
const app = express();

const API_KEY = "995E0FAB6BE8EB5BC4899BF108D13AB4";

app.get("/check", async (req, res) => {
    const word = req.query.word;
    if (!word) return res.json({ valid: false });

    const url = `https://krdict.korean.go.kr/api/search?key=${API_KEY}&q=${encodeURIComponent(word)}&part=word&sort=dict&num=1&advanced=y&type1=word`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        // 디버그용 로그
        console.log("검색어:", word);
        console.log("응답:", text.substring(0, 500));

        // 단어가 정확히 일치하는지 확인
        const hasItem = text.includes("<total>") && !text.includes("<total>0</total>");
        res.json({ valid: hasItem });
    } catch (e) {
        console.error(e);
        res.json({ valid: false });
    }
});

app.listen(process.env.PORT || 3000);