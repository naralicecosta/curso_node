// process.stdin //stream de leitura
// .pipe(process.stdout) //retorno da aplicação //stream de escrita
// //tudo que estou recebendo como entrado, estou encaminhando para uma saida

//streams - consigo trabalhar com os dados antes deles estarem completos
import { Readable} from 'node:stream'

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
new OnetoHundredStream().pipe(process.stdout) //enquanto leio a stream, ele ja executa no terminal