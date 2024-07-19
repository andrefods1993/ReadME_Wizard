/*
 * Este script adiciona um listener ao formulário para enviar dados e gerar um README.md para um repositório.
 * Coleta os dados do formulário e das listas de skills e contribuidores, envia uma solicitação POST para o servidor,
 * e trata a resposta para permitir o download do arquivo gerado ou exibir uma mensagem de erro.
 */

document.getElementById("readme__form").addEventListener("submit", async (e) => {
	e.preventDefault(); // Impede o envio padrão do formulário

	// Coleta os dados do formulário e os valores dos checkboxes selecionados
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	const selectedSkills = Array.from(document.querySelectorAll(".dropdown__checkbox:checked")).map(
		(checkbox) => checkbox.value
	);

	// Coleta e formata a lista de contribuidores
	const contributorList = Array.from(document.querySelectorAll("#contributorList li")).map((li) => {
		const contributorValue = li.textContent.trim();
		const modifiedContributorValue = `[@${contributorValue}](https://github.com/${contributorValue})`;
		return modifiedContributorValue;
	});

	data.selectedSkills = selectedSkills;
	data.contributorList = contributorList;

	try {
		// Envia uma solicitação POST para o endpoint de geração de README para repositório
		const response = await fetch("/api/readme/generateRepository", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			// Se a resposta for bem-sucedida, cria um link para o download do arquivo README.md
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = "README.md";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.getElementById("result").innerHTML = `🥳 README.md gerado com sucesso! 🚀`;
		} else {
			// Se ocorrer um erro, exibe a mensagem de erro recebida
			const result = await response.json();
			document.getElementById("result").innerHTML = `😞 Erro ao gerar o README: ${
				result.error || "Erro desconhecido"
			}`;
		}
	} catch (error) {
		// Exibe uma mensagem de erro em caso de falha na solicitação
		document.getElementById("result").innerHTML = `😞 Erro ao gerar o README: ${error.message}`;
	}
});
