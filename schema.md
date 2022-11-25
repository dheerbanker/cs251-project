# Schema of database used
## Lobby
- code VARCHAR(32) PRIMARY KEY
- curr_drawer VARCHAR(64) NOT NULL
- count INTEGER NOT NULL
- word VARCHAR(100) NOT NULL
- first_drawer VARCHAR(100) NOT NULL
- creation_time TIME
## Player
- player_name VARCHAR(64) NOT NULL
- code FOREIGN KEY(Lobby) NOT NULL
- score INTEGER NOT NULL
## Leaderboard
- player_name VARCHAR(100) NOT NULL
- score INTEGER