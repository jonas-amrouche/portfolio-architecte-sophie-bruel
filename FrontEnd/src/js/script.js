// Adresse de l'API (le back-end doit tourner)
const apiUrl = "http://localhost:5678/api/works";

// La div qui contient les projets, vide dans le HTML
const gallery = document.querySelector(".gallery");

// On garde tous les projets ici pour filtrer sans rappeler l'API à chaque clic
let allWorks = [];

// Récupère les projets dans le back-end
async function getWorks() {
	const response = await fetch(apiUrl);
	allWorks = await response.json();
	displayWorks(allWorks);
}

// Crée les figures et les ajoute à la galerie
function displayWorks(works) {
	// on vide d'abord, sinon les projets s'empilent à chaque filtre
	gallery.innerHTML = "";

	for (let i = 0; i < works.length; i++) {
		const work = works[i];

		const figure = document.createElement("figure");
		const image = document.createElement("img");
		const caption = document.createElement("figcaption");

		image.src = work.imageUrl;
		image.alt = work.title;
		caption.innerText = work.title;

		figure.appendChild(image);
		figure.appendChild(caption);
		gallery.appendChild(figure);
	}
}

// Garde les projets de la catégorie demandée, ou tout si "Tous"
function filterWorks(category) {
	if (category === "Tous") {
		displayWorks(allWorks);
		return;
	}

	const filteredWorks = allWorks.filter(function (work) {
		return work.category.name === category;
	});

	displayWorks(filteredWorks);
}

// Les boutons de filtres
const filterButtons = document.querySelectorAll(".filters button");

// Au clic, on déplace la classe "active" et on filtre la galerie
for (let i = 0; i < filterButtons.length; i++) {
	const button = filterButtons[i];

	button.addEventListener("click", function () {
		// on enlève la sélection partout
		for (let j = 0; j < filterButtons.length; j++) {
			filterButtons[j].classList.remove("active");
		}
		// puis on la met sur celui qui vient d'être cliqué
		button.classList.add("active");

		// le texte du bouton correspond au nom de la catégorie dans l'API
		filterWorks(button.innerText);
	});
}

getWorks();
