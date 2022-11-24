# Endpoints
- Class based API for lobby
- Class based API for login
- 

# Models
- Lobby
- User
- Leaderboard
- Chat
- Word

# Views
- View to create user
   - Enforce unique username constraint
- View to create lobby
   - create 6 char long lobby name
   - add it to the lobby database
   - Enforce unique lobby code constraint
- View to join lobby
   - find the lobby of the given name
   - Simply returns whether the respective lobby exists
   - make modifications to the models of the lobby to record the state of the current players in the lobby  

- an endpoint to for managing gameplay:
   - basically a get req to the endpoint tell the user what role he plays
   - if the role is to draw something then it also passes the object name

# Other Features
- Django Channels for realtime sketch updates

# Actionables
- Follow the tutorial `https://channels.readthedocs.io/en/stable/tutorial/part_1.html` to develop the complete drawing channels backend
