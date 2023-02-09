function listaBicicletas() {
    return fetch("http://localhost:3000/bicicleta").then( respuesta => respuesta.json());
};

const agregarBicicleta = (imagen,nombre,precio) =>{
    return fetch("http://localhost:3000/bicicleta",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ imagen,nombre,precio }),
    });
};

const botonAgregar = document.querySelector(["data-agregar"]);

const crearBicicleta = (imagen, nombre, precio) => {
    const linea = document.createElement("div");
    linea.classList.add("bicicleta");
    const contenido = `
            <div class="bicicleta__contenido">
                <img src="${imagen}" alt="imagen bicicleta" class="bicicleta--img">
                <div class="producto__info">
                    <h2 class="producto__info--nombre">${nombre}</h2>
                    <p class="producto__info--precio">${precio}</p> 
                </div>
            </div>
            
    `;  
    linea.innerHTML = contenido;

    return linea;
}

const tabla = document.querySelector("[data-bicicletas]");

listaBicicletas()
    .then((data) => {
        data.forEach(({imagen,nombre,precio}) => {
            const nuevaLinea = crearBicicleta(imagen, nombre, precio);
            tabla.appendChild(nuevaLinea);
        });
    })
    .catch((err) => alert("Ocurrio un error: " + err));


const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento)=> {
    evento.preventDefault();

    const imagen = document.querySelector("[data-imagen]").value
    const nombre = document.querySelector("[data-nombre]").value
    const precio = document.querySelector("[data-precio]").value
    
    agregarBicicleta(imagen, nombre, precio).then(() => {
        window.location.href = "bicicletas.html"
    }).catch(err => console.log(err))
});
