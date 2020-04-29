const express = require('express');
const app = express();
const port = 2137;

tournaments = ['1 turniej agh', '2 turniej uj', '3 turniej up'];

app.get('/', (req, res) => {
    res.send('Response to base request');
    console.log('Sent response');
});

app.get('/tournament', (req, res) => {
    data = '';
    for(el in tournaments)
    {
        data += el + '\n';
    }
    res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
