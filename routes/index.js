var express = require('express');
var router = express.Router();
const axios = require('axios')
const qs = require("qs")
const api = "https://pinmate.online/analyze.php"
// /* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });
router.get('/proxy', async (req, res) => {
    const videoUrl = req.query.url;
    try {
        const response = await axios.get(videoUrl, {
            responseType: 'stream'
        });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Failed to fetch video');
    }
});
router.get('/download', async function (req, res, next) {
    try {
        const { url } = req.query;

        const data = {
            url: `${url}`
        };

        const headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': '_ga=GA1.1.1889987304.1725375229; _ga_1097FMV689=GS1.1.1725597452.5.0.1725597591.0.0.0; XSRF-TOKEN=<your-captured-xsrf-token>; other-cookie=<captured-cookie>',
            'Origin': 'https://pinmate.online',
            'Referer': 'https://pinmate.online/?utm_source=spotmate.online', // Adjust if needed
            'Sec-CH-UA': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'Sec-CH-UA-Mobile': '?0',
            'Sec-CH-UA-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        };

        const result = await axios.post(api, qs.stringify(data), { headers });

        console.log("Response:", result.data);
        res.status(200).json(result.data);

    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        res.status(e.response ? e.response.status : 500).json(e.response ? e.response.data : { message: "Internal Server Error" });
    }
});

module.exports = router;
