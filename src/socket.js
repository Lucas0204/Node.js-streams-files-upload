const socketIo = require('socket.io')

class Socket {

    constructor(server) {
        this.server = server
    }

    connect() {
        const io = socketIo(this.server, {
            cors: {
                origin: '*',
                credentials: false
            }
        })
    
        io.on('connection', socket => {
            console.log(`Connected: ${socket.id}`)
            module.exports = socket
        })
    }
}

module.exports = Socket
