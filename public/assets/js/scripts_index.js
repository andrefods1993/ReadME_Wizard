// Espera o DOM estar totalmente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
	const themeToggle = document.getElementById("theme--toggle");
	const body = document.body;
	const mainIntroP = document.querySelector(".main__intro p");
	const footer = document.querySelector(".footer");
	const footerCopyP = document.querySelector(".footer__copy p");
	const footerSocialSVGs = document.querySelectorAll(".footer__social svg");
	const logo = document.querySelector(".header__logo img");

	// Define as imagens do logo
	const logoDefault = "assets/images/ReadMEWizard.png";
	const logoLight = "assets/images/ReadMEWizard_light.png";

	// Define os caminhos dos formulários
	const formPaths = {
		profile: "pages/profileForm.html",
		repository: "pages/repositoryForm.html",
	};

	// Função para alternar o tema claro e sem tema
	function toggleTheme() {
		// Alterna a classe 'light'
		body.classList.toggle("light");
		mainIntroP.classList.toggle("light");
		footer.classList.toggle("light");
		footerCopyP.classList.toggle("light");
		footerSocialSVGs.forEach((svg) => svg.classList.toggle("light"));

		// Armazena o estado atual do toggle no localStorage
		localStorage.setItem("theme", themeToggle.checked ? "light" : "no-theme");

		// Alterna a imagem do logo de acordo com o estado do checkbox de toggle do tema
		if (themeToggle.checked) {
			logo.src = logoLight;
		} else {
			logo.src = logoDefault;
		}
	}

	// Verifica o estado armazenado no localStorage ao carregar a página
	const currentTheme = localStorage.getItem("theme");
	if (currentTheme === "light") {
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

	// Adiciona o evento de clique aos links e botões com a classe fade-link
	const links = document.querySelectorAll(".fade-link");
	links.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const href =
				link.tagName === "A"
					? link.getAttribute("href")
					: link.getAttribute("onclick").match(/navigateToForm\('([^']+)'\)/)[1];
			navigateToForm(href);
		});
	});

	// Função para navegar para o formulário adequado com base no tipo fornecido
	window.navigateToForm = function (type) {
		let href = "";
		if (type === "profile") {
			href = formPaths.profile;
		} else if (type === "repository") {
			href = formPaths.repository;
		}
		fadeAndNavigate(href);
	};
});
