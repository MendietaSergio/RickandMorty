const params = window.location.search;
const searchParams = new URLSearchParams(params);
const id = searchParams.get("id");
const imgDetalle = document.getElementById("imgDetalle");
const listaDetalle = document.getElementById("listaDetalles");
const listaEpisodio = document.getElementById("listaEpisodios");
let url = "https://rickandmortyapi.com/api/character/";
const getData = async () => {
  try {
    await fetch("https://rickandmortyapi.com/api/character/" + id)
      .then((responde) => responde.json())
      .then((data) => {
        console.log(data);
        imgDetalle.src = data.image;
        mostrarData(data);
      });
  } catch (error) {}
};
getData();

const mostrarData = (data) => {
  let detalle = `
                  <li>Nombre: ${data.name}</li>
                  <li>Genero: ${data.gender}</li>
                  <li>Especie: ${data.species}</li>
                  <li>Estado: ${data.status}</li>`;
  listaDetalle.innerHTML = detalle;
  data.episode.forEach((element) => {
    let episodio = `
        <span>Episodio: <a target="_blank" href="${element}">${element}</a></span>`;
    listaEpisodio.innerHTML += episodio;
  });
};
