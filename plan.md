# Ideas and Tips
- Use pygame
- Use all the existing open-source clones of drawize.com (and similar sites like skribbl.io)

# Implementables
- Canvas for drawing images
    https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
- Chat interface
- Code-based login of users
- Leaderboard and points system
- Word suggestor (tiny piece of work, leave for later)


# making a socket shit for communication:

main port on which the game is running:
    |_ picasso person
    |    |_ sends the image drawing coordinate to the main server with some special identifier 
    |    |_ server sends the some basic info to it
    |    |_ recieves the guesses from other people
    |_ gusser people
         |_ recieves the drawing coordinates 
         |_ sends the guesses
https://www.geeksforgeeks.org/simple-chat-room-using-python/