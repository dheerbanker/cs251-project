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

# Chat 
- side chat box - independent of other componenets.
    - for picasso - can only view the message.
    - for guesser - can chat, sledge and audio/video chat.
- bottom sledge button
- audio chat option in the bottom 

# setting up the gameplay
1. user first login or create account 
2. then he is assigned a role of picasso or gusser
3. then he is presented with a page of his requirement by react
4. he play the game the life goes on.
