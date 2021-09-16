const app = require('./app')
const Socket = require('./socket')
const port = process.env.PORT

const server = app.listen(port, () => console.log(`Server running... - http://localhost:${port}`))

const socketIo = new Socket(server)

socketIo.connect(socket => {
    console.log(`Connected: ${socket.id}`)
    module.exports = socket
})
