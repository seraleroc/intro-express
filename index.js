//Servidor com EXPRESS
import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import userRoute from "./routes/user.routes.js";

// habilitar o servidor a ter variaveis de ambiente
dotenv.config();

//instanciar a variavel responsavel pelo servidor -> app
const app = express();

//config servidor para enviar / receber arquivo json
app.use(express.json());

// Conectando com o Banco de Dados
connect();

app.use("/user", userRoute);

//Servidor disponivel (online)
app.listen(Number(process.env.PORT), () =>
  console.log(`server on port ${process.env.PORT}`)
);
