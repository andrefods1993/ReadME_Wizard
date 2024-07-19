/*
 * Esta função substitui placeholders em um template com valores de um objeto de dados.
 * Os placeholders são no formato {{chave}}, e são substituídos pelos valores correspondentes no objeto de dados.
 */

function fillTemplate(template, data) {
	return template.replace(/{{(\w+)}}/g, (_, key) => data[key] || "");
}

export default fillTemplate;
