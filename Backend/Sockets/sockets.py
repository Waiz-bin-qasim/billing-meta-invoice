def showBar(socketio,id):
    print("progressbaron")
    socketio.emit('showBar',{"show":True},to=id)

def updateProgress(socketio,id,value):
    print("progressbarupdate")
    socketio.emit('Update Progress',int(value))