const router = require('express').Router()

const Person = require("../models/Person")


//CREATE 
router.post('/', async (request, response) =>{
    //request.body
    //utilizando o destructuring javascript moderno
    const {name, salary, approved} = request.body
    const person = {
        name,
        salary, 
        approved
    }

    if(!name){
        response.status(422).json({error: "O name é obrigatório"})
        return
    }else if(salary == null || salary == ""){
        response.status(422).json({error: "O salary é obrigatório"})
        return
    }else if(approved == null){
        response.status(422).json({error: "O approved é obrigatório"})
        return
    }
    

    //utilização do metodo create do mongo
    try{
        await Person.create(person)

        response.status(201).json({message: "Pessoa inserida no sistema com sucesso"})

    }catch(error){
        response.status(500).json({error: error}) //apenas para debug

    }

})

//READ 
router.get('/', async (request, response)=>{
    try{

        const people = await Person.find()

        response.status(200).json(people)

    }catch(error){
        response.status(500).json({
            error: error
        })
    }
})

//rotas dinamicas
router.get('/:id', async (request, response)=>{
    //extrair o dado da requisição

    const id = request.params.id
    try{
        const person = await Person.findOne({ "_id": id })

        if(!person){
            response.status(422).json({"message": "O usuário não foi encontrado..."})
            return
        }

        response.status(200).json(person)
    }catch(error){
        response.status(500).json({error: error})
    }

})


//UPDATE - PUT e PATCH
router.patch('/:id', async (request, response)=>{
    const id = request.params.id

    const {name, salary, approved} = request.body

    const person = {
        name, salary, approved
    }

    try{
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0){
            response.status(422).json({message: "Usuario não encontrado"})//verifica se não está atualizando algo que existe ou não
            return
        }

        response.status(200).json(person)

    }catch(error){
        response.status(500).json({error: error})
    }

})


//DELETE
router.delete('/:id', async (request, response)=>{
    const id = request.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        response.status(422).json({"message": "O usuário não foi encontrado"})
    }  

    try{
        await Person.deleteOne({_id: id})

        response.status(200).json({message: "Pessoa removida com sucesso"})
    }catch(error){
        response.status(500).json({error: error})
    }
})


module.exports = router