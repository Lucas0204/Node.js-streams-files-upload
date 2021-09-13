const app = require('../app')
const FileHelper = require('../FileHelper')
const { jest: mock, describe, test, expect } = require('@jest/globals')
const request = require('supertest')

describe('Routes test suite', () => {
    
    test('route GET should reponse with status 200', async () => {
        const filesStatusesMock = [
            {
                size: '155 kB',
                file: 'file.png',
                lastModified: '2021-09-10T20:11:36.982Z',
                owner: 'system_user'
            }
        ]

        mock.spyOn(FileHelper, FileHelper.getFilesStatus.name)
            .mockResolvedValue(filesStatusesMock)

        const response = await request(app).get('/')
        
        expect(response.status).toBe(200)
    })
})
