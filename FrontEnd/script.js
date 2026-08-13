// Adresse de l'API (le back-end doit tourner)
const apiUrl = "http://localhost:5678/api/works";

// La div qui contient les projets, vide dans le HTML
const gallery = document.querySelector(".gallery");

// Récupère les projets dans le back-end
async function getWorks() {
	const response = await fetch(apiUrl);
	const works = await response.json();
	console.log(works);
	displayWorks(works);
}

// Crée les figures et les ajoute à la galerie
function displayWorks(works) {
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

getWorks();
