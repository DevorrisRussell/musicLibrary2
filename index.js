const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const app = express();

app.get('/api/songs', (req, res) => { 
    const songs = repoContext.songs.findAllSongs();
    
    return res.send(songs);
});


app.listen(3000, function() {
    console.log("Server started. Listening on 3000");
});