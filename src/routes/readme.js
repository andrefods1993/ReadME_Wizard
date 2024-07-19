/*
 * Este arquivo define as rotas relacionadas à geração de arquivos README.
 * Utiliza o roteador Express para mapear endpoints para os controladores apropriados.
 */

import { Router } from "express";
import { generateProfileReadme, generateRepositoryReadme } from "../controllers/readmeController.js";

const router = Router();

// Rota para gerar README de perfil de usuário
router.post("/generateProfile", generateProfileReadme);

// Rota para gerar README de repositório
router.post("/generateRepository", generateRepositoryReadme);

export default router;
