import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

//query parameters : parametros enviados no proprio endereço de url. usado quando precisamos ter url statefull http://localhost:333/users?userID=1&name=Nara
//Route Parameters : parametros não nomeados que ficam na rota, identificação de recurso... GET http://localhost:333/users/1 ... 
//Request Body: Envio de informações de um formulário (HTTPS)
const server = http.createServer(async(request, response) => {
    const {method, url} = request

    await json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = request.url.match(route.path)
        console.log(routeParams)


        return route.handler(request, response)
    }


    return response.writeHead(404).end()

})
server.listen(3333)

