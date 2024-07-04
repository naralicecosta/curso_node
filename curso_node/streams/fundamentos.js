// process.stdin //stream de leitura
// .pipe(process.stdout) //retorno da aplicação //stream de escrita
// //tudo que estou recebendo como entrado, estou encaminhando para uma saida

//streams - consigo trabalhar com os dados antes deles estarem completos
import { Readable, Writable, Transform} from 'node:stream'

class OnetoHundredStream extends Readable {
    index = 1
    _read(){
        const i = this.index++

        setTimeout(() => {
            if(i > 100){
                this.push(null)
            }else{
                const buf = Buffer.from(String(i))
                this.push(buf)
            }

        }, 1000)
        
    }
}
class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))

    }
}

class MultiplyByTenStream extends Writable{
    //o que é enviado na strram de leitura, conseguimos ler o chunk dentro da stream de escrita, como a informaçãoe esta codififcada, função que a tream de scrita precisa chamar quando ela terminou de fazer a execução
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback() //encerra tudo que precisava ser executado

    }
}


new OnetoHundredStream().pipe(new InverseNumberStream())
                        .pipe(new MultiplyByTenStream()) //enquanto leio a stream, ele ja executa no terminal
//stream de escrita que processa dados, mas não le dados