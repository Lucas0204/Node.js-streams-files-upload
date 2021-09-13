const routes = require('express').Router()
const path = require('path')
const FileHelper = require('./FileHelper')
const defaultDownloadsFolder = path.resolve(__dirname, '..', 'downloads')

const fileHelper = FileHelper

routes.get('/', async (req, res) => {
    const status = await fileHelper.getFilesStatus(defaultDownloadsFolder)
    return res.send(status)
})

routes.post('/', async (req, res) => {
    console.log('post')
    return res.end()
})

module.exports = routes
