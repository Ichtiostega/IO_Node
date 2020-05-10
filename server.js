const express = require('express');
const pg = require('pg');
const client = pg();
const app = express();
app.use(express.json())
app.listen(port, () => console.log(`Listening on port ${port}`));
const port = 2137;

/////////////////////       Database Queries        //////////////////////////

T_list = {
    name:   'tournament_list',
    text:   'SELECT * FROM tournament'
}

D_list = {
    name:   'debate_list',
    text:   'SELECT * FROM debate WHERE debate.phase_id = $1',
    values: []
}

T_insert = {
    name:   'insert_tournament',
    text:   'INSERT INTO tournament(start_date, name, city, location) VALUES ($1, $2, $3, $4) RETURNING id',
    values: []
}

PH_insert = {
    name:   'insert_tournament',
    text:   'INSERT INTO tournament(tournament_id, name, structure) VALUES ($1, $2, $3) RETURNING id',
    values: []
}

D_insert = {
    name:   'insert_debate',
    text:   'INSERT INTO debate(tournament_id, phase_id, time, location, team_1, team_2) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    values: []
}

await client.connect();

app.get('/', (req, res) => {
    res.send('Response to base request');
    console.log('Sent response');
});

//////////////////////////////      Posts       /////////////////////////////////

app.post('/tournament', (req, res) => {
    b = req.body;
    ti = JSON.parse(JSON.stringify(T_insert));
    ti.values.push(b.start_date, b.name, b.city, b.location);
    client.query(ti, (err, res) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log(res.rows[0])
        }
    });
});

app.post('/tournament/:tid/phase', (req, res) => {
    b = req.body;
    p = req.params;
    phi = JSON.parse(JSON.stringify(PH_insert));
    phi.values.push(p.tid, b.name, b.structure);
    client.query(phi, (err, res) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log(res.rows[0])
        }
    });
});

app.post('/tournament/:tid/phase/:pid/debate', (req, res) => {
    b = req.body;
    p = req.params;
    di = JSON.parse(JSON.stringify(D_insert));
    di.values.push(p.tid, p.pid, b.time, b.location, b.team_1, b.team_2);
    client.query(di, (err, res) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log(res.rows[0])
        }
    });
});

//////////////////////////////      Gets        ////////////////////////////////////

app.get('/tournament', (req, res) => {
    data = '';
    client.query(T_list, (err, qres) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            res.send(qres)
        }
    });
    res.send(data);
});
