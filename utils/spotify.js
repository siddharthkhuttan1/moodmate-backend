const moodMap = {
    happy: "37i9dQZF1DXdPec7aLTmlC",
    anxious: "37i9dQZF1DX3rxVfibe1L0",
    sad: "37i9dQZF1DWSqBruwoIXkA",
    relaxed: "37i9dQZF1DX4WYpdgoIcn6",
    angry: "37i9dQZF1DWTtTyUw2QvU1",
};


async function getPlaylistForMood(mood) {
    const playlistId = moodMap[mood] || moodMap["relaxed"];
    return `https://open.spotify.com/embed/playlist/${playlistId}`;
}

module.exports = { getPlaylistForMood };
