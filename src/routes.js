const routes = require('express').Router()
const path = require('path')

const FileHelper = require('./FileHelper')
const UploadHandler = require('./UploadHandler')
const downloadsFolder = path.resolve(__dirname, '..', 'downloads')

const fileHelper = FileHelper

routes.get('/files', async (req, res) => {
    const status = await fileHelper.getFilesStatus(downloadsFolder)
    return res.send(status)
})

routes.post('/files', async (req, res) => {

    const uploadHandler = new UploadHandler(downloadsFolder)

    const busboy = uploadHandler.upload(req.headers, () => {
        return res.send('finish!')
    })

    req.pipe(busboy)
})

module.exports = routes
