//configuração inicial
require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()


//forma de ler JSON - middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/PersonRoutes')
app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (request, response)=>{
    //mostrar requisição
    response.json("APIRESTFul")
})


//entregar uma porta para o express acessar - acesso ao codigo para obter uma resposta
const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS) 
//promisses e connection
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.7qzndqm.mongodb.net/bancodapi?retryWrites=true&w=majority`
    ).then(()=>{
        console.log("Conectamos ao mongoDB")
        app.listen(3000)
    })
    .catch(err => console.log(err))
