const express = require('express');
const { Client } = require('pg');

config = {
    host: 'sql.server928985.nazwa.pl',
    user: 'server928985_debater', // default process.env.PGUSER || process.env.USER
    password: 'AleksanderNieTakiWielki99%', //default process.env.PGPASSWORD
    database: 'server928985_debater', // default process.env.PGDATABASE || process.env.USER
    port: 5432 // default process.env.PGPORT
  }

const client = new Client(config);
const app = express();
app.use(express.json())
const node_port = 2137;
app.listen(node_port, () => console.log(`Listening on port ${node_port}`));

/////////////////////       Debug Section           //////////////////////////

tournament_record = {start_date: '2022-03-03T23:00:00.000Z', name: 'Nazwa debugowej debaty', city: 'Moskwa', location: 'Plac czerwony'}

app.get('/debug/test', (req, res) => {
    data = '';
    client.query({text: "SELECT 'testing' AS message"}, (err, qres) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log('###########RECEIVED FROM PG###################')
            console.log(qres)
            res.send(qres)
        }
    });
});

app.get('/debug/tables', (req, res) => {
    data = '';
    client.query({text: 'SELECT * FROM pg_catalog.pg_tables'}, (err, qres) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log('###########RECEIVED FROM PG###################')
            qres.rows.forEach(row => {
                console.log({table: row.tablename, schema: row.schemaname});
                data += 'Table: ' + row.tablename + ' Schema: ' + row.schemaname + '\n';
            });
            res.send(data);
        }
    });
});

/////////////////////       Database Queries        //////////////////////////

T_list = {
    name:   'tournament_list',
    text:   'SELECT * FROM "Tournament"'
}

D_list = {
    name:   'debate_list',
    text:   'SELECT * FROM "Debate"',
    values: []
}

D_list_phase = {
    name:   'debate_list_by_phase',
    text:   'SELECT * FROM "Debate" WHERE "Debate".phase_id = $1',
    values: []
}

T_insert = {
    name:   'insert_tournament',
    text:   'INSERT INTO "Tournament"(start_date, name, city, location) VALUES ($1, $2, $3, $4) RETURNING id',
    values: []
}

PH_insert = {
    name:   'insert_phase',
    text:   'INSERT INTO "Tournament_phase"(tournament_id, name, structure) VALUES ($1, $2, $3) RETURNING id',
    values: []
}

D_insert = {
    name:   'insert_debate',
    text:   'INSERT INTO Debate(tournament_id, phase_id, time, location, team_1, team_2) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    values: []
}

client.connect();

app.get('/', (req, res) => {
    res.send('Response to base request');
    console.log('Sent response');
});

//////////////////////////////      Posts       /////////////////////////////////

app.post('/api/tournament', (req, res) => {
    b = req.body;
    ti = JSON.parse(JSON.stringify(T_insert));
    ti.values.push(b.start_date, b.name, b.city, b.location);
    client.query(ti, (err, qres) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows)
        }
    });
});

app.post('/api/tournament/:tid/phase', (req, res) => {
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

app.post('/api/tournament/:tid/phase/:pid/debate', (req, res) => {
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

app.get('/api/tournament', (req, res) => {
    data = '';
    client.query(T_list, (err, qres) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log('###########RECEIVED FROM PG###################')
            console.log(qres)
            res.send(qres.rows);
        }
    });
});

app.get('/api/debate', (req, res) => {
    data = '';
    client.query(D_list, (err, qres) => {
        if (err) {
            console.log(err.stack)
        } 
        else {
            console.log('###########RECEIVED FROM PG###################')
            console.log(qres)
            res.send(qres.rows);
        }
    });
});