const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')
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
            this.handleFileBytes.apply(this, []),
            fs.createWriteStream(saveToFile)
        )
    
        console.log(`finished ${filename}`)
    }

    canExecute(lastExecution) {
        return (Date.now() - lastExecution) >= this.messageTimeDelay
    }

    handleFileBytes() {
        this.lastMessageSent = Date.now()
        
        async function* handleData(source) {

            let processedAlready = 0

            for await (let chunk of source) {
                yield chunk

                processedAlready += chunk.length

                if (!this.canExecute(this.lastMessageSent)) {
                    continue
                }

                this.lastMessageSent = Date.now()

                console.log(prettyBytes(processedAlready))
            }
        }
        
        return handleData.bind(this)
    }
}

module.exports = UploadHandler
