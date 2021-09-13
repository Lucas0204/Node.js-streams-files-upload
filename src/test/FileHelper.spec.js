const fs = require('fs')
const path = require('path')
const FileHelper = require('../FileHelper')
const { jest: mock, describe, test, expect } = require('@jest/globals')

describe('File helper test suite', () => { 
    test('should return status of files formated', async () => {
        const downloadsFolder = '/downloads'
        const statusMock = {
            dev: 2450081654,
            mode: 33206,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: 0,
            blksize: 4096,
            ino: 107523441103482260,
            size: 155409,
            blocks: 304,
            atimeMs: 1631411863989.2695,
            mtimeMs: 1622150329214.9082,
            ctimeMs: 1622150458565.8674,
            birthtimeMs: 1631304696982.3247,
            atime: '2021-09-12T01:57:43.989Z',
            mtime: '2021-05-27T21:18:49.215Z',
            ctime: '2021-05-27T21:20:58.566Z',
            birthtime: '2021-09-10T20:09:39.438Z'
        }

        const filename = 'file.png'
        
        const expectedResult = [{
            size: '155 kB',
            file: filename,
            lastModified: statusMock.birthtime,
            owner: 'system_user'
        }]

        mock.spyOn(fs.promises, fs.promises.readdir.name)
            .mockResolvedValue([ filename ])
        
        mock.spyOn(fs.promises, fs.promises.stat.name)
            .mockResolvedValue(statusMock)

        const response = await FileHelper.getFilesStatus(downloadsFolder)

        expect(fs.promises.stat).toHaveBeenCalledWith(path.resolve(downloadsFolder, filename))
        expect(response).toMatchObject(expectedResult)
    })
})
