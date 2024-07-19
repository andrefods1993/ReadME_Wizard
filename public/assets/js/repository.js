// Espera o DOM estar totalmente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
	/* 
		-> Mudança de Tema
	*/
	// Elementos relacionados ao tema
	const themeToggle = document.getElementById("theme--toggle");
	const body = document.body;
	const footer = document.querySelector(".footer");
	const footerCopyP = document.querySelector(".footer__copy p");
	const footerSocialSVGs = document.querySelectorAll(".footer__social svg");
	const logo = document.querySelector(".header__logo img");
	const form = document.querySelector(".readme");
	const formSections = document.querySelectorAll(".readme__form__section .readme__form__section");

	// Define as imagens do logo
	const logoDefault = "../assets/images/ReadMEWizard.png";
	const logoLight = "../assets/images/ReadMEWizard_light.png";

	// Função para alternar o tema claro e sem tema
	function toggleTheme() {
		const elementsToToggle = [body, footer, footerCopyP, form, ...formSections, ...footerSocialSVGs];
		elementsToToggle.forEach((element) => element.classList.toggle("light"));

		// Armazena o estado atual do toggle no localStorage
		localStorage.setItem("theme", themeToggle.checked ? "light" : "no-theme");

		// Alterna a imagem do logo de acordo com o estado do checkbox de toggle do tema
		logo.src = themeToggle.checked ? logoLight : logoDefault;
	}

	// Verifica o estado armazenado no localStorage ao carregar a página
	if (localStorage.getItem("theme") === "light") {
		themeToggle.checked = true;
		toggleTheme(); // Ativa o tema light se estiver armazenado
	}

	// Adiciona um evento de mudança ao toggle de tema que chama a função toggleTheme
	themeToggle.addEventListener("change", toggleTheme);

	// Função para navegação com efeito fade
	function fadeAndNavigate(href) {
		// Adiciona a classe fade-out ao body
		body.classList.add("fade-out");

		// Espera a transição terminar para navegar para a nova página
		setTimeout(() => {
			window.location.href = href;
		}, 300); // Tempo deve coincidir com o tempo de transição em CSS
	}

	// Adiciona o evento de clique aos links com a classe fade-link
	document.querySelectorAll(".fade-link").forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			fadeAndNavigate(link.getAttribute("href"));
		});
	});

	/* 
		-> Dropdown	
	*/
	// Seleciona os elementos necessários para o dropdown
	const dropdownToggle = document.querySelector(".dropdown__toggle"); // Botão para abrir/fechar o dropdown
	const dropdownContent = document.querySelector(".dropdown"); // Conteúdo do dropdown
	const searchInput = document.getElementById("dropdown--search"); // Campo de busca dentro do dropdown
	const selectAllCheckbox = document.getElementById("select--all"); // Checkbox para selecionar/deselecionar todos os itens
	const dropdownList = document.querySelector(".dropdown__list"); // Lista do dropdown
	const selectedSkillsContainer = document.getElementById("selected--skills"); // Contêiner para habilidades selecionadas

	// Alterna a visibilidade do dropdown ao clicar no botão
	dropdownToggle.addEventListener("click", () => {
		dropdownContent.classList.toggle("show");
	});

	// Fecha o dropdown se clicar fora dele
	window.addEventListener("click", (e) => {
		if (!dropdownToggle.contains(e.target) && !dropdownContent.contains(e.target)) {
			dropdownContent.classList.remove("show");
		}
	});

	const skillsJson = "/assets/data/skills.json";

	// Carrega as skills do arquivo JSON e adiciona ao dropdown
	fetch(skillsJson)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok " + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			const skills = data.skills;

			skills.forEach((skill, index) => {
				const label = document.createElement("label");
				label.className = "dropdown__item";

				const input = document.createElement("input");
				input.type = "checkbox";
				input.className = "dropdown__checkbox";
				input.id = `skill${index + 1}`;
				input.value = skill;

				label.appendChild(input);
				label.appendChild(document.createTextNode(skill));

				dropdownList.appendChild(label);
			});

			// Seleciona os checkboxes individuais
			const checkboxes = document.querySelectorAll(".dropdown__checkbox");

			// Função para atualizar a lista de habilidades selecionadas
			function updateSelectedSkills() {
				const selectedSkills = Array.from(checkboxes)
					.filter((checkbox) => checkbox.checked)
					.map((checkbox) => checkbox.value);

				selectedSkillsContainer.innerHTML =
					selectedSkills.length > 0 ? selectedSkills.join(", ") : "Nenhuma habilidade selecionada";
			}

			// Filtra os itens do dropdown com base no input de busca
			searchInput.addEventListener("input", function () {
				const filter = searchInput.value.toLowerCase();
				const items = document.querySelectorAll(".dropdown__item");
				items.forEach((item) => {
					const text = item.textContent.toLowerCase();
					item.style.display = text.includes(filter) ? "" : "none";
				});
			});

			// Seleciona ou deseleciona todos os checkboxes com base no estado do checkbox "selecionar todos"
			selectAllCheckbox.addEventListener("change", function () {
				checkboxes.forEach((checkbox) => {
					checkbox.checked = selectAllCheckbox.checked;
				});
				updateSelectedSkills();
			});

			// Atualiza o estado do checkbox "selecionar todos" com base nos checkboxes individuais
			checkboxes.forEach((checkbox) => {
				checkbox.addEventListener("change", function () {
					selectAllCheckbox.checked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
					updateSelectedSkills();
				});
			});
		})
		.catch((error) => console.error("Error loading skills:", error));

	/* 
		-> Adicionar Contribuidores
	*/
	// Seleciona os elementos necessários para adicionar contribuidores
	const contributor = document.getElementById("contributor");
	const contributorList = document.getElementById("contributorList");

	// Adiciona um evento de click ao botão para adicionar contribuidores
	document.getElementById("addContributor").addEventListener("click", function () {
		const contributorValue = contributor.value.trim();
		if (contributorValue !== "") {
			const listItem = document.createElement("li");
			listItem.textContent = contributorValue;
			contributorList.appendChild(listItem);
			contributor.value = "";
		}
	});
});
