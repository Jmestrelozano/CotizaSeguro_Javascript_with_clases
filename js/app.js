let btnEnviar = document.getElementById("cotizar-seguro");

class Anio {
    anio() {
        let max = new Date().getFullYear();
        let min = max - 20;
        let selectAno = document.getElementById("anio");
        for (let i = max; i > min; i--) {
            let option = document.createElement("option");
            option.value = i;
            option.innerHTML = i;
            selectAno.appendChild(option);
        }
    }
}

const lista = new Anio();
lista.anio();

class Interfaz {
    seleccionarElementos(mensaje, tipo) {
        let result = document.querySelector("#result");
        const resultado = document.querySelector("#resultado");

        let marca = document.getElementById("marca");
        let seleccionarMarca = marca.options[marca.selectedIndex].value;


        let anio = document.getElementById("anio");
        let seleccionarAnio = anio.options[anio.selectedIndex].value;


        let modalidad = document.querySelector('input[name="tipo"]:checked').value;

        if (seleccionarMarca == "" || seleccionarAnio == "" || modalidad == "") {
            console.log("campos vacios");

            mensaje = document.createElement("p");
            result.appendChild(mensaje);
            mensaje.classList.add("error");
            mensaje.innerHTML += "Faltan campos por llenar";

            setTimeout(function() {
                document.querySelector(".error").remove();
                resultado.remove();
            }, 3000);
        } else {
            console.log("ok");
            tipo = document.createElement("p");
            result.appendChild(tipo);
            tipo.classList.add("correcto");
            tipo.innerHTML += "Cotizando su automovil....";
            setTimeout(function() {
                document.querySelector(".correcto").remove();
            }, 3000);
        }

        const seguro = new Seguro(marca, anio, modalidad);
        const cantidad = seguro.cotizarSeguro();
        seguro.mostrarResultado(seguro, cantidad);
    }
}

class Seguro {
    constructor(marca, anio, tipoSeguro) {
        this.marca = marca.value;
        this.anio = anio.value;
        this.tipoSeguro = tipoSeguro;
    }

    cotizarSeguro() {
        /*
              1 = americano 1.15
              2 = asiatico 1.05
              3 = europeo 1.35
         */
        let cantidad;
        const base = 2000;

        switch (this.marca) {
            case "1":
                cantidad = base * 1.15;
                break;
            case "2":
                cantidad = base * 1.05;
                break;
            case "3":
                cantidad = base * 1.35;
                break;
        }

        // Leer el año
        const diferencia = new Date().getFullYear() - this.anio;
        // Cada año de diferencia hay que reducir 3% el valor del seguro
        cantidad -= (diferencia * 3 * cantidad) / 100;
        /*
                 Si el seguro es básico se múltiplica por 30% mas
                 Si el seguro es completo 50% mas
            */
        if (this.tipo === "basico") {
            cantidad *= 1.3;
        } else {
            cantidad *= 1.5;
        }

        return cantidad;
    }

    mostrarResultado(seguro, total) {
        const resultado = document.getElementById("resultado");
        let marca;
        switch (seguro.marca) {
            case "1":
                marca = "Americano";
                break;
            case "2":
                marca = "Asiatico";
                break;
            case "3":
                marca = "Europeo";
                break;
        }
        // Crear un div
        const div = document.createElement("div");
        // Insertar la informacion
        div.innerHTML = `
             <p class='header'>Tu Resumen: </p>
             <p>Marca: ${marca} </p>
             <p>Año: ${seguro.anio} </p>
             <p>Tipo: ${seguro.tipoSeguro} </p>
             <p> Total: $ ${total} </p>
        `;

        const spinner = document.querySelector("#cargando img");
        spinner.style.display = "block";
        setTimeout(function() {
            spinner.style.display = "none";
            resultado.appendChild(div);
        }, 3000);
    }
}
btnEnviar.addEventListener("submit", enviarDatos);

function enviarDatos(e) {
    e.preventDefault;

    const ver = new Interfaz();
    ver.seleccionarElementos();
    const resultado = document.querySelector("#resultado div");

    if (resultado != null) {
        resultado.remove();
    }
}