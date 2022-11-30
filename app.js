//Servidor com EXPRESS
import express from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
app.use(express.json());

let data = [
  {
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
];

//ROTAS

// MÉTODO GET
app.get("/", (request, response) => {
  // no json coloca-se a resposta que se quer obter
  // SEMPRE retornamos algo (uma resposta)
  return response.status(200).json(data);
});

// MÉTODO POST
app.post("/create", (request, response) => {
  const newData = {
    //Capturar o body da requisicao e adicionar um id
    ...request.body,
    id: uuidv4(),
  };
  console.log(request);

  data.push(newData);

  return response.status(201).json(data);
});

// MÉTODO PUT
app.put("/edit/:id", (request, response) => {
  // Seta o id como Parametro
  const { id } = request.params;

  //RECONHECENDO O ITEM
  const update = data.find((item) => item.id === id);

  // Descobre a posição dele dentro da lista
  const index = data.indexOf(update);

  //Array [posição] = item
  // Atualiza o item existente
  data[index] = {
    ...update, //COPIA DO ITEM
    ...request.body, //INSIRO AS MUDANCAS QUE ESTOU ENVIANDO
  };

  return response.status(200).json(data[index]);
});

// MÉTODO DELETE
app.delete("/delete/:id", (request, response) => {
  //// Seta o id como Parametro
  const { id } = request.params;

  //RECONHECENDO O ITEM
  const deleteById = data.find((item) => item.id === id);

  // Descobre a posição dele dentro da lista
  const index = data.indexOf(deleteById);

  // Exclui só o item que está posicionado no index
  data.splice(index, 1);

  // Retorna a lista atualizada
  return response.status(200).json(data);
});

app.listen(Number(process.env.PORT), () => console.log("server on port 8080!"));
