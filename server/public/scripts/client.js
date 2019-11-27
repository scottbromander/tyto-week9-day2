$(document).ready(init);

function init() {
    getSongs();

    $('#new-song').on('submit', getValuesFromForm);

    $('.container').on('click', '.js-btn-delete', deleteSong);
    $('.container').on('click', '.js-btn-up', upvote);
    $('.container').on('click', '.js-btn-down', downvote);
}

function getValuesFromForm(event) {
    event.preventDefault();
    const newSong = {
        rank: $('#js-form-rank').val(),
        artist: $('#js-form-artist').val(),
        track: $('#js-form-track').val(),
        published: $('#js-form-published').val(),
    }
    postSong(newSong);
}

function postSong(newSong) {
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

function deleteSong() {
    const idNumber = $(this).data('id');

    $.ajax({
        method: "DELETE",
        url: '/api/songs/' + idNumber // /api/songs/65
    })
    .then((response) => {
        getSongs();
    })
    .catch((response) => {
        console.warn(response);
    })
}

function upvote() {
    updateSong('up', $(this).data('id'))
}

function downvote() {
    updateSong('down', $(this).data('id'));
}

function updateSong(direction, id) {
    $.ajax({
        method: 'PUT',
        url: '/api/songs/' + id,
        data:  {
            direction: direction
        }
    })
    .then((response) => {
        getSongs();
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
                <p>${song.rank} - ${song.artist} - ${song.track} - upvote:
                <span><button class="js-btn-down" data-id="${song.id}">v</button></span>
                ${song.upvote}
                <span><button class="js-btn-up" data-id="${song.id}">^</button></span>
                <span><button class="js-btn-delete" data-id="${song.id}">X</button</span>
                </p>
            </div>
        `)
    }
}