/*
 * Este arquivo define a lógica para gerar arquivos README com base nos dados fornecidos pelo usuário.
 * Inclui funções para gerar README para perfis de usuário e repositórios.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fillTemplate from "../utils/templateUtils.js";

/**
 * Gera um arquivo README com base no template e nos dados fornecidos.
 * @param {Object} req - Objeto da requisição Express contendo os dados e o nome do template.
 * @param {Object} res - Objeto da resposta Express para enviar o arquivo gerado.
 * @param {Array} fields - Campos que serão extraídos dos dados da requisição.
 */
function generateReadme(req, res, fields) {
	// Coleta os dados do request com base nos campos fornecidos
	const data = {};
	fields.forEach((field) => (data[field] = req.body[field]));

	const { templateName } = req.body;

	try {
		// Define o caminho para o arquivo de templates
		const templatesPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "templates.json");
		console.log(`📍 Caminho dos modelos: ${templatesPath}`);

		// Lê e parseia os templates
		const templatesData = fs.readFileSync(templatesPath, "utf-8");
		const templates = JSON.parse(templatesData);

		console.log(`🗃️ Modelo: ${templateName}`);

		// Encontra o template especificado
		const template = templates.find((t) => t.name === templateName);

		if (!template) {
			console.log("🚨 Modelo não encontrado");
			return res.status(404).json({ error: "Modelo não encontrado" });
		}

		// Preenche o template com os dados
		const readmeContent = fillTemplate(template.template, data);
		console.log(`📄 Conteúdo do README: \n\n${readmeContent}`);

		// Define o caminho para o diretório de downloads
		const downloadsPath = path.join(
			path.dirname(fileURLToPath(import.meta.url)),
			"..",
			"..",
			"public",
			"downloads"
		);
		console.log(`📍 Caminho dos Downloads: ${downloadsPath}`);

		// Cria o diretório de downloads se não existir
		if (!fs.existsSync(downloadsPath)) {
			fs.mkdirSync(downloadsPath, { recursive: true });
		}

		// Define o caminho do arquivo README.md
		const filePath = path.join(downloadsPath, "README.md");
		console.log(`📍 Caminho do arquivo: ${filePath}`);

		// Salva o conteúdo do README no arquivo
		fs.writeFileSync(filePath, readmeContent);
		console.log("✅ Arquivo gravado com sucesso!");

		// Envia o arquivo para download
		res.download(filePath, "README.md", (error) => {
			if (error) {
				console.log(`🚨 Erro durante o download: ${error}`);
				res.status(500).json({ error: "Erro ao gerar o README" });
			} else {
				// Opcional: remove o arquivo temporário após o download
				fs.unlinkSync(filePath);
				console.log("❎ Arquivo removido com sucesso!");
			}
		});
	} catch (error) {
		console.log(`🚨 Erro capturado: ${error}`);
		res.status(500).json({ error: "Erro ao gerar o README" });
	}
}

// Exporta a função para gerar README de perfil
export const generateProfileReadme = (req, res) => {
	const fields = [
		"githubUsername",
		"name",
		"about",
		"project1Name",
		"project1Link",
		"project1Description",
		"project2Name",
		"project2Link",
		"project2Description",
		"project3Name",
		"project3Link",
		"project3Description",
		"instagram",
		"linkedin",
		"email",
		"phone",
		"selectedSkills",
		"templateName",
	];

	generateReadme(req, res, fields);
};

// Exporta a função para gerar README de repositório
export const generateRepositoryReadme = (req, res) => {
	const fields = [
		"name",
		"imgPath",
		"description",
		"selectedSkills",
		"functionalities",
		"demonstration",
		"projectStatus",
		"license",
		"contributorList",
	];

	generateReadme(req, res, fields);
};
