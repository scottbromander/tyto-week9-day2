const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    pool.query(`SELECT * FROM "songs"`)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req,res) => {
    const newSong = req.body;
    console.log(newSong);

    const queryString = `INSERT INTO "songs" (artist, rank, track, published) VALUES
    ('${newSong.artist}', '${newSong.rank}', '${newSong.track}', '${newSong.published}');`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


module.exports = router;