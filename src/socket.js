const socketIo = require('socket.io')

class Socket {

    constructor(server) {
        this.server = server
    }

    connect(cb) {
        const io = socketIo(this.server, {
            cors: {
                origin: '*',
                credentials: false
            }
        })
    
        io.on('connection', cb)
    }
}

module.exports = Socket
