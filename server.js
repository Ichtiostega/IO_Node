const express = require('express');
const { Client } = require('pg');

config = {
    host: 'sql.server928985.nazwa.pl',
    user: 'server928985_debater', // default process.env.PGUSER || process.env.USER
    password: 'AleksanderNieTakiWielki99%', //default process.env.PGPASSWORD
    database: 'server928985_debater', // default process.env.PGDATABASE || process.env.USER
    port: 5432, // default process.env.PGPORT
    query_timeout: 5000
  }

const client = new Client(config);
client.on('error', err => {
    console.error('Cached an error from the database client: ', err.stack)
    client.end();
    client.connect();
  })
client.connect();

const app = express();
app.use(express.json())
const node_port = 2137;
app.listen(node_port, () => console.log(`Listening on port ${node_port}`));

/////////////////////       Debug Section           //////////////////////////

tournament_record = {start_date: '2022-03-03T23:00:00.000Z', name: 'Nazwa debugowej debaty', city: 'Moskwa', location: 'Plac czerwony'}
phase_record = {name: 'Faza2', structure: 'NULL'}
debate_record = {d_time: '23:00:00.000', d_date: '2022-03-03', location: 'pod cerkwia', team_1: 'NULL', team_2: 'NULL'}

app.get('/debug/database', (req, res) => {
    data = '';
    client.query({text: "SELECT 'Database connection correct!' AS message"}, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows)
        }
    });
});

app.get('/debug/tables', (req, res) => {
    data = [];
    client.query({text: 'SELECT * FROM pg_catalog.pg_tables'}, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            qres.rows.forEach(row => {
                console.log({table: row.tablename, schema: row.schemaname});
                data.push({table: row.tablename, schema: row.schemaname})
            });
            res.send(data);
        }
    });
});

app.get('/debug/phase', (req, res) => {
    data = '';
    client.query(P_list, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows);
        }
    });
});

app.get('/debug/debate', (req, res) => {
    data = '';
    client.query(D_list, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows);
        }
    });
});

app.get('/debug/node', (req, res) => {
    res.send('Node server is working!');
    console.log('Sent response');
});

/////////////////////       Database Queries        //////////////////////////

T_list = {
    name:   'tournament_list',
    text:   'SELECT * FROM "Tournament"',
    values: []
}

D_list = {
    name:   'debate_list',
    text:   'SELECT * FROM "Debate"',
    values: []
}

P_list = {
    name:   'phase_list',
    text:   'SELECT * FROM "Tournament_phase"',
    values: []
}

D_list_phase = {
    name:   'debate_list_by_phase',
    text:   'SELECT * FROM "Debate" WHERE "Debate".tournament_id = $1 AND "Debate".phase_id = $2',
    values: []
}

P_list_tournament = {
    name:   'phase_list_by_debate',
    text:   'SELECT * FROM "Tournament_phase" WHERE "Tournament_phase".tournament_id = $1',
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
    text:   'INSERT INTO "Debate"(tournament_id, phase_id, d_time, d_date, location, team_1, team_2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    values: []
}

T_delete = {
    name:   'delete_tournament',
    text:   'DELETE FROM "Tournament" WHERE "Tournament".id = $1',
    values: []
}

PH_delete = {
    name:   'delete_phase',
    text:   'DELETE FROM "Tournament_phase" ph WHERE ph.tournament_id = $1 AND ph.id = $2',
    values: []
}

D_delete = {
    name:   'delete_debate',
    text:   'DELETE FROM "Debate" d WHERE d.tournament_id = $1 AND d.phase_id = $2 AND d.id = $3',
    values: []
}

//////////////////////////////      Posts       /////////////////////////////////

app.post('/api/tournament', (req, res) => {
    b = req.body;
    ti = JSON.parse(JSON.stringify(T_insert));
    ti.values = [b.start_date, b.name, b.city, b.location];
    client.query(ti, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows[0])
        }
    });
});

app.post('/api/tournament/:tid/phase', (req, res) => {
    b = req.body;
    p = req.params;
    phi = JSON.parse(JSON.stringify(PH_insert));
    phi.values = [p.tid, b.name, b.structure];
    client.query(phi, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows[0])
            res.send(qres.rows[0])
        }
    });
});

app.post('/api/tournament/:tid/phase/:pid/debate', (req, res) => {
    b = req.body;
    p = req.params;
    di = JSON.parse(JSON.stringify(D_insert));
    di.values = [p.tid, p.pid, b.d_time, b.d_date, b.location, b.team_1, b.team_2];
    client.query(di, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows[0])
            res.send(qres.rows[0])
        }
    });
});

//////////////////////////////      Deletes     ////////////////////////////////////

app.delete('/api/tournament/:tid', (req, res) => {
    p = req.params;
    td = JSON.parse(JSON.stringify(T_delete));
    td.values.push(p.tid);
    client.query(td, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send({Message: 'Success'})
        }
    });
});

app.delete('/api/tournament/:tid/phase/:pid', (req, res) => {
    p = req.params;
    pd = JSON.parse(JSON.stringify(PH_delete));
    pd.values.push(p.tid, p.pid);
    client.query(pd, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send({Message: 'Success'})
        }
    });
});

app.delete('/api/tournament/:tid/phase/:pid/debate/:did', (req, res) => {
    p = req.params;
    dd = JSON.parse(JSON.stringify(D_delete));
    dd.values.push(p.tid, p.pid, p.did);
    client.query(dd, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send({Message: 'Success'})
        }
    });
});

//////////////////////////////      Gets        ////////////////////////////////////

app.get('/api/tournament', (req, res) => {
    data = '';
    client.query(T_list, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows);
        }
    });
});

app.get('/api/tournament/:tid/phase', (req, res) => {
    p = req.params;
    ptl = JSON.parse(JSON.stringify(P_list_tournament));
    ptl.values.push(p.tid);
    client.query(ptl, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows)
        }
    });
});

app.get('/api/tournament/:tid/phase/:pid/debate', (req, res) => {
    p = req.params;
    dpl = JSON.parse(JSON.stringify(D_list_phase));
    dpl.values.push(p.tid, p.pid);
    client.query(dpl, (err, qres) => {
        if (err) {
            console.log(err.stack)
            res.status(500)
            res.send(err.stack)
        } 
        else {
            console.log(qres.rows)
            res.send(qres.rows)
        }
    });
});