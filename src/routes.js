const routes = require('express').Router()

const GetFilesStatusController = require('./controllers/getFilesStatusController')
const UploadFilesController = require('./controllers/uploadFilesController')

const getFilesStatusController = new GetFilesStatusController()
const uploadFilesController = new UploadFilesController()

routes.get('/files', getFilesStatusController.handle)

routes.post('/files', uploadFilesController.handle)

module.exports = routes
