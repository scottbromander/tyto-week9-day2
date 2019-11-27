const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "songs" ORDER BY "id" ASC`)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
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

// Client side, it looks like this -> /api/songs/5
// Server side, it receives it like this -> /api/songs/:id
// But now we have a variable, req.params.id = 5
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const songId = req.params.id;
    const queryString = `DELETE FROM "songs" WHERE "id" = ${songId};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});

/*
    $.ajax({
        method: 'PUT',
        url: '/api/songs/' + $(this).data('id')
        data:  {
            direction: "up"
        }
    })
*/
router.put('/:id', (req, res) => {
    // req.params.id = What entry do you want to update?
    // req.body.whatever = The data you want to update.
    const id = req.params.id;
    const direction = req.body.direction;
    let updateVote = `upvote + 1`;

    if (direction === "up") {
        updateVote = `upvote + 1`;
    } else {
        updateVote = `upvote - 1`;
    }

    let queryString = `UPDATE "songs" SET "upvote"=${updateVote} WHERE "id" = $1;`;

    // The value in the array is providing the value for $1 above.
    pool.query(queryString, [id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;

/*
 $.ajax({
     method: 'GET',
     url: '/api/songs/gizmo/baxter'
 })
*/
// router.get('/:kitty/:puppy', (req,res) => {
    // req.params.kitty = gizmo
    // req.params.puppy = baxter
// })