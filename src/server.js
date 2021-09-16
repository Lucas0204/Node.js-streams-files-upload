const app = require('./app')
const Socket = require('./socket')
const port = process.env.PORT

const server = app.listen(port, () => console.log(`Server running... - http://localhost:${port}`))

const io = new Socket(server)

io.connect()
