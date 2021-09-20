const { Readable, Transform, Writable } = require('stream')


class TestUtils {

    static generateReadableStream(data) {
        return new Readable({
            objectMode: true,
            read() {
                for (let item of data) {
                    this.push(item)
                }

                this.push(null)
            }
        })
    }

    static generateTransformStream(onData) {
        return new Transform({
            objectMode: true,
            transform(chunk, encoding, cb) {
                onData(chunk)
                cb(null, chunk)
            }
        })
    }

    static generateWritableStream(onData) {
        return new Writable({
            objectMode: true,
            write(chunk, encoding, cb) {
                onData(chunk)
                cb(null, chunk)
            }
        })
    }
}

module.exports = TestUtils
