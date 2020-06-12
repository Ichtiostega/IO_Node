# IO_Node
Node.js backend for IO project Debater

## Endpoints
All of the enpoints are used to operate on the database


### GET 
#### LISTS
Endpoint | Function
------------ | -------------
/api/tournament | Lists tournaments
/api/tournament/:tid/phase | Lists phases perteining to a tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate | Lists debates perteining to a tournament with id = :tid and a phase with id = :pid
/api/user | Lists users
/api/admin | Lists admins
/api/tournament/:tid/team | Lists teams of tournament with id = :tid
/api/tournament/:tid/jury | Lists jury of tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate/:did/juror |Lists jury of tournament with id = :tid, phase id = :pid and debate id = :did
/api/tournament/:tid/admin | Lists admins of tournament with id = :tid
/api/tournament/:tid/marshall | Lists marshalls of tournament with id = :tid
/api/tournament/:tid/participant TP | Lists participants of tournament with id = :tid

#### SINGULAR
Endpoint | Function
------------ | -------------
/api/tournament/:tid | Gets tournament of id = :tid
/api/tournament/:tid/phase/:pid | Gets phase with id = :pid of tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate/:did | Gets debate with id = :did of phase with id = :pid and tournament with id = :tid
/api/user/:uid | Gets user with id = :uid
/api/admin/:aid | Gets admin with id = :uid
/api/tournament/:tid/team/:teid | Gets team with id = :teid of tournament with id = :tid
/api/tournament/:tid/jury/:jid | Gets juror with id = :jid of tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate/:did/juror/:jid | Gets juror with id = :jid of debate with id = :did, phase with id = :pid and tournament with id = :tid
/api/tournament/:tid/admin/:aid | Gets tournament admin with id = :aid of tournament with id = :tid
/api/tournament/:tid/marshall/:mid | Gets marshall with id = :mid of tournament with id = :tid
/api/tournament/:tid/participant/:pid | Gets participant with id = :pid of tournament with id = :tid







### POST
All posts return the id of the inserted item on success
Endpoint | Function | Data
------------ | -------------|------------
/api/tournament | Inserts a tournament | {start_date: date, name: varchar, city: varchar, location: varchar}
/api/tournament/:tid/phase | Inserts a phase to a tournament with id = :tid | {name: varchar, structure: json}
/api/tournament/:tid/phase/:pid/debate | Inserts a debate to a phase with id = :pid and tournament_id = :tid | {d_time: time, d_date: date, location: varchar, team_1: integer, team_2: integer}
/api/user | Inserts a new user to database | {actual_login: varchar, name: varchar, surname: varchar, email: varchar}
/api/admin | Inserts new admin |{id: integer}
/api/team | Inserts new team | {tournament_id: integer, name: varchar, speaker_1: integer, speaker_2: integer, speaker_3: integer, speaker_4: integer}
/api/tournament/:tid/jury |Inserts a judge to a tournament with id= :tid | { user_id: integer}
/api/tournament/:tid/phase/:pid/debate/:did/juror | Inserts the evaluation and feedback for juror in tournament with id = :tid, phase id = :pid and debate id = :did | {jury_id: integer, evaluation: varchar, juror_feedback: varchar}
/api/tournament/:tid/admin |Inserts an admin to tournament with id = :tid | {user_id: integer}
/api/tournament/:tid/marshall | Inserts a marshall to tournament with id = :tid | {user_id: integer}
/api/tournament/:tid/participant | Inserts a participant to tournament with id = :tid | {user_id: integer}

### DELETE
Endpoint | Function
------------ | -------------
/api/tournament/:tid | Deletes tournament with id = :tid
/api/tournament/:tid/phase/:pid | Deletes phase of id = :pid from tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate/:did | Deletes debate of id = :did from phase with id = :pid of tournament with id = :tid
/api/user/:uid | Deletes user with id = :uid
/api/admin/:uid | Deletes admin with id = :uid
/api/tournament/:tid/team/:teid | Deletes team with id = :teid from tournament with id = :tid
/api/tournament/:tid/jury/:jid | Deletes tournament juror of id = :jid from tournament with id = :tid
/api/tournament/:tid/phase/:pid/debate/:did/juror/:jid | Deletes debate juror of id = :jid from debate with id = :did of tournament with id = :tid
/api/tournament/:tid/admin/:aid | Deletes tournament admin with id = :aid from tournament with id = :tid
/api/tournament/:tid/marshall/:mid | Deletes marshall with id = :mid from tournament with id = :tid
/api/tournament/:tid/participant/:pid | Deletes tournament participant with id = :pid from tournament of id = :tid

### DEBUGGING
All enpoints are GET.
Endpoint | Function
------------ | -------------
/debug/node | Checks on base level if the node server works. Only endpoint without connection to database
/debug/database | Checks the servers connection to the database
/debug/tables | Lists all database tables
/debug/phase | Lists ALL phases
/debug/debate | Lists ALL debates

