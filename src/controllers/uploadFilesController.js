const path = require('path')
const UploadHandler = require('../UploadHandler')

class UploadFilesController {

    handle(req, res) {
        const downloadsFolder = path.resolve(__dirname, '..', '..', 'downloads')
        const uploadHandler = new UploadHandler(downloadsFolder)

        const busboy = uploadHandler.upload(req.headers, () => {
            return res.send('finish!')
        })

        req.pipe(busboy)
    }
}

module.exports = UploadFilesController
