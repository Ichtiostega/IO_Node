const express = require('express');
const app = express();
const port = 2137;

app.get('/', (req, res) => {
    res.send('Response to base request');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
