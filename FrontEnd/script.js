// on récupère la galerie dans le HTML
const gallery = document.querySelector(".gallery");

// on va chercher les projets dans le back-end
fetch("http://localhost:5678/api/works")
	.then(function (reponse) {
		return reponse.json();
	})
	.then(function (works) {
		console.log(works);

		// pour chaque projet on ajoute une figure dans la galerie
		for (let i = 0; i < works.length; i++) {
			gallery.innerHTML += `
				<figure>
					<img src="${works[i].imageUrl}" alt="${works[i].title}">
					<figcaption>${works[i].title}</figcaption>
				</figure>`;
		}
	});
