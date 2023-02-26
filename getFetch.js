//obtenemos los documentos
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const cantPersonajes = document.getElementById("cantPersonajes");
const containerCards = document.getElementById("container-cards");
const pagInicial = document.getElementById("inicio");
const pagFinal = document.getElementById("final");
const cantPaginas = document.getElementById("cantPaginas");
//declaramos varialbes a utilizar
let url = "https://rickandmortyapi.com/api/character";
let cards;
let cant;
let datos;
let filtro = "Todos";
const getData = async () => {
  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        datos = data.results;
        cantPaginas.innerHTML = `Cantidad de paginas: ${data.info.pages}`;
        mostrarData(datos, filtro);
        btnNext.setAttribute("nextPage", data.info.next);
        btnPrev.setAttribute("prevPage", data.info.prev);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("Error=> ", error);
  }
};
getData();
const mostrarData = (results, filtro) => {
  containerCards.innerHTML = "";
  let newData;
  if (filtro === "Female") {
    newData = results.filter((pj) => pj.gender === "Female");
  } else if (filtro === "Male") {
    newData = results.filter((pj) => pj.gender === "Male");
  } else {
    newData = results;
  }
  cant = newData.length;
  cantPersonajes.innerHTML = `Total de Personajes: ${cant}`;
  newData.forEach((element) => {
    cards = `
            <div class="card"> 
            <img src="${element.image}" />
            <p>Nombre:${element.name}</p>
            <p>Genero: ${element.gender}</p>
            <p>Species: ${element.species}</p>
            <p>Status: ${element.status}</p>
            <p>Origin: ${element.origin.name}</p>
            <p> Location: ${element.location.name}</p>
            <a href="vistadetalle.html?id=${element.id}">Ver Mas...</a>
            </div>`;
    containerCards.innerHTML += cards;
  });
};
//BOTONES DE PAGINA
btnNext.addEventListener("click", () => {
  if (btnNext.getAttribute("nextPage") != "null") {
    url = btnNext.getAttribute("nextPage");
    getData();
  }
});
btnPrev.addEventListener("click", () => {
  if (btnPrev.getAttribute("prevPage") !== "null") {
    url = btnPrev.getAttribute("prevPage");
    getData();
  }
});
pagInicial.addEventListener("click", () => {
  url = "https://rickandmortyapi.com/api/character";
  getData();
});
pagFinal.addEventListener("click", () => {
  url = "https://rickandmortyapi.com/api/character?page=42";
  getData();
});
//FILTROS
mujeres.addEventListener("click", () => {
  filtro = "Female";
  mostrarData(datos, filtro);
});
hombres.addEventListener("click", () => {
  filtro = "Male";
  mostrarData(datos, filtro);
});
todos.addEventListener("click", () => {
  filtro = "Todos";
  mostrarData(datos, filtro);
});
