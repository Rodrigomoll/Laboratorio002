let listaPlatillos = [
    {
        id: 1,
        nombre: "Ceviche",
        descripcion: "Pescado con limon",
        precio: 12.0,
        stock: 10,
        imagen: "https://movistarplus.pe/wp-content/uploads/sites/3/2021/07/MPLUS-WEB-49-1.jpg",
    },
    {
        id: 2,
        nombre: "Raclette et Fromage",
        descripcion:
            "Raclette avec fromage pour degut",
        precio: 18.0,
        stock: 8,
        imagen: "https://i.blogs.es/68edba/raclette-portada/840_560.jpg",
    },
    {
        id: 3,
        nombre: "Cous Cous",
        descripcion: "Comida arabe",
        precio: 11.0,
        stock: 14,
        imagen: "https://www.cookingclassy.com/wp-content/uploads/2017/04/moroccan-couscous-3.jpg",
    },
    {
        id: 4,
        nombre: "Strogonoff",
        descripcion: "Comida do Brasil",
        precio: 14.0,
        stock: 7,
        imagen: "https://www.comedera.com/wp-content/uploads/2021/03/strogonoff-de-pollo-shutterstock_1787780768.jpg",
    },
    {
        id: 5,
        nombre: "Sopa Seca",
        descripcion: "Fideos con guiso",
        precio: 20.0,
        stock: 10,
        imagen: "https://www.comeperuano.pe/wp-content/uploads/2020/02/receta-sopa-seca-chinchana.jpg",
    },
    {
        id: 6,
        nombre: "Paella",
        descripcion: "Comida Española",
        precio: 19.0,
        stock: 6,
        imagen: "https://www.vidactual.com/rcpmaker/wp-content/uploads/2020/10/Paella.png",
    },
];

/**
 * 1. vamos a mostrar a partir de esta data (listaPlatillos) los platillos en el DOM
 * 2. vamos a implementar que se puedan agregar platillos a un carrito, indicando la cantidad de c/producto
 * 3. vamos a mostrar el resumen del carrito
 * 4. vamos a mostrar el total del carrito a pagar
 */

let mainContenido = document.getElementById("contenido");

console.log("MAIN", mainContenido);

listaPlatillos.forEach((plato) => {
    let platilloDom = document.createElement("div");

    platilloDom.classList.add("tarjeta");
    platilloDom.innerHTML = `<div class="imagen">
		<img src="${plato.imagen}" alt="${plato.nombre}">
	</div>
	<div class="texto">
		<h4>${plato.nombre}</h4>
		<p>${plato.descripcion}</p>
		<div class="precio">
			<span>S/ ${plato.precio}</span>
			<button 
				class="btn-agregar" 
				data-id="${plato.id}"
			>
				Agregar
		  	</button>
		</div>
	</div>
	`;

    mainContenido.appendChild(platilloDom);
});

// getElementsByClassName me permite obtener una lista de elementos a partir de una clase de CSS
let btnsAgregar = document.getElementsByClassName("btn-agregar");

let arrBtnsAgregar = Array.from(btnsAgregar); //forEach, map, find

let carrito = []; //los platillos agregados con su respectiva cantidad

arrBtnsAgregar.forEach((botonAgregar) => {
    botonAgregar.addEventListener("click", (evento) => {
        //getAttribute(atributo) , permite obtener el valor de un atributo
        let btnId = botonAgregar.getAttribute("data-id");
        // console.log(typeof btnId);
        // alert(`Has dado click al botón!!!! con id: ${btnId}`);
        // console.log(evento.target.getAttribute("data-id")); //hace referencia al propio objeto desde donde recibimos el click
        let platoIdentificado = buscarPlatillo(btnId);
        anadirACarrito(platoIdentificado); //Agregue un plato y actualice el carrito
        dibujarCarrito(carrito); //ya esta actualizado
    });
});

// HOISTING, las referencias de variables y funciones son ELEVADAS al inicio del script
const buscarPlatillo = (id) => {
    let idNumber = parseInt(id);
    // console.log(typeof idNumber, idNumber);
    let platilloEncontrado = listaPlatillos.find((plato) => {
        return plato.id === idNumber;
    });

    return platilloEncontrado;
};

const anadirACarrito = (nuevoPlatillo) => {
    if (nuevoPlatillo.stock === 0) {
        alert("Se agotaron los platos");
        return; //corta la ejecución del código
    }

    let existe = carrito.findIndex((plato) => {
        return plato.id === nuevoPlatillo.id;
    });
    console.log(existe);
    if (existe === -1) {
        //no existe en el carrito aún
        nuevoPlatillo.cantidad = 1;
        carrito.push(nuevoPlatillo);
    } else {
        //en caso ya exista el plato dentro del carrito, incremento su propiedad cantidad en 1
        // carrito[existe].cantidad = carrito[existe].cantidad + 1
        carrito[existe].cantidad++;
    }

    let indiceLista = listaPlatillos.findIndex((items) => items.id === nuevoPlatillo.id);
    listaPlatillos[indiceLista].stock--;
};

let tbodyCarrito = document.getElementById("tbody-carrito");
let tbodyResumen = document.getElementById("tbody-resumen");

const dibujarCarrito = (carritoActualizado) => {
    let trCarrito = "";

    carritoActualizado.forEach((item) => {
        trCarrito =
            trCarrito +
            `<tr>
			<td>${item.nombre}</td>
			<td>${item.cantidad}</td>
			<td>${item.precio}</td>
			<td>${item.precio * item.cantidad}</td>
		</tr>`;
    });

    tbodyCarrito.innerHTML = trCarrito;

    let total = 0;

    total = carritoActualizado.reduce((acumulador, plato) => {
        return acumulador + plato.precio * plato.cantidad;
    }, 0);

    tbodyResumen.innerHTML = `<tr>
								<td>TOTAL</td>
								<td>${total}</td>
							</tr>`;
};