const path = require('path')
const FileHelper = require('../FileHelper')

class GetFilesStatusController {
    
    async handle(req, res) {
        const downloadsFolder = path.resolve(__dirname, '..', '..', 'downloads')
        const fileHelper = FileHelper

        const status = await fileHelper.getFilesStatus(downloadsFolder)

        return res.json(status)
    }
}

module.exports = GetFilesStatusController
