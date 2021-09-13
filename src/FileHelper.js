const path = require('path')
const fs = require('fs')
const prettyBytes = require('pretty-bytes')

class FileHelper {

    static async getFilesStatus(downloadsFolder) {
        const currentFiles = await fs.promises.readdir(downloadsFolder)

        const statuses = await Promise.all(currentFiles.map(file => {
            return fs.promises.stat(path.resolve(downloadsFolder, file))
        }))

        const filesStatuses = []

        for (let fileIndex in currentFiles) {
            const { birthtime, size } = statuses[fileIndex]
            filesStatuses.push({
                size: prettyBytes(size),
                file: currentFiles[fileIndex],
                lastModified: birthtime,
                owner: 'system_user'
            })
        }

        return filesStatuses
    }
}

module.exports = FileHelper
