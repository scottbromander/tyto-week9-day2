const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const songRouter = require('./routers/song.router');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//ROUTES
app.use('/api/songs', songRouter);

app.listen(PORT, () => {
    console.log(`Hey I am up and running! On port: ${PORT}`);
})