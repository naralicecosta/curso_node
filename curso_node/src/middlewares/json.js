export async function json(request, response){
    const buffers = []
    //percorrer a stream e adicionar dentro do array de buffers
    for await (const chunk of request) {
        buffers.push(chunk)
    }
    try{
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch{
        request.body = null
    }
    response.setHeader('Content-Type', 'application/json')
}