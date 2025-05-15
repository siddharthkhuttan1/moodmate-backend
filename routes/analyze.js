const express = require('express');
const router = express.Router();
const { analyzeEntry } = require('../utils/gpt');
const { getPlaylistForMood } = require('../utils/spotify');

router.post('/', async (req, res) => {
    const { entry } = req.body;

    try {
        const { mood, tone, tags } = await analyzeEntry(entry);
        const playlistUrl = await getPlaylistForMood(mood);

        res.json({ mood, tone, tags, playlistUrl });
    } catch (error) {
        const errMsg = error?.error?.message;
        res.status(500).json({ error: errMsg || 'Something went wrong.' });
    }
});

module.exports = router;