/*
 * Este arquivo define as rotas para servir arquivos HTML específicos.
 * O roteador Express é configurado para responder com arquivos estáticos das páginas do perfil e do repositório.
 */

import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";

const router = Router();

// Rota para servir o formulário de perfil
router.get("/profile", (req, res) => {
	res.sendFile(
		path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "public", "pages", "profileForm.html")
	);
});

// Rota para servir o formulário de repositório
router.get("/repository", (req, res) => {
	res.sendFile(
		path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "public", "pages", "repositoryForm.html")
	);
});

export default router;
