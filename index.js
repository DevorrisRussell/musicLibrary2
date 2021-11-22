const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const cors = require("cors");
const {validateSong} = require('./middleware/songs-validation');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(5000, function() {
    console.log("Server started. Listening on 5000");
});

app.get('/api/songs', (req, res) => { 
    const songs = repoContext.songs.findAllSongs();
    
    return res.send(songs);
});

app.get('/api/songs/:id', (req, res) => { 
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    
    return res.send(song);
});

app.post('/api/songs', [validateSong], (req, res) => { 
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    
    return res.send(addedSong);
});

app.put('/api/songs/:id', [validateSong], (req, res) => { 
    const id = req.params.id;
    const songPropertiesToUpdate = req.body;
    const updateSong = repoContext.songs.updateSong(id, songPropertiesToUpdate);
    
    return res.send(updateSong);
});


app.delete('/api/songs/:id', (req, res) => { 
    const id = req.params.id;
    
    const updatedDataSet = repoContext.songs.deleteSong(id);
    
    return res.send(updatedDataSet);
});