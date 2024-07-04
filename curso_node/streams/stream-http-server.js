import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))

    }
}

const server = http.createServer((req, res) => {
    const buffers = []

        //percorrer a stream e adicionar dentro do array de buffers
    for await (const chunk of req) {
        buffers.push()
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)
    return res.end(fullStreamContent)
    // return req
    // .pipe(new InverseNumberStream())
    // .pipe(res)


})
server.listen(3335)