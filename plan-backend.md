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
   - Enforce unique lobby code constraint
- View to join lobby
   - Simply returns whether the respective lobby exists

# Other Features
- Django Channels for realtime sketch updates

# Actionables
- Follow the tutorial `https://channels.readthedocs.io/en/stable/tutorial/part_1.html` to develop the complete drawing channels backend
