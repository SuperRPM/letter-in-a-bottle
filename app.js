import express from 'express';
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const server = app.listen(4000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`http://localhost:${port}`);
});
