# Import socket module
import socket			

# Create a socket object
s = socket.socket()		

# Define the port on which you want to connect

# connect to the server on local computer
server_ip = "0.0.0.0"
my_ip = "49.32.147.164"
server_port = 5458
s.connect((server_ip, server_port))

# receive data from the server and decoding to get the string.
print (s.recv(1024).decode())
# close the connection
s.close()	
	
