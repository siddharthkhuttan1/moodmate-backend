const express = require('express');
const router = express.Router();
const { analyzeEntry } = require('../utils/gpt');
const { getPlaylistForMood } = require('../utils/spotify');

router.post('/', async (req, res) => {
    const { entry } = req.body;

    try {
        if (entry.length <= 150) {
            const { mood, tone, tags } = await analyzeEntry(entry);
            const playlistUrl = await getPlaylistForMood(mood);
            res.json({ mood, tone, tags, playlistUrl });
        }
        else {
            const playlistUrl = await getPlaylistForMood("relaxed");
            res.json({ mood, tone, tags, playlistUrl });
        }

    } catch (error) {
        const errMsg = error?.error?.message;
        res.status(500).json({ error: errMsg || 'Something went wrong.' });
    }
});

module.exports = router;