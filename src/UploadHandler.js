const path = require('path')
const fs = require('fs')

const Busboy = require('busboy')
const prettyBytes = require('pretty-bytes')

const { pipeline } = require('stream')
const { promisify } = require('util')

const pipelineAsync = promisify(pipeline)

class UploadHandler {
    constructor(downloadsFolder) {
        this.downloadsFolder = downloadsFolder
        this.messageTimeDelay = 200
    }

    upload(headers, onFinish) {
        const busboy = new Busboy({ headers })

        busboy.on('file', this.onFile.bind(this))
    
        busboy.on('finish', () => {
            onFinish()
        })

        return busboy
    }

    async onFile(fieldname, file, filename) {
        const saveToFile = path.resolve(this.downloadsFolder, filename)

        await pipelineAsync(
            file,
            this.handleFileBytes.apply(this, [ filename ]),
            fs.createWriteStream(saveToFile)
        )
    
        console.log(`finished ${filename}`)
    }

    handleFileBytes(filename) {
        this.lastMessageSent = Date.now()
        
        async function* handleData(source) {
            let processedAlready = 0
            const socket = this.getSocketConnected()

            for await (let chunk of source) {
                yield chunk

                processedAlready += chunk.length

                if (!this.canExecute(this.lastMessageSent)) {
                    continue
                }

                this.lastMessageSent = Date.now()

                socket.emit('file-upload', { processedAlready: prettyBytes(processedAlready), filename })
            }
        }
        
        return handleData.bind(this)
    }

    canExecute(lastExecution) {
        return (Date.now() - lastExecution) >= this.messageTimeDelay
    }

    getSocketConnected() {
        const socket = require('./socket')
        return socket
    }
}

module.exports = UploadHandler
