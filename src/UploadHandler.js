const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')
const prettyBytes = require('pretty-bytes')

class UploadHandler {
    constructor(downloadsFolder) {
        this.downloadsFolder = downloadsFolder
    }

    upload(headers, onFinish) {
        const busboy = new Busboy({ headers })

        busboy.on('file', this.onFile.bind(this))
    
        busboy.on('finish', () => {
            onFinish()
        })

        return busboy
    }

    onFile(fieldname, file, filename) {
        const saveToFile = path.resolve(this.downloadsFolder, filename)
            
        file.pipe(fs.createWriteStream(saveToFile))
            
        file.on('data', function(data) {
            this.bytesStreamed = this.bytesStreamed ? this.bytesStreamed : 0
            this.bytesStreamed += data.length
            console.log(`streamed ${prettyBytes(this.bytesStreamed)}`)
        })
    
        file.on('end', () => {
            console.log(`Finished ${filename}`)
        })
    }
}

module.exports = UploadHandler
