$(document).ready(init);

function init() {
    getSongs();

    $('#new-song').on('submit', postSong);
}

function postSong(event) {
    event.preventDefault();
    const newSong = {
        rank: $('#js-form-rank').val(),
        artist: $('#js-form-artist').val(),
        track: $('#js-form-track').val(),
        published: $('#js-form-published').val(),
    }

    $.ajax({
        method: "POST",
        url: "/api/songs",
        data: newSong
    })
    .then((response) => {
        getSongs();
    })
    .catch((err) => {
        console.warn(err);
    })
}

function getSongs() {
    $.ajax({
        method: "GET",
        url: "/api/songs"
    })
    .then((response) => {
        render(response);
    })
    .catch((err) => {
        console.warn(err);
    })
}

function render(songs) {
    $('.container').empty();
    for(let song of songs) {
        console.log(song);
        $('.container').append(`
            <div>
                <p>${song.rank} - ${song.artist} - ${song.track}</p>
            </div>
        `)
    }
}