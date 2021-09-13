const socketIo = require('socket.io')

function socket(server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['*']
        }
    })

    io.on('connection', socket => {
        console.log(`Connected: ${socket.id}`)
    })
}

module.exports = socket
