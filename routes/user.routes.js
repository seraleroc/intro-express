import express from "express";
// import * as dotenv from "dotenv";
import { uuid } from "uuidv4";

const userRoute = express.Router();

//configuração padrão do dotenv
//dotenv.config()

//inicalização do express
//const app=express()

//permitir a interpretação do json()
//app.use(express.json())

//import EmployeeModel from '../models/employee.models.js'

// const router = express.Router()

//--------------------------------------------
// banco de dados
const bancoDados = [
  {
    id: "813517ab-3fc9-42b8-87d6-89c003bca53b",
    name: "Sergio Rocha",
    age: 50,
    role: "aluno",
    active: true,
    tasks: [
      "estudar material do modulo 03",
      "CRUD no mongoDB",
      "fazer labs do modulo 03",
    ],
  },
];

// Criacao das Rotas
// MÉTODO GET
userRoute.get("/enap", (req, res) => {
  // req -> request -> Requisicao que vem do cliente
  // res -> response -> Resposta para o cliente

  const bemVindo = "Bem vindo ao servidor da ENAP turma 91 - Ironhack";

  return res.status(200).json(bemVindo);
});

// Atividade: Criar uma rota que retorna o banco de dados -> Rota -> "/all-users"
userRoute.get("/all-users", (req, res) => {
  return res.status(200).json(bancoDados);
});

// MÉTODO POST
userRoute.post("/new-user", (req, res) => {
  // console.log(req.body); // req.body eh o CORPO da requisicao JSON
  // console.log(req.body.name) => apenas o nome

  const form = {
    ...req.body,
    id: uuid(),
  };

  bancoDados.push(form);

  return res.status(201).json(bancoDados);
});

// MÉTODO PUT
userRoute.put("/edit/:id", (req, res) => {
  // Seta o id como Parametro
  const { id } = req.params;

  //RECONHECENDO O ITEM
  const editUser = bancoDados.find((user) => user.id === id);

  // Descobre a posição dele dentro da lista
  const index = bancoDados.indexOf(editUser);

  //Array [posição] = item
  // Atualiza o item existente
  bancoDados[index] = {
    ...editUser, //COPIA DO ITEM (SPREAD)
    ...req.body, //INSIRO AS MUDANCAS QUE ESTOU ENVIANDO (SPREAD)
  };

  return res.status(200).json(bancoDados[index]);
});

// MÉTODO DELETE
userRoute.delete("/delete/:id", (req, res) => {
  console.log(req.params.id); // req.params -> {} por isso ele pode ser DESCONSTRÚÍDO

  // Seta o id como Parametro
  const { id } = req.params; // req.params DESCONSTRUÍDO e acessando o objeto pelo nome da chave
  //console.log(id);

  // RECONHECENDO O ITEM
  const deleteById = bancoDados.find((user) => user.id === id);
  console.log(deleteById);

  if (!deleteById) {
    return res.status(400).json({ msg: "Usuário não encontrado" });
  }

  // Descobre a posição dele dentro da lista
  const index = bancoDados.indexOf(deleteById);
  console.log(index);

  // Exclui só o item que está posicionado no index
  bancoDados.splice(index, 1);

  // Retorna a lista atualizada
  return res.status(200).json(bancoDados);
});

//------------------------------------------------------

// // -------- ROTAS --------
// // método GET
// router.get('/', async (request, response) => {
//     try {
//         const employees = await EmployeeModel.find()

//         return response.status(200).json(employees)
//     } catch (error) {
//         console.log(error)
//         return response.status(500).json({ msg: "Algo está errado."})
//     }
// })

// // GET by Id
// router.get('/:id', async (request, response) => {
//     try {
//         const { id } = request.params

//         const employee = await EmployeeModel.findById(id)

//         if(!employee) {
//             return response.status(404).json("Funcionário não foi encontrado")
//         }

//         return response.status(200).json(employee)
//     } catch (error) {
//         console.log(error)
//         return response.status(500).json({ msg: "Algo está errado."})
//     }
// })

// // método POST
// router.post('/create', async (request, response) => {
//     try {
//         const newEmployee = await EmployeeModel.create(request.body)

//         return response.status(201).json(newEmployee)
//     } catch (error) {
//         console.log(error)

//         return response.status(500).json({ msg: "Algo está errado."})
//     }
// })

// // método PUT
// router.put('/edit/:id', async (request, response) => {
//     try {
//         const { id } = request.params

//         const update = await EmployeeModel.findByIdAndUpdate(
//             id,
//             { ...request.body },
//             { new: true, runValidators: true }
//         )

//         return response.status(200).json(update)
//     } catch (error) {
//         console.log(error)
//         return response.status(500).json({ msg: "Algo está errado."})
//     }
// })

// // método DELETE
// router.delete('/delete/:id', async (request, response) => {
//     try {
//         const { id } = request.params

//         const deleteEmployee = await EmployeeModel.findByIdAndDelete(id)

//         return response.status(200).json(deleteEmployee)
//     } catch (error) {
//         console.log(error)
//         return response.status(500).json({ msg: "Algo está errado."})
//     }
// })

export default userRoute;

// executar o servidor na porta 8080
//app.listen(Number(process.env.PORT), () => console.log("server on port 8080")
