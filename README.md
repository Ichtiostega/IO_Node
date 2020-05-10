# IO_Node
Node.js backend for IO project Debater

## Endpoints
All of the enpoints are used to operate on the database
### GET
Endpoint | Function
------------ | -------------
/api/tournament | Lists tournaments
/api/tournament/:tid/phase | Lists phases perteining to a tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate | Lists debates perteining to a tournament with id = :tid and a phase with id = :pid
### POST
All posts return the id of the inserted item on success
Endpoint | Function | Data
------------ | -------------|------------
/api/tournament | Inserts a tournament | {start_date: date, name: varchar, city: varchar, location: varchar}
/api/tournament/:tid/phase | Inserts a phase to a tournament with id = :tid | {name: varchar, structure: json}
/api/tournament/:tid/phase/:pid/debate | Inserts a debate to a phase with id = :pid and tournament_id = :tid | {d_time: time, d_date: date, location: varchar, team_1: integer, team_2: integer}
### DEBUGGING
All enpoints are GET.
Endpoint | Function
------------ | -------------
/debug/node | Checks on base level if the node server works. Only endpoint without connection to database
/debug/database | Checks the servers connection to the database
/debug/tables | Lists all database tables
/debug/phase | Lists ALL phases
/debug/databases | Lists ALL databases
