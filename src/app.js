/*
 * Este arquivo configura e inicia o servidor Express para a aplicação.
 * Ele define as rotas principais, configura middleware para servir arquivos estáticos,
 * e define a porta na qual o servidor irá ouvir.
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import readmeRouter from "./routes/readme.js";

const app = express(); // Cria uma instância do Express
const PORT = process.env.PORT || 3000; // Define a porta do servidor, usa a variável de ambiente ou 3000

app.use(express.json()); // Middleware para parsear requests JSON
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public"))); // Middleware para servir arquivos estáticos da pasta 'public'

app.use("/", indexRouter); // Define a rota principal usando o roteador importado
app.use("/api/readme", readmeRouter); // Define a rota para geração de README usando o roteador importado

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`); // Inicia o servidor na porta definida e loga uma mensagem
});
