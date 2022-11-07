import socket			

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)		
print ("Socket successfully created")

bind_port = 5458 
bind_ip = "0.0.0.0"

# s.bind((socket.gethostname(),port))		
s.bind((bind_ip,bind_port))		
# s.connect((socket.gethostname(),port))
print ("socket binded to %s" %(bind_port))
# print(s.getpeername())
# host,port_name  = s.getpeername()
# print(socket.gethostbyname("pop-os"))
print(bind_ip)


s.listen(5)	
print ("socket is listening")		

while True:

	c, addr = s.accept()	
	print ('Got connection from', addr )

	c.send('Thank you for connecting'.encode())

	c.close()

	break
s.close()
