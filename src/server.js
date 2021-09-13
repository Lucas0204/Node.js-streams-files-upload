const app = require('./app')
const socket = require('./socket')
const port = process.env.PORT

const server = app.listen(port, () => console.log(`Server running... - http://localhost:${port}`))

socket(server)
