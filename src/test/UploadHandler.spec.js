const fs = require('fs')
const UploadHandler = require('../UploadHandler')
const TestUtils = require('./_util/testUtils')
const { describe, test, expect, jest: mock } = require('@jest/globals')

describe('Upload handler test suite', () => {
    
    describe('#upload', () => {
        test('should handle file upload and call onFile and onFinsh', () => {
            const downloadsFolder = '/any'
            const uploadHandler = new UploadHandler(downloadsFolder)
    
            mock.spyOn(uploadHandler, uploadHandler.onFile.name)
                .mockResolvedValue()
    
            const onFinish = mock.fn()
            const headers = {
                'content-type': 'multipart/form-data; boundary='
            }
    
            const readableFile = TestUtils.generateReadableStream([ 'chunk', 'of', 'data' ])
            
            const busboy = uploadHandler.upload(headers, onFinish)
    
            busboy.emit('file', 'fieldname', readableFile, 'filename.txt')
    
            busboy.listeners('finish')[0].call()
    
            expect(uploadHandler.onFile).toHaveBeenCalled()
            expect(onFinish).toHaveBeenCalled()
        })
    })

    describe('#onFile', () => {
        test('should stream file and store in disk', async () => {
            const downloadsFolder = '/any'
            const chunks = [ 'any', 'thing' ]
            const uploadHandler = new UploadHandler(downloadsFolder)

            const onTransform = mock.fn()
            mock.spyOn(uploadHandler, uploadHandler.handleFileBytes.name)
                .mockImplementation(() => TestUtils.generateTransformStream(onTransform))

            const onData = mock.fn()
            mock.spyOn(fs, fs.createWriteStream.name)
                .mockImplementation(() => TestUtils.generateWritableStream(onData))

            const params = {
                fieldname: 'fieldname',
                file: TestUtils.generateReadableStream(chunks),
                filename: 'filename.txt'
            }

            await uploadHandler.onFile(...Object.values(params))

            expect(onTransform.mock.calls.join()).toEqual(chunks.join())
            expect(onData.mock.calls.join()).toEqual(chunks.join())
        })
    })
})
