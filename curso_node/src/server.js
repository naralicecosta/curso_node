import http from 'node:http'
import { json } from './middlewares/json.js'

//criar um usuário (nome, email, senha)
// listar usuario 
//edição de usuario
//remoção de usuario

//HTTP
    //METODO
    //URL

    // Vimos que o cliente envia uma Request (requisição) ao servidor. Essa requisição possui todas as informações acerca do que o cliente espera receber de volta. O servidor web ao receber essas informações precisa enviar uma resposta ao cliente, nesse ponto entra a Response

// GET -- sempre que vou buscar uma informação do backend
// POST -- criar um recurso no banckend, 
// post /users -- criar um usuario no backend
// PUT --atualizar um recurso no backend, 
// PATCH => atualizar uma informação especifica de um recurso backend
// DELETE -- deletar um recurso no backend

//JSON => estrutura de dados, conseguimos representar arrays, objetos... varias coiass dentro de uma string

// HTTP status code ---
const users = []
const server = http.createServer(async(request, response) => {
    const {method, url} = request

    await json(request, response)

    // const buffers = []
    // //percorrer a stream e adicionar dentro do array de buffers
    // for await (const chunk of request) {
    //     buffers.push(chunk)
    // }
    // try{
    //     request.body = JSON.parse(Buffer.concat(buffers).toString())
    // } catch{
    //     request.body = null
    // }

    
    if (method == 'GET' && url == '/users'){
        return response
        .setHeader('Content-Type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method == 'POST' && url == '/users'){
        const {name, email} = request.body
        users.push({
            id: 1,
            name,
            email
            
        })
        return response.writeHead(201).end()
    }

    return response.end('Hello World')

})
server.listen(3333)

